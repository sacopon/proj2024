export enum KeyboardInputKeyCode {
	ARROW_UP    = 0x01 << 0,
	ARROW_DOWN  = 0x01 << 1,
	ARROW_LEFT  = 0x01 << 2,
	ARROW_RIGHT = 0x01 << 3,
	KEY_Z       = 0x01 << 4,
	KEY_X       = 0x01 << 5,
}

export class KeyboardInput {
	private m_upKeys: String[];
	private m_downKeys: String[];
	private m_leftKeys: String[];
	private m_rightKeys: String[];
	private m_buttonAKeys: String[];
	private m_buttonBKeys: String[];
	private m_currentKeyStatus = 0;
	private m_prevKeyStatus = 0;
	private m_tempKeyStatus = 0;

	public constructor() {
		this.m_upKeys = ["ArrowUp"];
		this.m_downKeys = ["ArrowDown"];
		this.m_leftKeys = ["ArrowLeft"];
		this.m_rightKeys = ["ArrowRight"];
		this.m_buttonAKeys = [" ", "　", "z", "Z"];
		this.m_buttonBKeys = ["Shift", "x", "X"];
	}

	public status() {
		return this.m_currentKeyStatus;
	}

	public isTriggered(key: KeyboardInputKeyCode) {
		return ((this.m_currentKeyStatus & ~this.m_prevKeyStatus) & key) !== 0;
	}

	public isPressing(key: KeyboardInputKeyCode) {
		return (this.m_currentKeyStatus & key) !== 0;
	}

	public onUpdate() {
		this.m_prevKeyStatus = this.m_currentKeyStatus;
		this.m_currentKeyStatus = this.m_tempKeyStatus;
	}

	public onKeyDown(e: KeyboardEvent) {
		[
			{ keys: this.m_upKeys, code: KeyboardInputKeyCode.ARROW_UP },
			{ keys: this.m_downKeys, code: KeyboardInputKeyCode.ARROW_DOWN },
			{ keys: this.m_leftKeys, code: KeyboardInputKeyCode.ARROW_LEFT },
			{ keys: this.m_rightKeys, code: KeyboardInputKeyCode.ARROW_RIGHT },
			{ keys: this.m_buttonAKeys, code: KeyboardInputKeyCode.KEY_Z },
			{ keys: this.m_buttonBKeys, code: KeyboardInputKeyCode.KEY_X },
		].forEach(pair => {
			if (pair.keys.some(key => key === e.key)) {
				this.m_tempKeyStatus |= pair.code;
			}
		});
	}

	public onKeyUp(e: KeyboardEvent) {
		[
			{ keys: this.m_upKeys, code: KeyboardInputKeyCode.ARROW_UP },
			{ keys: this.m_downKeys, code: KeyboardInputKeyCode.ARROW_DOWN },
			{ keys: this.m_leftKeys, code: KeyboardInputKeyCode.ARROW_LEFT },
			{ keys: this.m_rightKeys, code: KeyboardInputKeyCode.ARROW_RIGHT },
			{ keys: this.m_buttonAKeys, code: KeyboardInputKeyCode.KEY_Z },
			{ keys: this.m_buttonBKeys, code: KeyboardInputKeyCode.KEY_X },
		].forEach(pair => {
			if (pair.keys.some(key => key === e.key)) {
				this.m_tempKeyStatus &= ~pair.code;
			}
		});
	}
}
