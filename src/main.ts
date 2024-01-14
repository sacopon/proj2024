import { Application, Sprite, Assets, Container } from "pixi.js";
import init, { greet } from "../wasm/pkg";
import { Screen } from "./application/utilities/screen";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "./application/utilities/disable_touch_event";
import { SceneRootContainer } from "./presentation/core/scene_root_container";

class Proj2024 {
	private static m_instance: Proj2024 | null = null;
	private m_screen: Screen;
	private m_app: Application;
	private m_state = 0;
	private m_sprite: Sprite | null = null;
	private s2: Sprite[] = [];
	private m_sceneRoot: SceneRootContainer;

	/**
	 * エントリーポイント
	 */
	public static async run() {
		// WebAssembly モジュール初期化
		await init();

		this.m_instance = new Proj2024();
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

		// 更新メソッド登録
		this.m_app.ticker.add(delta => this.update(delta));
	}

	public async update(delta: number) {
		// 毎フレームの更新処理
		if (this.m_state === 0) {
			++this.m_state;

			this.m_sceneRoot = new SceneRootContainer(this.m_screen, this.m_app.stage);

			Assets.addBundle("resources", [
				{alias: "neko", src: "/images/neko.jpg"},
				{alias: "s", src: "/images/s.png"},
			]);
			await Assets.loadBundle("resources");
			this.m_sprite = Sprite.from(Assets.get("neko"));
			this.m_sceneRoot.addChild(this.m_sprite);

			const sprite = this.m_sprite!;
			sprite.x = this.m_sceneRoot.center.x - Math.floor(sprite.width  / 2);
			sprite.y = this.m_sceneRoot.center.y - Math.floor(sprite.height / 2);

			for (let i = 0; i < 4; ++i) {
				this.s2.push(Sprite.from(Assets.get("s")));
				this.m_sceneRoot.addChild(this.s2[i]);
			}

			this.setSpritePos();
		}
	}

	public onResize() {
		this.m_screen = new Screen(window.innerWidth, window.innerHeight);
		this.m_app.renderer.resize(this.m_screen.size.width, this.m_screen.size.height);
		this.m_sceneRoot.onResize(this.m_screen);
		this.setSpritePos();
	}

	public setSpritePos() {
		let s: Sprite;

		for (let s of this.s2) {
			s.x = s.y = 0;
		}

		// 左上
		s = this.s2[0];
		// s.x = 0;
		// s.y = 0;
		s.x = this.m_sceneRoot.screen.x;
		s.y = this.m_sceneRoot.screen.y;

		// 右上
		s = this.s2[1];
		// s.x = this.m_screen.safeArea.width - s.width;
		// s.y = 0;
		s.x = this.m_sceneRoot.screen.x + this.m_sceneRoot.screen.width - s.width;
		s.y = this.m_sceneRoot.screen.y;

		// 左下
		s = this.s2[2];
		// s.x = 0;
		// s.y = this.m_screen.safeArea.height - s.height;
		s.x = this.m_sceneRoot.screen.x;
		s.y = this.m_sceneRoot.screen.y + this.m_sceneRoot.screen.height - s.height;

		// 右下
		s = this.s2[3];
		// s.x = this.m_screen.safeArea.width  - s.width;
		// s.y = this.m_screen.safeArea.height - s.height;
		s.x = this.m_sceneRoot.screen.x + this.m_sceneRoot.screen.width  - s.width;
		s.y = this.m_sceneRoot.screen.y + this.m_sceneRoot.screen.height - s.height;
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
