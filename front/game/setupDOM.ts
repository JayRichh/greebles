import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { WebGLRenderer, Vector2 } from 'three'
import { Camera } from './camera'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import * as THREE from 'three'
/**
 * Initialize and append renderer elements to the DOM.
 * @param {WebGLRenderer} webGLRenderer The Three.js WebGL renderer instance.
 * @param {CSS2DRenderer} css2DRenderer The Three.js CSS2D renderer instance.
 */
export function initializeDOMElements(webGLRenderer: WebGLRenderer, css2DRenderer: CSS2DRenderer): void {
	const container: HTMLElement = document.body

	// Configure the WebGLRenderer's DOM element
	webGLRenderer.domElement.style.pointerEvents = 'auto'
	webGLRenderer.domElement.style.touchAction = 'auto'
	webGLRenderer.domElement.style.position = 'absolute'
	webGLRenderer.domElement.style.top = '0'
	webGLRenderer.domElement.style.left = '0'
	webGLRenderer.domElement.style.zIndex = '24' // Ensure the renderer is on top of other elements

	// Configure the CSS2DRenderer's DOM element
	css2DRenderer.domElement.style.position = 'absolute'
	css2DRenderer.domElement.style.top = '0'

	// Append children to the document body
	container.appendChild(webGLRenderer.domElement)
	container.appendChild(css2DRenderer.domElement)
}

/**
 * Updates the size of renderers on window resize.
 * @param {WebGLRenderer} webGLRenderer The Three.js WebGL renderer instance.
 * @param {CSS2DRenderer} css2DRenderer The Three.js CSS2D renderer instance.
 * @param {EffectComposer} composer The post-processing composer.
 * @param {Camera} camera The camera used in the scene.
 */
export function updateOnResize(
	webGLRenderer: WebGLRenderer,
	css2DRenderer: CSS2DRenderer,
	composer: EffectComposer,
	camera: Camera
): void {
	const onResize = (): void => {
		const width: number = window.innerWidth
		const height: number = window.innerHeight
		const pixelRatio: number = window.devicePixelRatio

		camera.aspect = width / height
		camera.updateProjectionMatrix()

		webGLRenderer.setSize(width, height)
		webGLRenderer.setPixelRatio(pixelRatio)
		webGLRenderer.toneMapping = THREE.ACESFilmicToneMapping
		css2DRenderer.setSize(width, height)
		composer.setSize(width, height)

		// Update shader resolution
		const newResolution: Vector2 = new Vector2(1 / (width * pixelRatio), 1 / (height * pixelRatio))
		;(composer.passes[1] as any).material.uniforms['resolution'].value.copy(newResolution)
	}

	window.addEventListener('resize', onResize, false)
	onResize() // Initialize with current size
}
