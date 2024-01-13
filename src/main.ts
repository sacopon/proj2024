import init, { greet } from "../wasm/pkg";

class Proj2024 {
	/**
	 * エントリーポイント
	 */
	public static async run() {
		(async () => {
			await init();
			greet("from TypeScript!");
		})();

		const main = new Proj2024();
		main.execute();
	}

	public execute(): void {
		console.log("Proj2024#execute()");
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
