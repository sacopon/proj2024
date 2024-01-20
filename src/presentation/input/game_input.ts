import { PresentationServiceLocator } from "../core/presentation_service_locator";
import { KeyboardInput, KeyboardInputKeyCode } from "./keyboard_input";

enum Key {
	KEY_UP      = 0x01 << 0,
	KEY_DOWN    = 0x01 << 1,
	KEY_LEFT    = 0x01 << 2,
	KEY_RIGHT   = 0x01 << 3,
	KEY_BUTTON1 = 0x01 << 4,
	KEY_BUTTON2 = 0x01 << 5,
}

/**
 * ゲーム全体としての入力定義
 * キーボードやバーチャルキーなどから入力された情報を統合した入力データを提供する
 */
export class GameInput {
	private m_keyboardKeyByGameKey: Map<Key, KeyboardInputKeyCode>;
	private m_keyboard: KeyboardInput;

	public static get Key() {
		return Key;
	}

	public constructor() {
		this.m_keyboardKeyByGameKey = new Map();
		this.m_keyboardKeyByGameKey.set(Key.KEY_UP,      KeyboardInputKeyCode.ARROW_UP);
		this.m_keyboardKeyByGameKey.set(Key.KEY_DOWN,    KeyboardInputKeyCode.ARROW_DOWN);
		this.m_keyboardKeyByGameKey.set(Key.KEY_LEFT,    KeyboardInputKeyCode.ARROW_LEFT);
		this.m_keyboardKeyByGameKey.set(Key.KEY_RIGHT,   KeyboardInputKeyCode.ARROW_RIGHT);
		this.m_keyboardKeyByGameKey.set(Key.KEY_BUTTON1, KeyboardInputKeyCode.KEY_X);
		this.m_keyboardKeyByGameKey.set(Key.KEY_BUTTON2, KeyboardInputKeyCode.KEY_Z);

		this.m_keyboard = PresentationServiceLocator.keyboardInput;
	}

	public isTriggered(key: Key) {
		const keyCode = this.m_keyboardKeyByGameKey.get(key);
		if (!keyCode) {
			return false;
		}

		return this.m_keyboard.isTriggered(keyCode);
	}

	public isPressing(key: Key) {
		const keyCode = this.m_keyboardKeyByGameKey.get(key);
		if (!keyCode) {
			return false;
		}

		return this.m_keyboard.isPressing(keyCode);
	}
}
