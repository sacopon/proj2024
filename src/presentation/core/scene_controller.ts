import { Scene, SceneParameter } from "./scene";
import { Assets } from "pixi.js";
import { SceneRepositoryInterface } from "./scene_repository";

/**
 * 現在のシーンと、シーンの遷移を司るクラス
 */
export class SceneController {
	private m_sceneRepositoryInterface: SceneRepositoryInterface;
	private m_currentScene: Scene | null;
	// TODO: 別クラスに括り出し
	private m_nextSceneName: string | null;
	private m_nextSceneParams: SceneParameter | null;

	/**
	 * コンストラクタ
	 *
	 * @param initialSceneName 最初のシーン
	 */
	public constructor(sceneRepository: SceneRepositoryInterface, initialSceneName: string) {
		this.m_currentScene = null;
		this.m_nextSceneName = initialSceneName;
		this.m_nextSceneParams = null;
		this.m_sceneRepositoryInterface = sceneRepository;
	}

	/**
	 * シーンを遷移する
	 */
	public changScene(name: string, params: SceneParameter | null = null) {
		this.m_nextSceneName = name;
		this.m_nextSceneParams = params;
	}

	public onResize() {
		return this.m_currentScene!.onResize();
	};

	/**
	 * フレーム更新処理
	 */
	public async onUpdate(delta: number) {
		if (this.m_nextSceneName) {
			const nextSceneParams = this.m_nextSceneParams;
			const nextScene = this.m_sceneRepositoryInterface.getScene(this.m_nextSceneName);
			this.m_nextSceneName = this.m_nextSceneParams = null;

			const resources = nextScene.getStaticResources().filter(res => !Assets.cache.has(res.alias));
			Assets.addBundle("resources", resources);
			await Assets.loadBundle("resources");

			const onEnterParams = await nextScene.request(nextSceneParams);
			await this.m_currentScene?.onLeave();
			await nextScene.onEnter(onEnterParams);
			this.m_currentScene = nextScene;
		}

		this.m_currentScene?.onUpdate(delta);
	}

}
