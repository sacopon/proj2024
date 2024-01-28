import { Assets, Sprite } from "pixi.js";
import { Scene, SceneParameter } from "../core/scene";
import { SceneController } from "../core/scene_controller";
import { GameInput } from "../input/game_input";

export class TestScene2 extends Scene {
	public constructor(sceneController: SceneController) {
		super(sceneController);
	}

	public getStaticResources(): { alias: string, src: string }[] {
		return [
			{ alias: "neko_2", src: "/images/neko_2.jpg" },
		];
	}

	protected async processOnEnter(_: SceneParameter): Promise<void> {
		console.log("Test2Scene#onEnterCallback");
		const s = Sprite.from(Assets.get("neko_2"));
		s.position.set(this.center.x - ~~(s.width / 2), this.center.y - ~~(s.height / 2));
		this.addChild(s);
	}

	protected async processOnLeave(): Promise<void> {
		console.log("Test2Scene#onLeaveCallback");
	}

	protected processOnUpdate(_: number): void {
		if (this.gameInput.isTriggered(GameInput.Key.KEY_BUTTON1)) {
			this.goTo('test1');
		}
	}

	protected processOnResize(): void {
	}
}