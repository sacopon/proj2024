import { Application, Sprite, Assets, Container } from "pixi.js";
import init, { greet } from "../wasm/pkg";
import { Screen } from "./application/utilities/screen";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "./application/utilities/disable_touch_event";

class Proj2024 {
	private static m_instance: Proj2024 | null = null;
	private m_screen: Screen;
	private m_app: Application;
	private m_state = 0;
	private m_sprite: Sprite | null = null;
	private s2: Sprite[] = [];
	private m_sceneRoot: Container;

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

			// シーンのルートオブジェクトをセーフエリアの位置に配置
			// 原点がセーフエリア左上となる
			// TODO: ↑混乱するので、SceneRootContainer をクラスとして作成し、
			// 原点、サイズ、画面左上(セーフエリア外)、画面サイズ(セーフエリアより大きい)を取得できるようにまとめる
			this.m_sceneRoot = new Container();
			this.m_app.stage.addChild(this.m_sceneRoot);
			this.m_sceneRoot.x = this.m_screen.safeArea.x;
			this.m_sceneRoot.y = this.m_screen.safeArea.y;

			Assets.addBundle("resources", [
				{alias: "neko", src: "/images/neko.jpg"},
				{alias: "s", src: "/images/s.png"},
			]);
			await Assets.loadBundle("resources");
			this.m_sprite = Sprite.from(Assets.get("neko"));
			this.m_sceneRoot.addChild(this.m_sprite);

			const sprite = this.m_sprite!;
			sprite.x = Math.floor(this.m_screen.safeArea.width  / 2 - sprite.width  / 2);
			sprite.y = Math.floor(this.m_screen.safeArea.height / 2 - sprite.height / 2);

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

		this.m_sceneRoot.x = this.m_screen.safeArea.x;
		this.m_sceneRoot.y = this.m_screen.safeArea.y;
	}

	public setSpritePos() {
		let s: Sprite;

		for (let s of this.s2) {
			s.x = s.y = 0;
		}

		// 左上
		s = this.s2[0];
		s.x = 0;
		s.y = 0;

		// 右上
		s = this.s2[1];
		s.x = this.m_screen.safeArea.width - s.width;
		s.y = 0;

		// 左下
		s = this.s2[2];
		s.x = 0;
		s.y = this.m_screen.safeArea.height - s.height;

		// 右下
		s = this.s2[3];
		s.x = this.m_screen.safeArea.width  - s.width;
		s.y = this.m_screen.safeArea.height - s.height;
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
