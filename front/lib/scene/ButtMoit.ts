import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { useRouter } from 'next/router'

interface ButtonProps {
	scene: THREE.Scene
	world: CANNON.World
	camera: THREE.Camera
	shelf: THREE.Object3D
	font: Font
	router: any
}

class Button {
	private button!: THREE.Mesh
	private buttonBody!: CANNON.Body
	private rope!: THREE.Line
	private ropeSegments: CANNON.Body[] = []
	private ropeConstraints: CANNON.PointToPointConstraint[] = []
	private isDragging: boolean = false
	private dragStartPosition: THREE.Vector3 = new THREE.Vector3()
	private dragOffset: THREE.Vector3 = new THREE.Vector3()
	private dragDirection: THREE.Vector3 = new THREE.Vector3()
	private clickCount: number = 0

	constructor(
		private props: ButtonProps,
		private text: string,
		private color: number,
		private offset: THREE.Vector3
	) {
		if (this.props?.shelf?.userData) {
			this.createButton(text, color, offset)
			this.createHolder(offset)
			this.setupEventListeners()
		}
	}

	private setupEventListeners(): void {
		window.addEventListener('click', this.onClick.bind(this))
		window.addEventListener('mousedown', this.onMouseDown.bind(this))
		window.addEventListener('mouseup', this.onMouseUp.bind(this))
		window.addEventListener('mousemove', this.onMouseMove.bind(this))
	}

	public dispose(): void {
		window.removeEventListener('click', this.onClick)
		window.removeEventListener('mousedown', this.onMouseDown)
		window.removeEventListener('mouseup', this.onMouseUp)
		window.removeEventListener('mousemove', this.onMouseMove)

		if (this.button && this.props.scene) {
			this.props.scene.remove(this.button)
		}
		if (this.buttonBody && this.props.world) {
			this.props.world.removeBody(this.buttonBody)
		}
		if (this.rope && this.props.scene) {
			this.props.scene.remove(this.rope)
		}
		this.ropeConstraints.forEach((constraint) => {
			if (constraint && this.props.world) {
				this.props.world.removeConstraint(constraint)
			}
		})
		this.ropeSegments.forEach((body) => {
			if (body) {
				this.props.world.removeBody(body)
			}
		})
	}
	private createButton(text: string, color: number, offset: THREE.Vector3): void {
		const buttonWidth = 2
		const buttonHeight = 1
		const buttonDepth = 1

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
		}

		const buttonGeometry = new THREE.ExtrudeGeometry(buttonShape2D, extrudeSettings)
		const buttonMaterial = new THREE.MeshStandardMaterial({ color: color, roughness: 0.6, metalness: 0.4 })
		this.button = new THREE.Mesh(buttonGeometry, buttonMaterial)

		const buttonCenter = new THREE.Vector3()
		buttonGeometry.computeBoundingBox()
		buttonGeometry?.boundingBox!.getCenter(buttonCenter)
		this.button.position.set(
			offset.x - buttonCenter.x + (Math.random() - 0.5) * 0.1, // Randomize position slightly
			offset.y - buttonCenter.y + 3 + (Math.random() - 0.5) * 0.1, // Randomize position slightly
			offset.z - buttonCenter.z
		)

