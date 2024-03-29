import { Assets, Sprite } from "pixi.js"
import { Scene, SceneParameter } from "../core/scene";
import { GameInput } from "../input/game_input";
import { SceneController } from "../core/scene_controller";

/**
 * テスト用のシーン
 */
export class TestScene extends Scene {
	private m_sprite: Sprite | null = null;
	private s2: Sprite[] = [];
	private m_character: Sprite | null = null;

	public constructor(sceneController: SceneController) {
		super(sceneController);
	}

	public getStaticResources(): { alias: string, src: string }[] {
		return [
			{ alias: "neko", src: "/images/neko.jpg" },
			{ alias: "s", src: "/images/s.png" },
			{ alias: "characters", src: "/images/characters.json" },
		];
	}

	protected async processOnEnter(params: SceneParameter): Promise<void> {
		console.log("TestScene#onEnter");
		this.m_sprite = Sprite.from(Assets.get("neko"));
		this.addChild(this.m_sprite);

		const sprite = this.m_sprite!;
		sprite.x = this.center.x - Math.floor(sprite.width  / 2);
		sprite.y = this.center.y - Math.floor(sprite.height / 2);

		for (let i = 0; i < 4; ++i) {
			this.s2.push(Sprite.from(Assets.get("s")));
			this.addChild(this.s2[i]);
		}

		this.setSpritePos();

		// キャラクター表示
		this.m_character = new Sprite(Assets.get("characters").textures["chara1_up_1.png"]);
		this.addChild(this.m_character);
		this.m_character.x = this.center.x - Math.floor(this.m_character.width  / 2);
		this.m_character.y = this.center.y - Math.floor(this.m_character.height / 2);
	}

	protected async processOnLeave(): Promise<void> {
		this.s2 = [];
		this.m_sprite = null;
		this.m_character = null;
	}

	protected processOnUpdate(delta: number): void {
		const character = this.m_character!;

		if (this.gameInput.isTriggered(GameInput.Key.KEY_UP)) {
			character.texture = Assets.get("characters").textures["chara1_up_1.png"];
		}

		if (this.gameInput.isTriggered(GameInput.Key.KEY_DOWN)) {
			character.texture = Assets.get("characters").textures["chara1_down_1.png"];
		}

		if (this.gameInput.isTriggered(GameInput.Key.KEY_LEFT)) {
			character.texture = Assets.get("characters").textures["chara1_left_1.png"];
		}

		if (this.gameInput.isTriggered(GameInput.Key.KEY_RIGHT)) {
			character.texture = Assets.get("characters").textures["chara1_right_1.png"];
		}

		if (this.gameInput.isTriggered(GameInput.Key.KEY_BUTTON1)) {
			this.goTo('test2');
		}
	}

	protected processOnResize(): void {
		this.setSpritePos();
	}

	private setSpritePos() {
		let s: Sprite;

		for (let s of this.s2) {
			s.x = s.y = 0;
		}

		// 左上
		s = this.s2[0];
		s.x = this.screen.x;
		s.y = this.screen.y;

		// 右上
		s = this.s2[1];
		s.x = this.screen.x + this.screen.width - s.width;
		s.y = this.screen.y;

		// 左下
		s = this.s2[2];
		s.x = this.screen.x;
		s.y = this.screen.y + this.screen.height - s.height;

		// 右下
		s = this.s2[3];
		s.x = this.screen.x + this.screen.width  - s.width;
		s.y = this.screen.y + this.screen.height - s.height;
	}
}
