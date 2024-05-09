import { ClientMessageType } from '@shared/network/client/base'
import { InputMessage } from '@shared/network/client/input'
import { WebSocketManager } from './WebsocketManager'
import { Renderer } from './renderer'

type KeyState = {
	down: boolean
	changed: boolean
}

type MouseState = {
	leftButton: boolean
	rightButton: boolean
	mouseXDelta: number
	mouseYDelta: number
	mouseWheelDelta: number
}

export class InputManager {
	private pointerLocked = false
	private keysDown: Record<string, KeyState> = {}
	private mouseState: MouseState = {
		leftButton: false,
		rightButton: false,
		mouseXDelta: 0,
		mouseYDelta: 0,
		mouseWheelDelta: 0,
	}
	public inputState: InputMessage

	constructor(
		private webSocketManager: WebSocketManager,
		private renderer: Renderer
	) {
		this.inputState = this.createDefaultInputState()
		this.setupEventListeners()
	}

	private createDefaultInputState(): InputMessage {
		return {
			t: ClientMessageType.INPUT,
			up: false,
			down: false,
			left: false,
			right: false,
			space: false,
			throw: false,
			shift: false,
			escape: false,
			numberKeys: Array(10).fill(false),
			leftButton: false,
			rightButton: false,
			mouseXDelta: 0,
			mouseYDelta: 0,
			mouseWheelDelta: 0,
			scrollUp: false,
			scrollDown: false,
			angleY: 0,
			lookingYAngle: 0,
			lookingXAngle: 0,
		}
	}

	private setupEventListeners() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this))
		window.addEventListener('keyup', this.handleKeyUp.bind(this))
		// window.addEventListener('mousedown', this.handleMouseDown.bind(this))
		// window.addEventListener('mouseup', this.handleMouseUp.bind(this))
		// window.addEventListener('mousemove', this.handleMouseMove.bind(this))
		window.addEventListener('wheel', this.handleMouseWheel.bind(this))

		this.renderer.domElement.addEventListener('click', async () => await this.requestPointerLock())
		document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this))
	}

	private handleKeyDown(event: KeyboardEvent) {
		const key = event.code
		this.keysDown[key] = { down: true, changed: !this.keysDown[key]?.down }
	}

	private handleKeyUp(event: KeyboardEvent) {
		const key = event.code
		this.keysDown[key] = {
			down: false,
			changed: this.keysDown[key]?.down !== false,
		}
	}

	// private handleMouseDown(event: MouseEvent) {
	// 	const button = event.button === 0 ? 'leftButton' : 'rightButton'
	// 	this.mouseState[button] = true
	// }

	// private handleMouseUp(event: MouseEvent) {
	// 	const button = event.button === 0 ? 'leftButton' : 'rightButton'
	// 	this.mouseState[button] = false
	// }

	// private handleMouseMove(event: MouseEvent) {
	// 	if (this.pointerLocked) {
	// 		this.mouseState.mouseXDelta = event.movementX
	// 		this.mouseState.mouseYDelta = event.movementY
	// 	}
	// }

	private handleMouseWheel(event: WheelEvent) {
		this.mouseState.mouseWheelDelta += event.deltaY
	}

	public async requestPointerLock() {
		try {
			await this.renderer.domElement.requestPointerLock()
			console.log('Pointer lock requested successfully.')
		} catch (error) {
			console.error('Failed to lock pointer:', error)
		}
	}

	private onPointerLockChange() {
		this.pointerLocked = document.pointerLockElement === this.renderer.domElement
		console.log(`Pointer lock status changed: ${this.pointerLocked}`)
		this.resetMouseState()
	}

	private resetMouseState() {
		this.mouseState = {
			leftButton: false,
			rightButton: false,
			mouseXDelta: 0,
			mouseYDelta: 0,
			mouseWheelDelta: 0,
		}
	}

	public updateInputState() {
		this.inputState = {
			...this.inputState,
			leftButton: this.mouseState.leftButton,
			rightButton: this.mouseState.rightButton,
			mouseXDelta: this.mouseState.mouseXDelta,
			mouseYDelta: this.mouseState.mouseYDelta,
			mouseWheelDelta: this.mouseState.mouseWheelDelta,
			up: this.keysDown['KeyW']?.down || false,
			down: this.keysDown['KeyS']?.down || false,
			left: this.keysDown['KeyA']?.down || false,
			right: this.keysDown['KeyD']?.down || false,
			space: this.keysDown['Space']?.down || false,
			throw: this.keysDown['KeyQ']?.down || false,
			shift: this.keysDown['ShiftLeft']?.down || false,
			escape: this.keysDown['Escape']?.down || false,
			numberKeys: Array(10)
				.fill(false)
				.map((_, i) => this.keysDown[`Digit${i}`]?.down || false),
			scrollUp: this.mouseState.mouseWheelDelta > 0,
			scrollDown: this.mouseState.mouseWheelDelta < 0,
			angleY: this.inputState.angleY,
			lookingYAngle: this.inputState.lookingYAngle,
			lookingXAngle: this.inputState.lookingXAngle,
		}

		this.sendInput()
	}

	public sendInput() {
		this.webSocketManager.send(this.inputState)
	}
}
