import * as THREE from 'three'
import { Camera } from './camera.js'
import { LoadManager } from './LoadManager.js'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Entity } from '@shared/entity/Entity'
import { initializeDOMElements, updateOnResize } from './setupDOM.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
export interface Renderable {
	mesh: THREE.Mesh
	addToScene(): any
}

export class Renderer extends THREE.WebGLRenderer {
	public camera: Camera
	public scene: THREE.Scene
	public css2DRenderer: CSS2DRenderer
	constructor(scene: THREE.Scene, loadManager: LoadManager) {
		super({ antialias: true })

		this.scene = scene

		// Initialize renderer settings
		this.initRendererSettings()

		// Setup CSS 2D Renderer
		this.css2DRenderer = new CSS2DRenderer()
		this.css2DRenderer.setSize(window.innerWidth, window.innerHeight)

		// Initialize DOM elements
		initializeDOMElements(this, this.css2DRenderer)

		// Setup scene elements
		this.addLights()
		this.addSky()
		this.addWorld(loadManager)
		this.camera = new Camera(this)

		// Handle window resize
		window.addEventListener('resize', () => this.onWindowResize())
	}

	public appendChild() {
		document.body.appendChild(this.domElement)
		if (this.css2DRenderer) document.body.appendChild(this.css2DRenderer.domElement)
		else console.error("Can't append child CSS3DRenderer")
	}

	private initRendererSettings() {
		this.shadowMap.enabled = true
		this.shadowMap.type = THREE.PCFSoftShadowMap
		this.toneMapping = THREE.ACESFilmicToneMapping
		this.toneMappingExposure = 0.5
		this.setSize(window.innerWidth, window.innerHeight)
		this.setPixelRatio(window.devicePixelRatio)
	}

	private addGround() {
		// Create a simple colored ground
		const groundMaterial = new THREE.MeshPhongMaterial({
			color: 0xbdbdbd, // Adjust the color as needed (green in this case)
		})

		const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
		const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
		groundMesh.receiveShadow = true
		groundMesh.castShadow = true
		groundMesh.rotation.x = -Math.PI / 2

		this.scene.add(groundMesh)
	}

	private addSky() {
		const sky = new Sky()
		sky.scale.setScalar(450000)
		this.scene.add(sky)
		const uniforms = sky.material.uniforms
		uniforms['turbidity'].value = 10
		uniforms['rayleigh'].value = 0.3
		uniforms['mieCoefficient'].value = 0.005
		uniforms['mieDirectionalG'].value = 0.7
		const zenithAngleDegrees = 10
		const zenithAngleRadians = THREE.MathUtils.degToRad(90 - zenithAngleDegrees)
		const theta = THREE.MathUtils.degToRad(180)
		const sun = new THREE.Vector3().setFromSphericalCoords(1, zenithAngleRadians, theta)
		uniforms['sunPosition'].value.copy(sun)
	}

	private addLights() {
		const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.8)
		hemiLight.position.set(0, 350, 300)
		this.scene.add(hemiLight)

		const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
		directionalLight.position.set(0, 350, -300)
		directionalLight.color.setHSL(0.1, 1, 0.95)
		directionalLight.castShadow = true
		this.scene.add(directionalLight)

		directionalLight.shadow.mapSize.width = 1024
		directionalLight.shadow.mapSize.height = 2048
		directionalLight.shadow.camera.near = 0.5
		directionalLight.shadow.camera.far = 500
		directionalLight.shadow.camera.left = -50
		directionalLight.shadow.camera.right = 50
		directionalLight.shadow.camera.top = 50
		directionalLight.shadow.camera.bottom = -50
		directionalLight.target.position.set(0, 0, 0)
		this.scene.add(directionalLight.target)
	}

	private addWorld(loadManager: LoadManager) {
		loadManager.glTFLoad('https://myaudio.nyc3.cdn.digitaloceanspaces.com/ClearedSanAndreas.glb').then((gltf) => {
			this.scene.add(gltf.scene)
			gltf.scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.castShadow = true
					child.receiveShadow = true
				}
			})
		})
	}

	public update(delta: number) {
		this.camera.update(delta)
		this.css2DRenderer.render(this.scene, this.camera)
		this.render(this.scene, this.camera)
	}

	private onWindowResize() {
		if (!this.camera) return
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.setSize(window.innerWidth, window.innerHeight)
		this.css2DRenderer.setSize(window.innerWidth, window.innerHeight)
	}
}
