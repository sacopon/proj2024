import { Application } from "pixi.js";
import init, { greet } from "../wasm/pkg";

class Proj2024 {
	private static m_instance: Proj2024 | null = null;
	private m_app: Application;

	/**
	 * エントリーポイント
	 */
	public static async run() {
		// WebAssembly モジュール初期化
		await init();

		this.m_instance = new Proj2024();
	}

	public constructor() {
		// pixi.js 初期化
		this.m_app = new Application({
			background: 0xFF00FF,
			antialias: false,
			backgroundAlpha: 1,
			width: 1280,
			height: 800,
		});

		// キャンバス設置
		document.body.appendChild(this.m_app.view as unknown as Node);

		// 更新メソッド登録
		this.m_app.ticker.add(delta => this.update(delta));
	}

	public update(delta: number) {
		// 毎フレームの更新処理
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
