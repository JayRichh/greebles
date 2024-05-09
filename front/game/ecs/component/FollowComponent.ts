import { Camera } from '@/game/camera'
import { Component } from '@shared/component/Component'
import * as THREE from 'three'

export class FollowComponent extends Component {
	private direction: THREE.Vector3 = new THREE.Vector3()

	constructor(
		entityId: number,
		public camera: Camera
	) {
		super(entityId)
		this.updateDirection()
	}

	getDirection(): THREE.Vector3 {
		return this.direction.clone()
	}

	updateDirection(): void {
		// Calculate forward direction from camera's current orientation
		const forward = new THREE.Vector3()
		this.camera.getWorldDirection(forward)
		this.direction = forward
	}
}
