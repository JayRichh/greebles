import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import Button, { createButtons } from '../scene/ButtMoit'
import { TextureLoader } from 'three';

import {
  WebGLRenderer,
  Scene,
  Color,
  Clock,
  OrthographicCamera,
  Object3D,
  Vector2,
  AnimationMixer,
  Box3,
  Vector3,
  Mesh,
  BoxGeometry,
  MeshPhongMaterial,
  AmbientLight,
  DirectionalLight,
  Raycaster,
} from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'dat.gui'
import * as CANNON from 'cannon-es'
import { Config, initialConfig as InitialSceneConfig } from '../scene/config'

export class ThreeCanvas {
  private composer!: EffectComposer
  private renderPass!: RenderPass
  private config: Config
  private gui!: GUI
  private world!: CANNON.World
  private raycaster!: THREE.Raycaster
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private mainGroup!: THREE.Object3D
  private camera!: THREE.OrthographicCamera
  private mixers: THREE.AnimationMixer[] = []
  private controls!: OrbitControls
  private foreLight!: THREE.DirectionalLight
  private backLight!: THREE.DirectionalLight
  private ambientLight!: THREE.AmbientLight
  private mousePos: THREE.Vector2 = new THREE.Vector2()
  private groundMaterial!: CANNON.Material
  private letterMaterial!: CANNON.Material
  private contactMaterial!: CANNON.ContactMaterial
  private dprFactor: number = 1
  private pageItems!: NodeListOf<HTMLDivElement>
  private offset!: number
  private boundingBoxes: Map<THREE.Object3D, THREE.BoxHelper> = new Map()
  private fontLoader!: FontLoader
  private fontUrl: string =
    'https://rawcdn.githack.com/AlainBarrios/Fonts/358f48fc26f39af54da0243953780ea23786698f/Droid Sans_Regular.json'
  private clock!: THREE.Clock
  private clicker!: THREE.Mesh
  private clickCooldown: boolean = false
  public static dispose: () => void
  private stats: Stats
  private buttons: Button[] = [];
  private shelf: THREE.Object3D | null = null
  private router: any
  constructor(
    private canvas: HTMLCanvasElement,
    router: any
  ) {
    this.router = router
    this.dispose = this.dispose.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.updateClickerAnimation = this.updateClickerAnimation.bind(this)
    this.stats = new Stats()
    this.config = InitialSceneConfig
    ;(async () => {
      await this.init()
    })()
  }

  public dispose(): void {
    if (Array.isArray(this.buttons)) {
      this.buttons?.forEach(button => {
        button.dispose();
      });
    }
    this.renderer.dispose()
    this.gui.destroy()
    this.world.bodies.forEach((body) => this.world.removeBody(body))
    this.world.bodies = []
    this.scene.remove(this.mainGroup)
    this.mainGroup.children.forEach((line) => {
      line.children.forEach((letter) => {
        const letterMesh = letter as Mesh
        if (letterMesh.userData.body) {
          this.world.removeBody(letterMesh.userData.body)
        }
      })
    })
    this.mainGroup.children = []
    this.renderer.domElement.remove()
  }

