import * as THREE from 'three'
import CameraControls from 'camera-controls'
import { Renderer } from './renderer'

CameraControls.install({ THREE: THREE })

export class Camera extends THREE.PerspectiveCamera {
	public cameraControls: CameraControls
	public followedObject: THREE.Mesh | undefined
	public offset = new THREE.Vector3(0, 10, 15)

	constructor(renderer: Renderer) {
		super(75, window.innerWidth / window.innerHeight, 0.1, 1000)

		this.cameraControls = new CameraControls(this, renderer.domElement)

		// Set initial camera position
		this.position.set(0, 10, 20)

		this.cameraControls.setLookAt(0, 10, 20, 0, 0, 0)

		this.cameraControls.maxDistance = 100
		this.cameraControls.minDistance = 0.01
	}

	update(delta: number) {
		this.cameraControls.update(delta)
	}
}
