import { Application, Sprite, Assets, Container } from "pixi.js";
import init, { greet } from "../wasm/pkg";
import { ScreenUtility } from "./application/utilities/screen_utility";
import { disableTouchEvent, disableOuterCanvasTouchEvent } from "./application/utilities/disable_touch_event";

class Proj2024 {
	private static m_instance: Proj2024 | null = null;
	private m_app: Application;
	private m_state = 0;
	private m_sprite: Sprite | null = null;

	/**
	 * エントリーポイント
	 */
	public static async run() {
		// WebAssembly モジュール初期化
		await init();

		this.m_instance = new Proj2024();
	}

	public constructor() {
		const screenSize = ScreenUtility.calculateScreenSize();

		// pixi.js 初期化
		this.m_app = new Application({
			background: 0xFF00FF,
			antialias: false,
			backgroundAlpha: 1,
			width: screenSize.width,
			height: screenSize.height,
		});

		// キャンバス設置
		document.body.appendChild(ScreenUtility.setToCenter(this.m_app.view as HTMLCanvasElement));
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

			Assets.addBundle("resources", [
				{alias: "neko", src: "/images/neko.jpg"},
				{alias: "s", src: "/images/s.png"},
			]);
			await Assets.loadBundle("resources");
			this.m_sprite = Sprite.from(Assets.get("neko"));
			this.m_app.stage.addChild(this.m_sprite);

			const sprite = this.m_sprite!;
			sprite.x = Math.floor((this.m_app.screen.width - sprite.width) / 2);
			sprite.y = Math.floor((this.m_app.screen.height - sprite.height) / 2);

			const s1 = Sprite.from(Assets.get("s"));
			this.m_app.stage.addChild(s1);

			const s2 = Sprite.from(Assets.get("s"));
			s2.x = Math.floor((this.m_app.screen.width - s2.width) / 2);
			s2.y = Math.floor((this.m_app.screen.height - s2.height) / 2);
			this.m_app.stage.addChild(s2);
		}
	}

	public onResize() {
		const size = ScreenUtility.calculateScreenSize();
		this.m_app.renderer.resize(size.width, size.height);

		// TODO: Sprite ではなくメインのルートコンテナの配置をセンタリングする
		// TODO: ルートコンテナは screen の幅/高さと、実際の innerWidth/innerHeight から算出した中央に配置
		const sprite = this.m_sprite!;
		sprite.x = Math.floor((this.m_app.screen.width - sprite.width) / 2);
		sprite.y = Math.floor((this.m_app.screen.height - sprite.height) / 2);
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