  private async init(): Promise<void> {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.domElement.style.position = 'absolute'
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.5
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    document.body.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()

    // Load backdrop texture and set as scene background
    const textureLoader = new TextureLoader()
    textureLoader.load('backdrop.avif', (texture) => {
      // texture.encoding = THREE.sRGBEncoding; // Normalize texture
      let background = new THREE.Mesh(
        new THREE.PlaneGeometry(window.innerWidth, window.innerHeight),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false })
      )
      background.position.z = -500; // Move background back in the scene
      this.scene.add(background);
    })


    this.mainGroup = new THREE.Object3D()
    this.scene.add(this.mainGroup)

    this.setupCamera()
    this.setupLights()
    this.setupPhysics()
    this.setupEventListeners()
    this.orbitControls()

    await this.setupGui()
    this.stats = new Stats()
    this.createStats()

    this.clock = new THREE.Clock()
    this.raycaster = new THREE.Raycaster()
    this.mousePos = new THREE.Vector2(0, 0)
    this.fontLoader = new FontLoader()
    this.dprFactor = window.devicePixelRatio
    this.pageItems = document.querySelectorAll('.page div')
    this.offset = this.pageItems.length * (this.config.margin * this.dprFactor) * 0.5

    this.clicker = this.createClicker() // make this its own thing
    this.mainGroup.add(this.clicker)

    await this.create3DText()
    const font = await this.fontLoader.loadAsync(this.fontUrl);
    const props = {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      world: this.world,
      shelf: this.shelf!,
      font: font,
      router: this.router,
    };

    // Create multiple buttons
    this.buttons = createButtons(props);

    this.renderLoop()
  }

  private orbitControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.enabled = false
    this.controls.enablePan = false
    this.controls.enableRotate = false
    this.controls.enableZoom = false

		// Add parallax effect
		document.addEventListener('mousemove', (event) => {
			const parallaxX = (event.clientX / window.innerWidth) * 2 - 1
			const parallaxY = (event.clientY / window.innerHeight) * 2 - 1

			this.camera.position.x += (parallaxX - this.camera.position.x) * 0.05
			this.camera.position.y += (parallaxY - this.camera.position.y) * 0.05
			this.camera.lookAt(this.scene.position)
		})


  }

  private createStats(): void {
    this.stats.showPanel(0)
    this.stats.dom.style.position = 'absolute'
    this.stats.dom.style.top = '0'
    document.body.appendChild(this.stats.dom)
  }

  private setupCamera(): void {
    const aspect = window.innerWidth / window.innerHeight
    const frustumSize = this.config.view_size
    const frustumHalfHeight = frustumSize / 2
    const frustumHalfWidth = frustumHalfHeight * aspect

    this.camera = new THREE.OrthographicCamera(
      -frustumHalfWidth,
      frustumHalfWidth,
      frustumHalfHeight,
      -frustumHalfHeight,
      -100,
      1000
    )

    this.camera.position.set(this.config.camera_pos_x, this.config.camera_pos_y+5, this.config.camera_pos_z)

    this.camera.lookAt(new THREE.Vector3(0, this.config.camera_pos_y+5, 0))


    this.updateProjectionMatrix()
    window.addEventListener('resize', this.updateProjectionMatrix.bind(this))
  }

  private updateProjectionMatrix(): void {
    const aspect = window.innerWidth / window.innerHeight
    const frustumSize = this.config.view_size * (aspect < 1 ? 1.5 : 1) // Adjust frustum size for non-16/9 screens
    const frustumHalfHeight = frustumSize / 2
    const frustumHalfWidth = frustumHalfHeight * aspect

    // Adjust camera frustum based on new window dimensions
    this.camera.left = -frustumHalfWidth
    this.camera.right = frustumHalfWidth
    this.camera.top = frustumHalfHeight
    this.camera.bottom = -frustumHalfHeight

    this.camera.updateProjectionMatrix() // Update the camera projection matrix
    this.renderer.setSize(window.innerWidth, window.innerHeight) // Also resize renderer accordingly
  }



  private setupLights(): void {
    const light = new THREE.SpotLight(0xffffff, Math.PI * 1000)
    light.position.set(0, 0, 100)
    light.castShadow = true
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    this.scene.add(light)

    this.ambientLight = new THREE.AmbientLight(0xf0f0f0)
    this.scene.add(this.ambientLight)

    this.foreLight = new THREE.DirectionalLight(0xffffff, 2.5)
    this.foreLight.color.setHSL(0.1, 1, 0.95)
    this.backLight = new THREE.DirectionalLight(0xffffff, 0.8)
    this.backLight.color.setHSL(0.6, 1, 0.95)

    const lightPositions: [number, number, number][] = [
      [this.config.fore_light_pos_x, this.config.fore_light_pos_y, this.config.fore_light_pos_z],
      [this.config.back_light_pos_x, this.config.back_light_pos_y, this.config.back_light_pos_z],
    ]

    ;[this.foreLight, this.backLight].forEach((light, i) => {
      light.position.set(...lightPositions[i])
      light.castShadow = true
      light.shadow.mapSize.width = 2048
      light.shadow.mapSize.height = 2048
      this.scene.add(light)
    })
  }

  private setupPhysics(): void {
    this.world = new CANNON.World()
    this.world.gravity.set(this.config.gravity_x, this.config.gravity_y, this.config.gravity_z)

    this.groundMaterial = new CANNON.Material()
    this.letterMaterial = new CANNON.Material()

    this.contactMaterial = new CANNON.ContactMaterial(this.groundMaterial, this.letterMaterial, {
      friction: this.config.contact_material_friction,
    })
    this.world.addContactMaterial(this.contactMaterial)
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onResize.bind(this), false)
    window.addEventListener('click', this.onClick.bind(this), false)
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
  }

  private createClicker(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1, 1, 1) // Define the size of the clicker cube
    const material = new THREE.MeshPhongMaterial({ color: 0x404040 })
    const clicker = new THREE.Mesh(geometry, material)

    clicker.position.x = 18 // Initial x position
    clicker.position.y = 5 // Position it above the shelf by 5 units
    clicker.position.z = 0 // Align with the front of the letters

    return clicker
  }

  private async create3DText(): Promise<void> {
    const font = await this.fontLoader.loadAsync(this.fontUrl)

    const shelfMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.8,
      roughness: 0.2,
      metalness: 0.1,
      reflectivity: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
    })

    const letterMaterial = new THREE.MeshStandardMaterial({
      color: 0x625757,
      roughness: 0.5,
      emissive: new THREE.Color(0x625757).multiplyScalar(0.1),
      depthTest: true,
      depthWrite: true,
      metalness: 0.2,
    })

    const lines = Array.from(this.pageItems)
      .map((item) => item.textContent || '')
      .reverse()
    let totalHeight = 0 // Initialize totalHeight to accumulate the shelf height

    lines.forEach((line, index) => {
      const lineGroup = new THREE.Object3D()
      this.mainGroup.add(lineGroup)

      const words = line.split(' ')
      let totalLength = 0
      const letterMeshes: THREE.Mesh[] = []
      const letterBodies: CANNON.Body[] = []
      const spaceWidth = 0.5 // Define the width of the space between words

      words.forEach((word, wordIndex) => {
        const letters = Array.from(word)
        letters.forEach((letter, letterIndex) => {
          const letterGeom = new TextGeometry(letter, {
            font: font,
            size: 2 * this.dprFactor,
            height: 0.2 * this.dprFactor,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.6 * this.dprFactor,
            bevelSize: 0.2 * this.dprFactor,
            bevelOffset: 0,
            bevelSegments: 5,
          })
          letterGeom.computeBoundingBox()
          const letterMesh = new THREE.Mesh(letterGeom, letterMaterial)
          const letterSize = letterGeom.boundingBox
            ? letterGeom.boundingBox.getSize(new THREE.Vector3())
            : new THREE.Vector3()

          letterMesh.geometry.translate(-letterSize.x / 2, -letterSize.y / 2, 0)
          letterMesh.position.x = totalLength + letterSize.x / 2
          letterMesh.position.y = totalHeight + letterSize.y / 2 // Use totalHeight to position letters
          letterMeshes.push(letterMesh)
          totalLength += letterSize.x // Accumulate total length for positioning

          const letterBody: CANNON.Body = new CANNON.Body({
            mass: 0.5,
            shape: new CANNON.Box(new CANNON.Vec3(letterSize.x / 2, letterSize.y / 2, letterSize.z / 2)),
            position: new CANNON.Vec3(letterMesh.position.x, letterMesh.position.y, letterMesh.position.z),
          })
          letterBodies.push(letterBody)
        })

        // Add space after each word except the last one
        if (wordIndex < words.length - 1) {
          totalLength += spaceWidth * this.dprFactor
        }
      })

      const shelfLength = totalLength + 2 // Add extra length to the shelf
      const shelfGeometry = new THREE.BoxGeometry(shelfLength, 0.5, 8)
      const shelfMesh = new THREE.Mesh(shelfGeometry, shelfMaterial)
      shelfMesh.position.set(0, totalHeight, 0) // Use totalHeight to position shelves
      shelfMesh.receiveShadow = true
      lineGroup.add(shelfMesh)

      const shelfBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Box(new CANNON.Vec3(shelfLength / 2, 0.25, 4)),
        position: new CANNON.Vec3(shelfMesh.position.x, shelfMesh.position.y, shelfMesh.position.z),
      })
      this.world.addBody(shelfBody)
      this.shelf = shelfMesh
      this.shelf.userData.shelfBody = shelfBody

      // Position each letter and its corresponding physics body
      let currentXOffset = -totalLength / 2
      letterMeshes.forEach((letterMesh, i) => {
        letterMesh.position.x += currentXOffset
        lineGroup.add(letterMesh)

        const letterBody = letterBodies[i]
        letterBody.position.x = letterMesh.position.x
        letterBody.position.y = letterMesh.position.y // Ensure the y position is set correctly for physics
        this.world.addBody(letterBody)
        letterMesh.userData.body = letterBody
      })

      totalHeight += shelfMesh.geometry.parameters.height + 4 * this.dprFactor // Increment totalHeight by the shelf height plus some extra spacing
    })
  }
  private renderLoop(): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const deltaTime = this.clock.getDelta();

      this.world.step(1 / 60, deltaTime, 3);
      this.mixers.forEach((mixer) => mixer.update(deltaTime));

      this.controls.update();

      // Update buttons and their ropes
      this.buttons?.forEach((button) => {
        button.update();
      });

      // Then update the Three.js graphics according to the physics
      this.mainGroup.children.forEach((line: THREE.Object3D) => {
        line.children.forEach((letter: THREE.Object3D) => {
          const letterMesh = letter as THREE.Mesh;
          if (letterMesh.userData.body) {
            letterMesh.position.copy(letterMesh.userData.body.position as unknown as THREE.Vector3);
            letterMesh.quaternion.copy(letterMesh.userData.body.quaternion as unknown as THREE.Quaternion);
          }
        });
      });

      this.mainGroup.traverse((object: any) => {
        if (object.userData.physicsBody) {
          object.position.copy(object.userData.physicsBody.position as unknown as THREE.Vector3);
          object.quaternion.copy(object.userData.physicsBody.quaternion as unknown as THREE.Quaternion);
        }
      });

      this.boundingBoxes.forEach((bbox, object) => {
        if (object.userData.physicsBody) {
          object.position.copy(object.userData.physicsBody.position as unknown as THREE.Vector3);
          object.quaternion.copy(object.userData.physicsBody.quaternion as unknown as THREE.Quaternion);
          bbox.update();
        }
      });

      let clickerOpacity = 0;
      if (this.clicker.material) {
        const clickerMaterial = this.clicker.material as THREE.MeshPhongMaterial;
        clickerOpacity += ((Math.sin(deltaTime * 2) + 1) / 2) * 0.01;
        clickerOpacity = Math.min(clickerOpacity, 1);
        clickerMaterial.opacity = clickerOpacity;
        clickerMaterial.transparent = true;
        clickerMaterial.needsUpdate = true;
      }

      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    };
    animate()
  }

  private updateClickerAnimation(): void {}

  private setupPhysicsBodyForObject(object: THREE.Object3D, mass: number): CANNON.Body {
    const size = new THREE.Vector3()
    new THREE.Box3().setFromObject(object).getSize(size)

    const body = new CANNON.Body({
      mass: mass,
      shape: new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2)),
      position: object.position.clone() as unknown as CANNON.Vec3,
      quaternion: object.quaternion.clone() as unknown as CANNON.Quaternion,
    })

    this.world.addBody(body)

    return body
  }

  private onResize(): void {
    const width = window.innerWidth
    const height = window.innerHeight
    const aspect = width / height
    const viewSizeHalf = this.config.view_size / 2

    let left, right, top, bottom

    if (width > height) {
      left = -viewSizeHalf * aspect
      right = viewSizeHalf * aspect
      top = viewSizeHalf
      bottom = -viewSizeHalf
    } else {
      left = -viewSizeHalf
      right = viewSizeHalf
      top = viewSizeHalf / aspect
      bottom = -viewSizeHalf / aspect
    }

    this.camera.left = left
    this.camera.right = right
    this.camera.top = top
    this.camera.bottom = bottom

    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this))
  }
  private onClick(): void {
    if (this.clickCooldown) return

    const intersects = this.runRayCaster()

    if (intersects.length > 0) {
      const intersected = intersects[0]
      const { object, face } = intersected

      console.log(`Clicked object:`, object)
      console.log(`Face normal:`, face?.normal)

      if (object instanceof THREE.Mesh && object.userData.body instanceof CANNON.Body) {
        const impulseStrength = -this.config.force
        const impulse = new CANNON.Vec3(
          (face?.normal?.x || Math.random()) * impulseStrength,
          (face?.normal?.y || Math.random()) * impulseStrength,
          (face?.normal?.z || Math.random()) * impulseStrength
        )

        console.log(`Applying impulse:`, impulse)

        object.userData.body.applyLocalImpulse(impulse, new CANNON.Vec3())

        this.clickCooldown = true
        setTimeout(() => {
          this.clickCooldown = false
        }, 200)
      }
    }
  }

  private onMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left //x position within the element.
    const y = event.clientY - rect.top //y position within the element.

    this.mousePos.x = (x / rect.width) * 2 - 1
    this.mousePos.y = -(y / rect.height) * 2 + 1

    if (this.raycaster) {
      const intersects = this.runRayCaster()
      this.canvas.style.cursor = intersects.length > 0 ? 'pointer' : 'auto'
      // ensure parent gets this cursor style as well
      if (this.canvas.parentElement) {
        if (this.renderer && this.renderer.domElement.parentElement) {
          this.renderer.domElement.parentElement.style.cursor = this.canvas.style.cursor
        } else {
          console.warn('Renderer parent element not found')
        }
      } else {
      }
    }
  }

  private runRayCaster(): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mousePos, this.camera)
    const intersects = this.raycaster.intersectObjects(this.scene.children, true)
    return intersects
  }

  private async setupGui(): Promise<void> {
    const dat = await import('dat.gui')
    const GUI = dat.GUI
    this.gui = new GUI({ closed: true, width: 300 })

    this.gui.domElement.style.position = 'absolute'
    this.gui.domElement.style.top = '60px'
    this.gui.domElement.style.right = '0'
    this.gui.domElement.style.zIndex = '1'
    // this.canvas.parentNode?.appendChild(this.gui.domElement)

    // make gui 3 columns
    this.gui.__controllers.forEach((controller: any) => {
      controller.domElement.parentElement.style.width = '100%'
    })

    // rerun setup with configs to update any changes onChange
    this.gui.add(this.config, 'view_size', 10, 100, 1).onChange(() => this.setupCamera())
    this.gui.add(this.config, 'camera_pos_x', -10, 10, 0.1).onChange(() => this.setupCamera())
    this.gui.add(this.config, 'camera_pos_y', -10, 10, 0.1).onChange(() => this.setupCamera())
    this.gui.add(this.config, 'camera_pos_z', -10, 10, 0.1).onChange(() => this.setupCamera())
    this.gui.add(this.config, 'gravity_x', -10, 10, 0.01).onChange((value) => (this.world.gravity.x = value))
    this.gui.add(this.config, 'gravity_y', -10, 10, 0.01).onChange((value) => (this.world.gravity.y = value))
    this.gui.add(this.config, 'gravity_z', -10, 10, 0.01).onChange((value) => (this.world.gravity.z = value))
    this.gui.addColor(this.config, 'fore_light_color').onChange((value) => this.foreLight.color.set(value))
    this.gui.add(this.config, 'fore_light_pos_x', 0, 20, 1).onChange((value) => (this.foreLight.position.x = value))
    this.gui.add(this.config, 'fore_light_pos_y', 0, 20, 1).onChange((value) => (this.foreLight.position.y = value))
    this.gui.add(this.config, 'fore_light_pos_z', 0, 20, 1).onChange((value) => (this.foreLight.position.z = value))
    this.gui.addColor(this.config, 'back_light_color').onChange((value) => this.backLight.color.set(value))
    this.gui.add(this.config, 'back_light_pos_x', -20, 0, 1).onChange((value) => (this.backLight.position.x = value))
    this.gui.add(this.config, 'back_light_pos_y', -20, 0, 1).onChange((value) => (this.backLight.position.y = value))
    this.gui.add(this.config, 'back_light_pos_z', -20, 0, 1).onChange((value) => (this.backLight.position.z = value))
    this.gui.addColor(this.config, 'ambient_light_color').onChange((value) => this.ambientLight.color.set(value))
    this.gui
      .addColor(this.config, 'scene_background_color')
      .onChange((value) => (this.scene.background = new THREE.Color(value)))
    this.gui.add(this.config, 'force', 0, 20, 1).onChange((value) => (this.config.force = value))
    this.gui.add(this.config, 'contact_material_friction', 0.001, 1, 0.001).onChange((value) => {
      if (this.world.contactmaterials.length > 0) {
        this.world.contactmaterials[0].friction = value
      }
    })

    const kiwiFolder = this.gui.addFolder('Kiwi Settings')

    // Scale
    kiwiFolder
      .add(this.config, 'kiwi_scale', 0.01, 1)
      .name('Scale')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi) {
          kiwi.scale.set(value, value, value)
        }
      })

    // Position X
    kiwiFolder
      .add(this.config, 'kiwi_pos_x', -10, 10)
      .name('Position X')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi && kiwi.userData.physicsBody) {
          kiwi.position.x = value
          kiwi.userData.physicsBody.position.x = value
        }
      })

    // Position Y
    kiwiFolder
      .add(this.config, 'kiwi_pos_y', 0, 10)
      .name('Position Y')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi && kiwi.userData.physicsBody) {
          kiwi.position.y = value
          kiwi.userData.physicsBody.position.y = value
        }
      })

    // Position Z
    kiwiFolder
      .add(this.config, 'kiwi_pos_z', -10, 10)
      .name('Position Z')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi && kiwi.userData.physicsBody) {
          kiwi.position.z = value
          kiwi.userData.physicsBody.position.z = value
        }
      })

    // Rotation Y (Yaw)
    kiwiFolder
      .add(this.config, 'kiwi_rotation_y', 0, Math.PI * 2)
      .name('Rotation Y')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi) {
          kiwi.rotation.y = value
        }
      })

    // Mass
    kiwiFolder
      .add(this.config, 'kiwi_mass', 0, 10)
      .name('Mass')
      .onChange((value) => {
        const kiwi = this.mainGroup.getObjectByName('Kiwi')
        if (kiwi && kiwi.userData.physicsBody) {
          kiwi.userData.physicsBody.mass = value
          // Update the mass for the physics engine
          kiwi.userData.physicsBody.updateMassProperties()
        }
      })

    kiwiFolder.open()
  }
}

export default ThreeCanvas