		this.button.quaternion.setFromEuler(
			new THREE.Euler((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1) // Random rotation
		)

		this.props.scene.add(this.button)

		// Set up the glow shader
		const glowShader = {
			vertexShader: `
				varying vec3 vNormal;
				varying vec3 vPositionNormal;
				void main() {
						vNormal = normalize(normalMatrix * normal);
						vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
		`,
			fragmentShader: `
				varying vec3 vNormal;
				varying vec3 vPositionNormal;
				uniform float glowSize;
				uniform vec3 glowColor;
				void main() {
						float intensity = pow(1.0 - dot(vNormal, vPositionNormal), 2.0);
						gl_FragColor = vec4(glowColor, intensity * glowSize);
				}
		`,
			uniforms: {
				glowSize: { value: 1.5 },
				glowColor: { value: new THREE.Color(0xffffff) },
			},
		}

		const glowMaterial = new THREE.ShaderMaterial({
			uniforms: glowShader.uniforms,
			vertexShader: glowShader.vertexShader,
			fragmentShader: glowShader.fragmentShader,
			side: THREE.FrontSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthWrite: false,
		})

		// Create text with a shadow and glow
		const textGeometry = new TextGeometry(text, {
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
		textGeometry.translate(0, 0, buttonDepth / 2 + 0.1) // Ensure text is visibly on top of the button

		const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
		const textMesh = new THREE.Mesh(textGeometry, textMaterial)
		textMesh.position.set(0, 0, buttonDepth / 2 + 0.01)

		// Adding the glow effect around the text
		const glowGeometry = textGeometry.clone()
		const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
		glowMesh.position.z = -0.05 // Position glow slightly behind the text
		this.button.add(glowMesh) // Add glow mesh as a child of the button

		this.button.add(textMesh)

		// Set up physics body
		const buttonShape3D = new CANNON.Box(new CANNON.Vec3(buttonWidth / 2, buttonHeight / 2, buttonDepth / 2))
		this.buttonBody = new CANNON.Body({
			mass: 10,
			shape: buttonShape3D,
			position: new CANNON.Vec3(this.button.position.x, this.button.position.y, this.button.position.z),
			linearDamping: 0.5 + Math.random() * 0.5,
			angularDamping: 0.5 + Math.random() * 0.5,
		})
		this.props.world.addBody(this.buttonBody)
		if (text === 'Play') {
			this.addWIPBanner()
		}
	}
	private createHolder(offset: THREE.Vector3): void {
		const ropeSegments = 20
		const ropeLength = 2
		const segmentLength = ropeLength / ropeSegments

		const ropeGeometry = new THREE.BufferGeometry()
		const ropePositions = new Float32Array((ropeSegments + 1) * 3)
		ropeGeometry.setAttribute('position', new THREE.BufferAttribute(ropePositions, 3))
		const ropeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
		this.rope = new THREE.Line(ropeGeometry, ropeMaterial)
		this.props.scene.add(this.rope)

		for (let i = 0; i <= ropeSegments; i++) {
			const segmentPosition = new CANNON.Vec3(offset.x, offset.y - i * segmentLength, offset.z)

			const mass = i === ropeSegments ? 0.1 : 1
			const ropeSegment = new CANNON.Body({
				mass: mass,
				shape: new CANNON.Sphere(0.15),
				position: segmentPosition,
				linearDamping: 0.8,
				angularDamping: 0.8,
			})
			this.props.world.addBody(ropeSegment)
			this.ropeSegments.push(ropeSegment)

			if (i > 0) {
				const constraint = new CANNON.PointToPointConstraint(
					ropeSegment,
					new CANNON.Vec3(0, segmentLength / 2, 0),
					this.ropeSegments[i - 1],
					new CANNON.Vec3(0, -segmentLength / 2, 0)
				)
				constraint.collideConnected = false
				this.props.world.addConstraint(constraint)
				this.ropeConstraints.push(constraint)
			}
		}

		const shelfBody = this.props.shelf.userData?.shelfBody as CANNON.Body
		if (shelfBody) {
			const raycaster = new THREE.Raycaster()
			const direction = new THREE.Vector3(0, 1, 0)
			const origin = new THREE.Vector3(offset.x, offset.y - 10, offset.z)

			raycaster.set(origin, direction)
			const intersects = raycaster.intersectObject(this.props.shelf)

			if (intersects.length > 0) {
				const intersectionPoint = intersects[0].point

				const topConstraint = new CANNON.PointToPointConstraint(
					this.ropeSegments[0],
					new CANNON.Vec3(0, segmentLength / 2, 0),
					shelfBody,
					new CANNON.Vec3(
						intersectionPoint.x - shelfBody.position.x,
						intersectionPoint.y - shelfBody.position.y,
						intersectionPoint.z - shelfBody.position.z
					)
				)
				this.props.world.addConstraint(topConstraint)

				const bottomConstraint = new CANNON.PointToPointConstraint(
					this.ropeSegments[this.ropeSegments.length - 1],
					new CANNON.Vec3(0, -segmentLength / 2, 0),
					this.buttonBody,
					new CANNON.Vec3(0, 0.5, 0)
				)
				this.props.world.addConstraint(bottomConstraint)
			} else {
				console.error('Raycaster did not intersect with the shelf.')
			}
		} else {
			console.error('shelfBody is not defined on the shelf userData')
		}
	}

	public update(): void {
		if (this.button && this.buttonBody) {
			this.button.position.copy(this.buttonBody.position as unknown as THREE.Vector3)
			this.button.quaternion.copy(this.buttonBody.quaternion as unknown as THREE.Quaternion)
		}

		if (this.rope && this.rope.geometry) {
			this.updateRopeGeometry()
		}
	}

	private updateRopeGeometry(): void {
		if (this.rope && this.rope.geometry && this.rope.geometry.attributes.position) {
			const positions = this.rope.geometry.attributes.position.array as Float32Array
			this.ropeSegments.forEach((segment, index) => {
				positions[index * 3 + 0] = segment.position.x
				positions[index * 3 + 1] = segment.position.y
				positions[index * 3 + 2] = segment.position.z
			})
			this.rope.geometry.attributes.position.needsUpdate = true
		}
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
			this.buttonBody.type = CANNON.Body.KINEMATIC
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
				this.buttonBody.position.copy(this.button.position as any)
			}
		}
	}
	private addWIPBanner(): void {
		const bannerWidth = 5
		const bannerHeight = 1.4

		// Create the canvas for the banner
		const bannerCanvas = document.createElement('canvas')
		bannerCanvas.width = 512
		bannerCanvas.height = 256
		const ctx = bannerCanvas.getContext('2d')
		if (ctx) {
			ctx.fillStyle = 'black'
			// Applying a border radius effect by using rounded corners for the black background
			const radius = 20 // Corner radius
			ctx.beginPath()
			ctx.moveTo(radius, 0)
			ctx.lineTo(512 - radius, 0)
			ctx.quadraticCurveTo(512, 0, 512, radius)
			ctx.lineTo(512, 256 - radius)
			ctx.quadraticCurveTo(512, 256, 512 - radius, 256)
			ctx.lineTo(radius, 256)
			ctx.quadraticCurveTo(0, 256, 0, 256 - radius)
			ctx.lineTo(0, radius)
			ctx.quadraticCurveTo(0, 0, radius, 0)
			ctx.closePath()
			ctx.fill()

			// Draw the yellow stripes
			ctx.fillStyle = 'yellow'
			for (let i = 0; i < bannerCanvas.width; i += 32) {
				ctx.beginPath()
				ctx.moveTo(i, 0)
				ctx.lineTo(i + 16, bannerCanvas.height)
				ctx.lineTo(i + 32, bannerCanvas.height)
				ctx.lineTo(i + 16, 0)
				ctx.closePath()
				ctx.fill()
			}
		}

		const bannerTexture = new THREE.CanvasTexture(bannerCanvas)

		const bannerGeometry = new THREE.PlaneGeometry(bannerWidth, bannerHeight, 1, 1)
		const bannerMaterial = new THREE.MeshBasicMaterial({ map: bannerTexture, side: THREE.DoubleSide })
		const bannerMesh = new THREE.Mesh(bannerGeometry, bannerMaterial)
		bannerMesh.position.set(0, 1.4, 0)
		this.button.add(bannerMesh)

		const createTextMesh = (text: string, size: number, yOffset: number) => {
			const textGeometry = new TextGeometry(text, {
				font: this.props.font,
				size: size,
				height: 0.1,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.01,
				bevelSize: 0.01,
				bevelOffset: 0,
				bevelSegments: 3,
			})
			textGeometry.center()

			const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
			const textMesh = new THREE.Mesh(textGeometry, textMaterial)
			const outlineGeometry = textGeometry.clone()
			const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true })
			const outlineMesh = new THREE.Mesh(outlineGeometry, outlineMaterial)
			outlineMesh.position.z = -0.04
			textMesh.add(outlineMesh)

