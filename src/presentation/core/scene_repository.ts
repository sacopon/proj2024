import { Scene } from "./scene";

export interface SceneRepositoryInterface {
	getScene(name: string): Scene;
}

/**
 * 各シーンのインスタンスの取得を行うリポジトリ
 */
export class SceneRespository implements SceneRepositoryInterface {
	private sceneMap = new Map<string, Scene>();

	public constructor() {
	}

	addScene(name: string, scene: Scene) {
		if (this.sceneMap.has(name)) {
			throw new Error("A scene with the same name has already been registered.");
		}

		this.sceneMap.set(name, scene);
	}

	getScene(name: string): Scene {
		if (!this.sceneMap.has(name)) {
			throw new Error(`scene[${name}] is not found in scene repository.`);
		}

		return this.sceneMap.get(name)!;
	}
}
