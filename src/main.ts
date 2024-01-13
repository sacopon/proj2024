class Proj2024 {
	/**
	 * エントリーポイント
	 */
	public static run() {
		const main = new Proj2024();
		main.execute();
	}

	public execute(): void {
		console.log("Proj2024#execute()");
	}
}

window.addEventListener("DOMContentLoaded", Proj2024.run);
