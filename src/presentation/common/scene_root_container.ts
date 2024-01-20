import { Container } from "pixi.js";
import { Position } from "../core/types";
import { PresentationServiceLocator } from "../core/presentation_service_locator";

/**
 * シーンの最上段に置かれたコンテナ
 * シーン内の各種オブジェクトはこのコンテナにぶら下げる
 * 原点(0, 0)はセーフエリアの左上に位置し、セーフエリア外への描画をする際には
 * screenOrigin, screenSize を活用する
 */
export class SceneRootContainer extends Container {
	public constructor() {
		super();

		PresentationServiceLocator.stage.addChild(this);
		this.setPos();
	}

	public onResize() {
		this.setPos();
	}

	/**
	 * 中央の座標を取得
	 */
	public get center(): Position {
		return {
			x: Math.floor(PresentationServiceLocator.screenInfo.safeArea.width  / 2),
			y: Math.floor(PresentationServiceLocator.screenInfo.safeArea.height / 2),
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
			width: PresentationServiceLocator.screenInfo.size.width,
			height: PresentationServiceLocator.screenInfo.size.height,
		};
	}

	private setPos() {
		this.x = PresentationServiceLocator.screenInfo.safeArea.x;
		this.y = PresentationServiceLocator.screenInfo.safeArea.y;
	}
}
