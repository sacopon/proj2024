import { Container } from "pixi.js";
import { SceneRootContainer, ScreenInfo } from "../common/scene_root_container";
import { Screen } from "../utilities/screen";
import { Position } from "./types";

export abstract class SceneParameter {
}

/**
 * シーンの基底クラス
 * 全シーンで必要になるメソッド群を派生クラスに提供する
 */
export abstract class Scene extends Container {
	private m_root: SceneRootContainer;

	public constructor(screen: Screen, stage: Container) {
		super();
		this.m_root = new SceneRootContainer(screen, stage);
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
	public get screen(): ScreenInfo {
		return this.m_root.screen;
	}

	// TODO: KeyboardInput を直接扱わないようにする
	// TODO: SceneRootConatiner から移動してくる
	public get keyboard() {
		return this.m_root.keyboard;
	}

	// TODO: KeyboardInput を直接扱わないようにする
	// TODO: SceneRootConatiner から移動してくる
	public get keyCode() {
		return this.m_root.keyCode;
	}

	public async request(): Promise<SceneParameter> { return Promise.resolve({}); }
	public async onEnter(param: SceneParameter): Promise<void> { return Promise.resolve(); }
	public onUpdate(_: number): void {}
	public onResize(screen: Screen) {
		this.m_root.onResize(screen);
	};
}
