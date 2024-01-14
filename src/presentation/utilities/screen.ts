import { Size, SafeArea } from "../core/types";

/**
 * 画面サイズに関わる設定とその値の保持
 */
export class Screen {
	private static readonly SAFE_AREA_WIDTH = 1280;
	private static readonly SAFE_AREA_HEIGHT = 720;
	private static readonly MAXIMUM_HEIGHT = 800;
	private m_innerWidth: number;
	private m_innerHeight: number;
	private m_screenSize: Size;
	private m_safeArea: SafeArea;

	public constructor(innerWidth: number, innerHeight: number) {
		this.m_innerWidth = innerWidth;
		this.m_innerHeight = innerHeight;
		this.m_screenSize = Screen.calculateScreenSize(this.m_innerWidth, this.m_innerHeight);
		this.m_safeArea = Screen.calculateSafeArea(this.m_screenSize);
	}

	public get size(): {width: number, height: number} {
		return this.m_screenSize;
	}

	public get safeArea() {
		return this.m_safeArea;
	}
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
	private static calculateScreenSize(innerWidth: number, innerHeight: number): Size {
		// 16:9 より細長い場合は縦720pxを基準に画面サイズを設定
		// それより太い場合は縦800pxを基準に画面サイズを設定
		const aspect_ratio = Math.max(innerWidth / innerHeight, 16 / 10);
		const height = aspect_ratio < 16 / 9 ? Screen.MAXIMUM_HEIGHT : Screen.SAFE_AREA_HEIGHT;

		return {
			width: Math.floor(height * aspect_ratio),
			height,
		};
	}

	/**
	 * 実画面サイズから、必ず表示される領域の位置、サイズを計算する
	 */
	private static calculateSafeArea(screenSize: Size): SafeArea {
		const x = Math.floor((screenSize.width  - Screen.SAFE_AREA_WIDTH) / 2);
		const y = Math.floor((screenSize.height -  Screen.SAFE_AREA_HEIGHT) / 2);

		return {
			x,
			y,
			width: Screen.SAFE_AREA_WIDTH,
			height: Screen.SAFE_AREA_HEIGHT,
			left: x,
			top: y,
			right: x + Screen.SAFE_AREA_WIDTH,
			bottom: y + Screen.SAFE_AREA_HEIGHT,
			center: {
				x: x + Math.floor(Screen.SAFE_AREA_WIDTH  / 2),
				y: y + Math.floor(Screen.SAFE_AREA_HEIGHT / 2),
			},
		};
	}
}
