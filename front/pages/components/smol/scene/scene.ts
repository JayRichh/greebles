// SceneManager.ts

import * as THREE from 'three'
import { Config } from './config'

export class Scene extends THREE.Scene {
	public scene: THREE.Scene
	private camera: THREE.OrthographicCamera
	private ambientLight: THREE.AmbientLight = new THREE.AmbientLight()
	private mainGroup: THREE.Object3D

	constructor(private config: Config) {
		super()
		this.scene = new THREE.Scene()
		this.scene.background = new THREE.Color(this.config.scene_background_color)
		this.camera = this.setupCamera()
		this.mainGroup = new THREE.Object3D()
		this.scene.add(this.mainGroup)
		this.setupLights()
	}

	private setupCamera(): THREE.OrthographicCamera {
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = this.config.view_size
		const camera = new THREE.OrthographicCamera(
			(frustumSize * aspect) / -2,
			(frustumSize * aspect) / 2,
			frustumSize / 2,
			frustumSize / -2,
			1,
			1000
		)
		camera.position.set(this.config.camera_pos_x, this.config.camera_pos_y, this.config.camera_pos_z)
		camera.lookAt(this.scene.position)
		return camera
	}

	private setupLights(): void {
		this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
		this.scene.add(this.ambientLight)
	}

	getCamera(): THREE.OrthographicCamera {
		return this.camera
	}

	getMainGroup(): THREE.Object3D {
		return this.mainGroup
	}
}
