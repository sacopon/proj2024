import { Container } from "pixi.js";
import { SceneRootContainer } from "../common/scene_root_container";
import { Position, Size } from "./types";
import { PresentationServiceLocator } from "./presentation_service_locator";
import { SceneController } from "./scene_controller";

export abstract class SceneParameter {
}

/**
 * シーンの基底クラス
 * 全シーンで必要になるメソッド群を派生クラスに提供する
 */
export abstract class Scene extends Container {
	private m_root: SceneRootContainer;
	private m_sceneController: SceneController;

	public constructor(sceneController: SceneController) {
		super();

		this.m_root = new SceneRootContainer();
		this.m_sceneController = sceneController;
	}

	/**
	 * 中央の座標を取得
	 */
	public get center(): Position {
		return this.m_root.center;
	}

	/**
	 * 実画面の座標/サイズを返す
	 * セーフエリア外にオブジェクトを表示したい場合に使用する
	 */
	public get screen(): Position & Size {
		return this.m_root.screen;
	}

	public get gameInput() {
		return PresentationServiceLocator.gameInput;
	}

	/**
	 * 次のシーンに関する情報の取得処理
	 * SceneController からコールバックされる
	 *
	 * @param params 前のシーンから引き継いだ情報
	 * @returns params に、このメソッドで取得した情報を加えたもの
	 */
	public async request(params: SceneParameter | null = null): Promise<SceneParameter|null> {
		return Promise.resolve(params);
	}

	/**
	 * データに依存しない、このシーンに必須のリソース一覧を作成する
	 *
	 * @returns アクセス時のキー名、読み込みURLのペアの配列
	 */
	public getStaticResources(): {alias: string, src: string }[] {
		return [];
	}

	// TODO: getDynamicResources() も必要

	/**
	 * 他のシーンへの遷移
	 */
	public goTo(sceneName: string, param: SceneParameter | null = null) {
		this.m_sceneController.changScene(sceneName, param);
	}

	/**
	 * シーンの変更から onUpdate() 呼び出しの前に一度だけ呼び出される処理
	 *
	 * @param param 遷移元シーンから引き継いだパラメータ
	 * @returns Promise 画面転換の演出などを行う場合も見込んで Promise を返す
	 */
	public async onEnter(param: SceneParameter | null): Promise<void> {
		this.m_root.addChild(this);
		return this.processOnEnter(param);
	}

	public async onLeave(): Promise<void> {
		await this.processOnLeave();
		this.removeChildren()
		this.removeFromParent();
	}

	/**
	 * フレーム更新処理
	 *
	 * @param delta 前回の呼び出しからの経過時間(ミリ秒)
	 */
	public onUpdate(delta: number): void {
		this.processOnUpdate(delta);
	}

	/**
	 * 画面サイズ変化時処理
	 * 派生クラスでカスタマイズする場合は基底クラスの onResize() を最初に呼び出すこと
	 *
	 * @param screen 画面情報
	 */
	public onResize() {
		this.m_root.onResize();
		this.processOnResize();
	};

	/**
	 * onEnter() 時に内部で呼び出される派生クラスでオーバーライドする実装
	 *
	 * @param param 遷移元シーンから引き継いだパラメータ
	 * @returns Promise 画面転換の演出などを行う場合も見込んで Promise を返す
	 */
	protected abstract processOnEnter(param: SceneParameter | null): Promise<void>;

	/**
	 * onLeave() 時に内部で呼び出される派生クラスでオーバーライドする実装
	 *
	 * @returns Promise 画面転換の演出などを行う場合も見込んで Promise を返す
	 */
	protected abstract processOnLeave(): Promise<void>;

	protected abstract processOnUpdate(delta: number): void;
	protected abstract processOnResize(): void;
}
