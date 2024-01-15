import { KeyboardInput } from "../input/keyboard_input";

export class PresentationServiceLocator {
	private static m_keyboardInput: KeyboardInput | null = null;

	public static get keyboard() {
		return PresentationServiceLocator.m_keyboardInput!;
	}

	public static set keyboard(keyboard_: KeyboardInput) {
		PresentationServiceLocator.m_keyboardInput = keyboard_;
	}

	public static get keyCode() {
		return KeyboardInput.keyCode;
	}
}
