export class ScreenUtility {
	/**
	 * キャンバスにセンタリングされるよう CSS を設定する
	 *
	 * @param canvas センタリングする対象キャンバス
	 * @returns canvas
	 */
	public static setToCenter(canvas: HTMLCanvasElement): HTMLCanvasElement {
		canvas.style.width = "100%";
		canvas.style.position = "absolute";
		canvas.style.left = "50%";
		canvas.style.marginRight = "-50%";
		canvas.style.top = "50%";
		canvas.style.transform = "translate(-50%, -50%)";

		return canvas;
	}

	/**
	 * 実画面サイズからゲーム画面サイズを計算する
	 */
	public static calculateScreenSize(): { width: number, height: number } {
		// 16:9 より細長い場合は縦720pxを基準に画面サイズを設定
		// それより太い場合は縦800pxを基準に画面サイズを設定
		const aspectRatio = Math.max(window.innerWidth / window.innerHeight, 16 / 10);
		const height = aspectRatio < 16 / 9 ? 800 : 720;

		return {
			width: Math.floor(height * aspectRatio),
			height,
		};
	}
}
