import * as THREE from 'three'
import { Component } from '@shared/component/Component'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export class TextComponent extends Component {
	textObject: CSS2DObject

	constructor(entityId: number, initialText: string = '') {
		super(entityId)
		this.textObject = this.createTextObject(initialText)
	}

	setText(newText: string) {
		this.textObject.element.textContent = newText
	}

	private createTextObject(initialText: string): CSS2DObject {
		const textElement = document.createElement('div')
		textElement.textContent = initialText
		textElement.style.color = '#FFFFFF'
		textElement.style.padding = '5px'
		textElement.style.fontFamily = "'Roboto', 'Arial', sans-serif"
		textElement.style.fontSize = '14px'
		textElement.style.fontWeight = '500'
		textElement.style.textShadow = '0 0 6px #000000, 0 0 3px #000000' // Text shadow for depth and readability
		textElement.style.lineHeight = '1.4'
		textElement.style.textAlign = 'center'
		textElement.style.whiteSpace = 'nowrap'
		textElement.style.border = '1px solid transparent' // Adjust as needed

		const cssObject = new CSS2DObject(textElement)
		cssObject.position.set(0, 3, 0)
		return cssObject
	}

	public setFollowedMesh(mesh: THREE.Mesh) {
		mesh.add(this.textObject)
	}

	public setOpacity(opacity: number) {
		this.textObject.element.style.opacity = opacity.toString()
	}
}
