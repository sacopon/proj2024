import { Application, Sprite, Assets, Container } from "pixi.js";
import init, { greet } from "../wasm/pkg";
import { ScreenInfo } from "./presentation/utilities/screen_info";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "./presentation/utilities/disable_touch_event";
import { TestScene } from "./presentation/common/test_scene";
import { PresentationServiceLocator } from "./presentation/core/presentation_service_locator";
import { SceneController } from "./presentation/core/scene_controller";
import { GameInput } from "./presentation/input/game_input";
import { KeyboardInput } from "./presentation/input/keyboard_input";

class Proj2024 {
	private m_app: Application;
	private m_sceneController: SceneController;

	/**
	 * エントリーポイント
	 */
	public static async run() {
		// WebAssembly モジュール初期化
		await init();
		const instance = new Proj2024();
	}

	public constructor() {
		PresentationServiceLocator.screenInfo = new ScreenInfo(window.innerWidth, window.innerHeight);

		// pixi.js 初期化
		this.m_app = new Application({
			background: 0xFF00FF,
			antialias: false,
			backgroundAlpha: 1,
			width: PresentationServiceLocator.screenInfo.size.width,
			height: PresentationServiceLocator.screenInfo.size.height,
		});

		// stage 登録
		PresentationServiceLocator.stage = this.m_app.stage;

		// キャンバス設置
		document.body.appendChild(ScreenInfo.setToCenter(this.m_app.view as HTMLCanvasElement));
		// OS 由来のタッチイベント排除
		disableTouchEvent(this.m_app.view as unknown as HTMLElement);
		disableOuterCanvasTouchEvent();

		// リサイズ処理登録
		window.addEventListener("resize", () => this.onResize());

		// キーボード入力
		PresentationServiceLocator.keyboardInput = new KeyboardInput();
		window.addEventListener("keydown", e => PresentationServiceLocator.keyboardInput.onKeyDown(e));
		window.addEventListener("keyup", e => PresentationServiceLocator.keyboardInput.onKeyUp(e));

		// 統一入力
		PresentationServiceLocator.gameInput = new GameInput();

		// シーン登録
		this.m_sceneController = new SceneController(new TestScene());

		// 更新メソッド登録
		this.m_app.ticker.add(delta => this.update(delta));
	}

	// TODO: onUpdate にリネーム
	public async update(delta: number) {
		PresentationServiceLocator.keyboardInput.onUpdate();
		this.m_sceneController.onUpdate(delta);
	}

	public onResize() {
		PresentationServiceLocator.screenInfo = new ScreenInfo(window.innerWidth, window.innerHeight);
		this.m_app.renderer.resize(PresentationServiceLocator.screenInfo.size.width,
			PresentationServiceLocator.screenInfo.size.height);
		this.m_sceneController.onResize();
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
