import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'

interface ButtonProps {
	scene: THREE.Scene
	world: CANNON.World
	camera: THREE.Camera
	shelf: THREE.Object3D
	font: Font
	router: any
}

export class Button {
	private button!: THREE.Mesh
	private buttonBody!: CANNON.Body
	private rope!: THREE.Line
	private ropeSegments: THREE.Vector3[] = []
	private ropeConstraints: CANNON.PointToPointConstraint[] = []
	private isDragging: boolean = false
	private dragStartPosition: THREE.Vector3 = new THREE.Vector3()
	private dragOffset: THREE.Vector3 = new THREE.Vector3()
	private dragDirection: THREE.Vector3 = new THREE.Vector3()
	private clickCount: number = 0
	constructor(private props: ButtonProps) {
		this.createButton()
		this.createHolder()
		this.setupEventListeners()
	}

	private setupEventListeners(): void {
		window.addEventListener('click', this.onClick.bind(this))
		window.addEventListener('mousedown', this.onMouseDown.bind(this))
		window.addEventListener('mouseup', this.onMouseUp.bind(this))
		window.addEventListener('mousemove', this.onMouseMove.bind(this))
	}

	public dispose(): void {
		// event listeners
		window.removeEventListener('click', this.onClick)
		window.removeEventListener('mousedown', this.onMouseDown)
		window.removeEventListener('mouseup', this.onMouseUp)
		window.removeEventListener('mousemove', this.onMouseMove)

		// button from the scene and its physical body
		if (this.button && this.props.scene) {
			this.props.scene.remove(this.button)
		}
		if (this.buttonBody && this.props.world) {
			this.props.world.removeBody(this.buttonBody)
		}

		// rope and its constraints
		if (this.rope && this.props.scene) {
			this.props.scene.remove(this.rope)
		}

		// constraints removed before removing bodies
		this.ropeConstraints.forEach((constraint) => {
			if (constraint && this.props.world) {
				this.props.world.removeConstraint(constraint)
			}
		})

		// each rope segment body
		this.ropeSegments.forEach((_, index) => {
			const bodyIndex = this.props.world.bodies.length - this.ropeSegments.length + index
			if (bodyIndex >= 0 && bodyIndex < this.props.world.bodies.length) {
				const body = this.props.world.bodies[bodyIndex]
				if (body) {
					this.props.world.removeBody(body)
				}
			}
		})
	}

