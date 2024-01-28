import { Container } from "pixi.js";
import { GameInput } from "../input/game_input";
import { KeyboardInput } from "../input/keyboard_input";
import { ScreenInfo } from "../utilities/screen_info";
import { SceneRepositoryInterface } from "./scene_repository";
import { SceneController } from "./scene_controller";

export class PresentationServiceLocator {
	private static m_screenInfo: ScreenInfo | null = null;
	private static m_stage: Container;
	private static m_gameInput: GameInput | null = null;
	private static m_keyboardInput: KeyboardInput | null = null;

	public static get screenInfo() {
		return this.m_screenInfo!;
	}

	public static set screenInfo(screenInfo_: ScreenInfo) {
		this.m_screenInfo = screenInfo_;
	}

	public static get stage() {
		return this.m_stage!;
	}

	public static set stage(stage_: Container) {
		this.m_stage = stage_;
	}

	public static get gameInput() {
		return PresentationServiceLocator.m_gameInput!;
	}

	public static set gameInput(gameInput_: GameInput) {
		PresentationServiceLocator.m_gameInput = gameInput_;
	}

	public static get keyboardInput() {
		return this.m_keyboardInput!;
	}

	public static set keyboardInput(keyboardInput_: KeyboardInput) {
		this.m_keyboardInput = keyboardInput_;
	}
}
