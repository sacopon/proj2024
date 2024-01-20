import { Container } from "pixi.js";
import { SceneRootContainer } from "../common/scene_root_container";
import { Position, Size } from "./types";
import { PresentationServiceLocator } from "./presentation_service_locator";

export abstract class SceneParameter {
}

/**
 * シーンの基底クラス
 * 全シーンで必要になるメソッド群を派生クラスに提供する
 */
export abstract class Scene extends Container {
	private m_root: SceneRootContainer;

	// TODO: 引数は ServiceLocator に入れてしまう
	public constructor(stage: Container) {
		super();
		this.m_root = new SceneRootContainer(stage);
		this.m_root.addChild(this);
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
	public async request(params: SceneParameter): Promise<SceneParameter> {
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
	 * シーンの変更から onUpdate() 呼び出しの前に一度だけ呼び出される処理
	 *
	 * @param param 遷移元シーンから引き継いだパラメータ
	 * @returns Promise 画面転換の演出などを行う場合も見込んで Promise を返す
	 */
	public async onEnter(param: SceneParameter): Promise<void> {
		return Promise.resolve();
	}

	// TODO: onLeave() も必要

	/**
	 * フレーム更新処理
	 *
	 * @param delta 前回の呼び出しからの経過時間(ミリ秒)
	 */
	public onUpdate(_: number): void {
	}

	/**
	 * 画面サイズ変化時処理
	 * 派生クラスでカスタマイズする場合は基底クラスの onResize() を最初に呼び出すこと
	 *
	 * @param screen 画面情報
	 */
	public onResize() {
		this.m_root.onResize();
	};
}