	private createFadeEffect() {
		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff, // white color
			transparent: true,
			opacity: 0, // start fully transparent
		})

		// Create a plane that spans the whole screen
		const aspect = window.innerWidth / window.innerHeight
		const frustumSize = 10
		const geometry = new THREE.PlaneGeometry(frustumSize * aspect, frustumSize)
		const plane = new THREE.Mesh(geometry, material)
		plane.position.set(0, 0, 0.1) // Position slightly in front of the camera

		this.props.scene.add(plane)

		return plane
	}

	private animateFadeToWhite(plane: THREE.Mesh, onComplete: () => void) {
		const duration = 2000 // fade duration in milliseconds
		const startTime = performance.now()

		const animate = () => {
			const elapsedTime = performance.now() - startTime
			const fraction = elapsedTime / duration

			if (fraction < 1) {
				;(plane.material as THREE.MeshBasicMaterial).opacity = fraction
				requestAnimationFrame(animate)
			} else {
				;(plane.material as THREE.MeshBasicMaterial).opacity = 1
				onComplete() // call the completion handler when fade is complete
			}
		}

		animate()
	}

	private detachRope() {
		if (this.props.world) {
			while (this.props.world.constraints.length > 0) {
				this.props.world.removeConstraint(this.props.world.constraints[0])
			}
		}

		this.ropeSegments.forEach((segment, index) => {
			const body = this.props.world.bodies.find(
				(b) =>
					Math.abs(b.position.x - segment.x) < 0.01 &&
					Math.abs(b.position.y - segment.y) < 0.01 &&
					Math.abs(b.position.z - segment.z) < 0.01
			)
			if (body) {
				body.type = CANNON.Body.DYNAMIC
				body.updateMassProperties()
			}
		})

		this.updateRopeGeometry()
		// Start the fade out process after a 2.4 second delay
		setTimeout(() => {
			const fadePlane = this.createFadeEffect()
			this.animateFadeToWhite(fadePlane, () => {
				// Dispose of your scene and resources here
				this.dispose()
				// Transition to game
				this.props.router.push('/game')
			})
		}, 1000)
	}

	private updateRopeGeometry(): void {
		if (this.rope && this.rope.geometry && this.rope.geometry.attributes.position) {
			const positions = this.rope.geometry.attributes.position.array as Float32Array
			this.ropeSegments.forEach((segment, index) => {
				positions[index * 3 + 0] = segment.x
				positions[index * 3 + 1] = segment.y
				positions[index * 3 + 2] = segment.z
			})
			this.rope.geometry.attributes.position.needsUpdate = true
			this.rope.geometry.setDrawRange(0, this.ropeSegments.length * 3)
		}
	}

	private createButton(): void {
		const buttonWidth = 2
		const buttonHeight = 1
		const buttonDepth = 1

		// Create rounded corners with bevel
		const radius = 0.05
		const bevelSize = 0.05
		const buttonShape2D = new THREE.Shape()
		buttonShape2D.moveTo(radius, buttonHeight / 2 - radius)
		buttonShape2D.lineTo(buttonWidth / 2 - radius, buttonHeight / 2 - radius)
		buttonShape2D.quadraticCurveTo(
			buttonWidth / 2,
			buttonHeight / 2 - radius,
			buttonWidth / 2,
			buttonHeight / 2 - radius * 2
		)
		buttonShape2D.lineTo(buttonWidth / 2, -buttonHeight / 2 + radius * 2)
		buttonShape2D.quadraticCurveTo(
			buttonWidth / 2,
			-buttonHeight / 2 + radius,
			buttonWidth / 2 - radius,
			-buttonHeight / 2 + radius
		)
		buttonShape2D.lineTo(-buttonWidth / 2 + radius, -buttonHeight / 2 + radius)
		buttonShape2D.quadraticCurveTo(
			-buttonWidth / 2,
			-buttonHeight / 2 + radius,
			-buttonWidth / 2,
			-buttonHeight / 2 + radius * 2
		)
		buttonShape2D.lineTo(-buttonWidth / 2, buttonHeight / 2 - radius * 2)
		buttonShape2D.quadraticCurveTo(
			-buttonWidth / 2,
			buttonHeight / 2 - radius,
			-buttonWidth / 2 + radius,
			buttonHeight / 2 - radius
		)

		const extrudeSettings = {
			bevelEnabled: true,
			bevelSize: bevelSize,
			bevelThickness: bevelSize,
			bevelSegments: 3,
			depth: buttonDepth,
			bevelOffsetZ: -buttonDepth / 2,
		}

		const buttonGeometry = new THREE.ExtrudeGeometry(buttonShape2D, extrudeSettings)

		const buttonMaterial = new THREE.MeshStandardMaterial({
			color: 0x98fb98,
			roughness: 0.6,
			metalness: 0.4,
		})
		const buttonEdgeMaterial = new THREE.MeshLambertMaterial({
			color: 0x6b8e23,
			emissive: 0x6b8e23,
			emissiveIntensity: 0.4,
		})

		this.button = new THREE.Mesh(buttonGeometry, [buttonMaterial, buttonEdgeMaterial])

		// Compute the center of the button geometry
		const buttonCenter = new THREE.Vector3(0, 0, 0)
		buttonGeometry.computeBoundingBox()
		buttonGeometry.boundingBox!.getCenter(buttonCenter)

		this.button.position.set(-buttonCenter.x, -buttonCenter.y - 6, -buttonCenter.z)

		this.props.scene.add(this.button)
		const textGeometry = new TextGeometry('Moit', {
			font: this.props.font,
			size: 0.5,
			height: 0.2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 5,
		})
		textGeometry.center()
		textGeometry.computeBoundingBox()
		textGeometry.translate(0, 0, buttonDepth / 2 + 0.1)
		const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
		const textMesh = new THREE.Mesh(textGeometry, textMaterial)
		textMesh.position.set(0, 0, buttonDepth / 2 + 0.01)

		this.button.add(textMesh)

		const buttonShape3D = new CANNON.Box(new CANNON.Vec3(buttonWidth / 2, buttonHeight / 2, buttonDepth / 2))
		this.buttonBody = new CANNON.Body({
			mass: 10,
			shape: buttonShape3D,
			position: new CANNON.Vec3(this.button.position.x, this.button.position.y, this.button.position.z),
		})
		this.props.world.addBody(this.buttonBody)

		// Add event listeners for hover and click interactions
		window.addEventListener('mousemove', this.onMouseMove.bind(this))
		window.addEventListener('mousedown', this.onMouseDown.bind(this))
		window.addEventListener('mouseup', this.onMouseUp.bind(this))
		window.addEventListener('wheel', this.onMouseWheel.bind(this), { passive: false })
	}

	private createHolder(): void {
		const ropeSegments = 20 // Increase the number of segments for better stability
		const ropeLength = 2
		const segmentLength = ropeLength / ropeSegments

		const ropeGeometry = new THREE.BufferGeometry()
		const ropePositions = new Float32Array((ropeSegments + 1) * 3)
		ropeGeometry.setAttribute('position', new THREE.BufferAttribute(ropePositions, 3))
		const ropeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
		this.rope = new THREE.Line(ropeGeometry, ropeMaterial)
		this.props.scene.add(this.rope)

		for (let i = 0; i <= ropeSegments; i++) {
			const segmentPosition = new CANNON.Vec3(0, -i * segmentLength, 0)

			const mass = i === ropeSegments ? 0.1 : 1 // Increase the mass of rope segments for less elasticity

			const ropeSegment = new CANNON.Body({
				mass: mass,
				shape: new CANNON.Sphere(0.1),
				position: segmentPosition,
				linearDamping: 0.01, // Increase damping for more stability
				angularDamping: 0.01,
			})
			this.props.world.addBody(ropeSegment)
			this.ropeSegments.push(ropeSegment.position as unknown as THREE.Vector3)

			if (i > 0) {
				const constraint = new CANNON.PointToPointConstraint(
					ropeSegment,
					new CANNON.Vec3(0, segmentLength / 2, 0),
					this.props.world.bodies[this.props.world.bodies.length - 2],
					new CANNON.Vec3(0, -segmentLength / 2, 0),
					1e4 // Increase constraint force for less stretching
				)
				constraint.collideConnected = false
				this.props.world.addConstraint(constraint)
				this.ropeConstraints.push(constraint)
			}
		}

		const shelfBody = this.props.shelf.userData.shelfBody as CANNON.Body
		const topConstraint = new CANNON.PointToPointConstraint(
			this.props.world.bodies[this.props.world.bodies.length - ropeSegments - 1],
			new CANNON.Vec3(0, segmentLength / 2, 0),
			shelfBody,
			new CANNON.Vec3(0, -4.75, 0)
		)
		this.props.world.addConstraint(topConstraint)

		const bottomConstraint = new CANNON.PointToPointConstraint(
			this.props.world.bodies[this.props.world.bodies.length - 1],
			new CANNON.Vec3(0, -segmentLength / 2, 0),
			this.buttonBody,
			new CANNON.Vec3(0, 0.5, 0)
		)
		this.props.world.addConstraint(bottomConstraint)
	}

	private onMouseDown(event: MouseEvent): void {
		const raycaster = new THREE.Raycaster()
		const mouse = new THREE.Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		)
		raycaster.setFromCamera(mouse, this.props.camera)
		const intersects = raycaster.intersectObject(this.button)

		if (intersects.length > 0) {
			this.isDragging = true
			this.dragStartPosition.copy(intersects[0].point)
			this.dragOffset.subVectors(this.button.position, intersects[0].point)
			this.dragDirection.subVectors(intersects[0].point, this.props.camera.position).normalize()
			this.buttonBody.type = CANNON.Body.KINEMATIC // Assuming you want to control the physics body kinematically
		}
	}

	private onMouseMove(event: MouseEvent): void {
		if (this.isDragging) {
			const raycaster = new THREE.Raycaster()
			const mouse = new THREE.Vector2(
				(event.clientX / window.innerWidth) * 2 - 1,
				-(event.clientY / window.innerHeight) * 2 + 1
			)
			raycaster.setFromCamera(mouse, this.props.camera)

			const plane = new THREE.Plane()
			plane.setFromNormalAndCoplanarPoint(this.dragDirection, this.dragStartPosition)
			const intersection = new THREE.Vector3()
			raycaster.ray.intersectPlane(plane, intersection)

			if (intersection) {
				this.button.position.copy(intersection.add(this.dragOffset))
				this.buttonBody.position.copy(this.button.position as any) // Update the CANNON body position
			}
		}
	}

	private onMouseUp(event: MouseEvent): void {
		if (this.isDragging) {
			this.isDragging = false
			this.buttonBody.type = CANNON.Body.DYNAMIC
		}
	}

	private onMouseWheel(event: WheelEvent): void {
		if (this.isDragging) {
			event.preventDefault()
			const delta = event.deltaY * -0.05
			// Limit the button's movement along the z-axis
			this.button.position.z = Math.max(-1, Math.min(1, this.button.position.z + delta))
			this.buttonBody.position.z = this.button.position.z

			this.button.position.addScaledVector(this.dragDirection, delta)
			this.buttonBody.position.copy(this.button.position as any) // Update the CANNON body position
		}
	}

	private onClick(event: MouseEvent): void {
		const raycaster = new THREE.Raycaster()
		const mouse = new THREE.Vector2(
			(event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1
		)

		raycaster.setFromCamera(mouse, this.props.camera)
		const intersects = raycaster.intersectObject(this.button)

		if (intersects.length > 0) {
			const intersect = intersects[0]
			const face = intersect.face

			this.clickCount++
			if (this.clickCount === 3) {
				this.detachRope()
			}

			if (face) {
				// Check if face is not null or undefined
				console.log(`Clicked button:`, this.button)
				console.log(`Face normal:`, face.normal)

				const impulseStrength = 100
				const impulse = new CANNON.Vec3(
					-face.normal.x * impulseStrength,
					-face.normal.y * impulseStrength,
					-face.normal.z * impulseStrength
				)

				console.log(`Applying impulse to button:`, impulse)
				this.buttonBody.applyLocalImpulse(impulse, new CANNON.Vec3())

				const splatGeometry = new THREE.CircleGeometry(0.4, 32) // Adjusted for visibility
				const splatMaterial = new THREE.MeshBasicMaterial({
					color: new THREE.Color(Math.random(), Math.random(), Math.random()),
					transparent: true,
					opacity: 0.8,
				})
				const splatMesh = new THREE.Mesh(splatGeometry, splatMaterial)

				// Adjust position to be exactly on the surface where the mouse clicked
				splatMesh.position.copy(intersect.point)
				// splatMesh.position.addScaledVector(face.normal, 0.01) // Slightly offset along the normal
				splatMesh.lookAt(intersect.point.clone().add(face.normal))
				this.button.add(splatMesh)

				// Remove the splat after a short delay
				setTimeout(() => {
					this.button.remove(splatMesh)
				}, 500)
			} else {
				console.error('No face intersected.')
			}
		}
	}

	public update(): void {
		// Regular physics and visual updates

		if (this.button && this.buttonBody) {
			this.button.position.copy(this.buttonBody.position as unknown as THREE.Vector3)
			this.button.quaternion.copy(this.buttonBody.quaternion as unknown as THREE.Quaternion)
		}

		if (this.rope && this.rope.geometry) {
			this.updateRopeGeometry()
		}
	}
}

export default Button
