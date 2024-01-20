import { Scene, SceneParameter } from "./scene";
import { Assets } from "pixi.js";

/**
 * 現在のシーンと、シーンの遷移を司るクラス
 */
export class SceneController {
	private m_currentScene: Scene | null;
	private m_nextScene: Scene | null;

	/**
	 * コンストラクタ
	 *
	 * @param initialScene 最初のシーン
	 */
	public constructor(initialScene: Scene) {
		this.m_currentScene = null;
		this.m_nextScene = initialScene;
	}

	public onResize() {
		return this.m_currentScene!.onResize();
	};

	/**
	 * フレーム更新処理
	 */
	public async onUpdate(delta: number) {
		if (this.m_nextScene) {
			this.m_currentScene = this.m_nextScene;
			this.m_nextScene = null;
			Assets.addBundle("resources", this.m_currentScene.getStaticResources());
			await Assets.loadBundle("resources");

			// TODO: request の引数は前のシーンから取得する
			const params = await this.m_currentScene.request({});
			await this.m_currentScene.onEnter(params);
		}

		this.m_currentScene!.onUpdate(delta);
	}

}
