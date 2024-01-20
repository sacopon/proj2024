import { Container } from "pixi.js";
import { Position } from "../core/types";
import { ScreenInfo } from "../utilities/screen_info";
import { PresentationServiceLocator } from "../core/presentation_service_locator";

/**
 * シーンの最上段に置かれたコンテナ
 * シーン内の各種オブジェクトはこのコンテナにぶら下げる
 * 原点(0, 0)はセーフエリアの左上に位置し、セーフエリア外への描画をする際には
 * screenOrigin, screenSize を活用する
 */
export class SceneRootContainer extends Container {
	private m_screen: ScreenInfo;

	public constructor(screen: ScreenInfo, stage: Container) {
		super();
		this.m_screen = screen;

		stage.addChild(this);
		this.setPos(this.m_screen);
	}

	public onResize(screen: ScreenInfo) {
		this.m_screen = screen;
		this.setPos(this.m_screen);
	}

	/**
	 * 中央の座標を取得
	 */
	public get center(): Position {
		return {
			x: Math.floor(this.m_screen.safeArea.width  / 2),
			y: Math.floor(this.m_screen.safeArea.height / 2),
		};
	}

	/**
	 * 実画面の座標/サイズを返す
	 * セーフエリア外にオブジェクトを表示したい場合に使用する
	 */
	public get screen() {
		return {
			x: -this.x,
			y: -this.y,
			width: this.m_screen.size.width,
			height: this.m_screen.size.height,
		};
	}

	// TODO: KeyboardInput を直接扱わないようにする
	public get keyboard() {
		return PresentationServiceLocator.keyboard;
	}

	public get keyCode() {
		return PresentationServiceLocator.keyCode;
	}

	private setPos(screen: ScreenInfo) {
		this.x = screen.safeArea.x;
		this.y = screen.safeArea.y;
	}
}
