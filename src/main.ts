import { Application, Sprite, Assets, Container } from "pixi.js";
import init, { greet } from "../wasm/pkg";
import { Screen } from "./presentation/utilities/screen";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "./presentation/utilities/disable_touch_event";
import { KeyboardInput } from "./presentation/input/keyboard_input";
import { TestScene } from "./presentation/common/test_scene";
import { PresentationServiceLocator } from "./presentation/core/presentation_service_locator";

class Proj2024 {
	private m_screen: Screen;
	private m_app: Application;
	private m_state = 0;
	private m_scene: TestScene;
	private m_keyboard = new KeyboardInput();

	/**
	 * エントリーポイント
	 */
	public static async run() {
		// WebAssembly モジュール初期化
		await init();
		const instance = new Proj2024();
	}

	public constructor() {
		this.m_screen = new Screen(window.innerWidth, window.innerHeight);

		// pixi.js 初期化
		this.m_app = new Application({
			background: 0xFF00FF,
			antialias: false,
			backgroundAlpha: 1,
			width: this.m_screen.size.width,
			height: this.m_screen.size.height,
		});

		// キャンバス設置
		document.body.appendChild(Screen.setToCenter(this.m_app.view as HTMLCanvasElement));
		// OS 由来のタッチイベント排除
		disableTouchEvent(this.m_app.view as unknown as HTMLElement);
		disableOuterCanvasTouchEvent();

		// リサイズ処理登録
		window.addEventListener("resize", () => this.onResize());

		// キーボード入力
		PresentationServiceLocator.keyboard = this.m_keyboard;
		window.addEventListener("keydown", e => this.m_keyboard.onKeyDown(e));
		window.addEventListener("keyup", e => this.m_keyboard.onKeyUp(e));

		// シーン登録
		this.m_scene = new TestScene(this.m_screen, this.m_app.stage);

		// 更新メソッド登録
		this.m_app.ticker.add(delta => this.update(delta));
	}

	public async update(delta: number) {
		this.m_keyboard.onUpdate(delta);

		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_A)) { console.log('A'); }
		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_B)) { console.log('B'); }
		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_UP)) { console.log('↑'); }
		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_DOWN)) { console.log('↓'); }
		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_LEFT)) { console.log('←'); }
		// if (this.m_keyboard.isTriggered(KeyboardInput.KEY_RIGHT)) { console.log('→'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_A)) { console.log('A'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_B)) { console.log('B'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_UP)) { console.log('↑'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_DOWN)) { console.log('↓'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_LEFT)) { console.log('←'); }
		// if (this.m_keyboard.isPressing(KeyboardInput.KEY_RIGHT)) { console.log('→'); }

		// 毎フレームの更新処理
		if (this.m_state === 0) {
			++this.m_state;
			await this.m_scene.request();
			await this.m_scene.onEnter();
		}
		else {
			this.m_scene.onUpdate(delta);
		}
	}

	public onResize() {
		this.m_screen = new Screen(window.innerWidth, window.innerHeight);
		this.m_app.renderer.resize(this.m_screen.size.width, this.m_screen.size.height);
		this.m_scene.onResize(this.m_screen);
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