			textMesh.position.set(0, yOffset, 0.1)
			return textMesh
		}

		// Create meshes for 'Under' and 'Construction' texts
		const underTextMesh = createTextMesh('Under', 0.6, 1.7)
		const constructionTextMesh = createTextMesh('Construction', 0.6, 1.2)

		this.button.add(underTextMesh)
		this.button.add(constructionTextMesh)
	}

	private onMouseUp(event: MouseEvent): void {
		if (this.isDragging) {
			this.isDragging = false
			this.buttonBody.type = CANNON.Body.DYNAMIC
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
				setTimeout(() => {
					if (this.text === 'About') {
						this.props.router.push('/about')
					} else if (this.text === 'Code') {
						this.props.router.push('/code')
					}
				}, 1500)
			}

			if (face) {
				const impulseStrength = 100
				const impulse = new CANNON.Vec3(
					-face.normal.x * impulseStrength,
					-face.normal.y * impulseStrength,
					-face.normal.z * impulseStrength
				)

				this.buttonBody.applyLocalImpulse(impulse, new CANNON.Vec3())
			}
		}
	}

	private navigate(route: string) {
		this.props.router.push(route)
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
					Math.abs(b.position.x - segment.position.x) < 0.01 &&
					Math.abs(b.position.y - segment.position.y) < 0.01 &&
					Math.abs(b.position.z - segment.position.z) < 0.01
			)
			if (body) {
				body.type = CANNON.Body.DYNAMIC
				body.updateMassProperties()
			}
		})

		this.updateRopeGeometry()
	}
}

export default Button

export function createButtons(props: ButtonProps): Button[] {
	return [
		new Button(props, 'Play', 0x98fb98, new THREE.Vector3(0, -4.7, 0)),
		new Button(props, 'About', 0x1e90ff, new THREE.Vector3(-5, -4.7, 0)),
		new Button(props, 'Code', 0xff6347, new THREE.Vector3(5, -4.7, 0)),
	]
}
