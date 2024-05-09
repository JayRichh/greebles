// import * as THREE from 'three'
// import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
// import * as CANNON from 'cannon-es'

// interface Actions {
// 	[key: string]: THREE.AnimationAction
// }

// export default class Kiwi {
// 	private kiwi!: THREE.Group
// 	private mixer: THREE.AnimationMixer
// 	private actions: Actions = {}
// 	private moveDirection = new THREE.Vector3()
// 	private rotateAngle = new THREE.Vector3(0, 1, 0)
// 	private speed = 5
// 	private physicsBody: CANNON.Body

// 	constructor(
// 		private scene: THREE.Scene,
// 		private world: CANNON.World
// 	) {
// 		this.loadModel()
// 	}

// 	private async loadModel(): Promise<void> {
// 		const loader = new GLTFLoader()
// 		loader.load('low_poly_kiwi_run.glb', (gltf: GLTF) => {
// 			this.kiwi = gltf.scene
// 			const scale = 24
// 			this.kiwi.scale.set(scale, scale, scale)
// 			this.kiwi.position.set(0, 0, 0)
// 			this.kiwi.rotation.set(0, Math.PI / 2, 0)

// 			this.kiwi.traverse((object: THREE.Object3D) => {
// 				if (object instanceof THREE.Mesh) {
// 					object.castShadow = true
// 					object.receiveShadow = true
// 					object.geometry.computeVertexNormals()
// 					object.material.side = THREE.DoubleSide
// 				}
// 			})

// 			this.setupPhysics()
// 			this.setupAnimations(gltf)
// 			this.scene.add(this.kiwi)
// 		})
// 	}

// 	private setupPhysics(): void {
// 		const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
// 		this.physicsBody = new CANNON.Body({
// 			mass: 1,
// 			shape: shape,
// 		})
// 		this.physicsBody.position.copy(this.kiwi.position as unknown as CANNON.Vec3)
// 		this.world.addBody(this.physicsBody)
// 	}

// 	private setupAnimations(gltf: GLTF): void {
// 		this.mixer = new THREE.AnimationMixer(gltf.scene)
// 		gltf.animations.forEach((clip: THREE.AnimationClip) => {
// 			const action = this.mixer.clipAction(clip)
// 			this.actions[clip.name] = action
// 			if (clip.name === 'Idle' || clip.name === 'Run' || clip.name === 'Walk') {
// 				action.play()
// 			}
// 		})
// 	}

// 	public update(delta: number): void {
// 		this.mixer.update(delta)
// 		this.kiwi.position.copy(this.physicsBody.position as unknown as THREE.Vector3)
// 		this.kiwi.quaternion.copy(this.physicsBody.quaternion as unknown as THREE.Quaternion)
// 	}

// 	public handleKeyDown(keyCode: string): void {
// 		switch (keyCode) {
// 			case 'ArrowUp':
// 			case 'KeyW':
// 				this.moveDirection.z = 1
// 				break
// 			case 'ArrowDown':
// 			case 'KeyS':
// 				this.moveDirection.z = -1
// 				break
// 			case 'ArrowLeft':
// 			case 'KeyA':
// 				this.moveDirection.x = -1
// 				break
// 			case 'ArrowRight':
// 			case 'KeyD':
// 				this.moveDirection.x = 1
// 				break
// 		}
// 	}

// 	public handleKeyUp(keyCode: string): void {
// 		switch (keyCode) {
// 			case 'ArrowUp':
// 			case 'KeyW':
// 			case 'ArrowDown':
// 			case 'KeyS':
// 				this.moveDirection.z = 0
// 				break
// 			case 'ArrowLeft':
// 			case 'KeyA':
// 			case 'ArrowRight':
// 			case 'KeyD':
// 				this.moveDirection.x = 0
// 				break
// 		}
// 	}

// 	public updateMovement(delta: number): void {
// 		const velocity = this.physicsBody.velocity
// 		const moveSpeed = this.speed * delta

// 		if (this.moveDirection.x !== 0 || this.moveDirection.z !== 0) {
// 			const angle = Math.atan2(this.moveDirection.x, this.moveDirection.z)
// 			const rotation = this.kiwi.rotation
// 			rotation.y = angle
// 			this.physicsBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z)

// 			velocity.x = Math.sin(angle) * moveSpeed
// 			velocity.z = Math.cos(angle) * moveSpeed

// 			if (this.actions['Run']) {
// 				this.actions['Run'].play()
// 			}
// 		} else {
// 			velocity.x = 0
// 			velocity.z = 0

// 			if (this.actions['Idle']) {
// 				this.actions['Idle'].play()
// 			}
// 		}
// 	}
// }
