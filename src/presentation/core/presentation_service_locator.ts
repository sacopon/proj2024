import { GameInput } from "../input/game_input";
import { KeyboardInput } from "../input/keyboard_input";

export class PresentationServiceLocator {
	private static m_gameInput: GameInput | null = null;
	private static m_keyboardInput: KeyboardInput | null = null;

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
