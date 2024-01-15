export class KeyboardInput {
	// TODO: enum にする
	public static readonly KEY_UP    = 0x01 << 1;
	public static readonly KEY_DOWN  = 0x01 << 2;
	public static readonly KEY_LEFT  = 0x01 << 3;
	public static readonly KEY_RIGHT = 0x01 << 4;
	public static readonly KEY_A     = 0x01 << 5;
	public static readonly KEY_B     = 0x01 << 6;

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

	public static get keyCode() {
		return {
			KEY_UP: KeyboardInput.KEY_UP,
			KEY_DOWN: KeyboardInput.KEY_DOWN,
			KEY_LEFT: KeyboardInput.KEY_LEFT,
			KEY_RIGHT: KeyboardInput.KEY_RIGHT,
			KEY_A: KeyboardInput.KEY_A,
			KEY_B: KeyboardInput.KEY_B,
		};
	}

	public status() {
		return this.m_currentKeyStatus;
	}

	public isTriggered(key: number) {
		return ((this.m_currentKeyStatus & ~this.m_prevKeyStatus) & key) !== 0;
	}

	public isPressing(key: number) {
		return (this.m_currentKeyStatus & key) !== 0;
	}

	public onUpdate(delta = 0) {
		this.m_prevKeyStatus = this.m_currentKeyStatus;
		this.m_currentKeyStatus = this.m_tempKeyStatus;
	}

	public onKeyDown(e: KeyboardEvent) {
		[
			{ keys: this.m_upKeys, code: KeyboardInput.KEY_UP },
			{ keys: this.m_downKeys, code: KeyboardInput.KEY_DOWN },
			{ keys: this.m_leftKeys, code: KeyboardInput.KEY_LEFT },
			{ keys: this.m_rightKeys, code: KeyboardInput.KEY_RIGHT },
			{ keys: this.m_buttonAKeys, code: KeyboardInput.KEY_A },
			{ keys: this.m_buttonBKeys, code: KeyboardInput.KEY_B },
		].forEach(pair => {
			if (pair.keys.some(key => key === e.key)) {
				this.m_tempKeyStatus |= pair.code;
			}
		});
	}

	public onKeyUp(e: KeyboardEvent) {
		[
			{ keys: this.m_upKeys, code: KeyboardInput.KEY_UP },
			{ keys: this.m_downKeys, code: KeyboardInput.KEY_DOWN },
			{ keys: this.m_leftKeys, code: KeyboardInput.KEY_LEFT },
			{ keys: this.m_rightKeys, code: KeyboardInput.KEY_RIGHT },
			{ keys: this.m_buttonAKeys, code: KeyboardInput.KEY_A },
			{ keys: this.m_buttonBKeys, code: KeyboardInput.KEY_B },
		].forEach(pair => {
			if (pair.keys.some(key => key === e.key)) {
				this.m_tempKeyStatus &= ~pair.code;
			}
		});
	}
}
