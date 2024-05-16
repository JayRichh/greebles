import { ClientMessageType } from '@shared/network/client/base'
import { InputMessage } from '@shared/network/client/input'
import { WebSocketManager } from './WebsocketManager'

export class InputManager {
	public inputState: InputMessage = {
		t: ClientMessageType.INPUT,
		up: false,
		down: false,
		left: false,
		right: false,
		space: false,
		cameraLeft: false,
		cameraRight: false,
		angleY: 0,
	}

	constructor(private webSocketManager: WebSocketManager) {
		// Add event listeners to handle user input
		window.addEventListener('keydown', this.handleKeyDown.bind(this))
		window.addEventListener('keyup', this.handleKeyUp.bind(this))
	}

	private handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
			case 'W':
			case 'w':
				this.inputState.up = true
				break
			case 'ArrowDown':
			case 'S':
			case 's':
				this.inputState.down = true
				break
			case 'ArrowLeft':
			case 'A':
			case 'a':
				this.inputState.left = true
				break
			case 'ArrowRight':
			case 'D':
			case 'd':
				this.inputState.right = true
				break
			case ' ':
				this.inputState.space = true
				break
			case 'Q':
			case 'q':
				this.inputState.cameraLeft = true
				break
			case 'E':
			case 'e':
				this.inputState.cameraRight = true
				break
		}
	}

	private handleKeyUp(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
			case 'W':
			case 'w':
				this.inputState.up = false
				break
			case 'ArrowDown':
			case 'S':
			case 's':
				this.inputState.down = false
				break
			case 'ArrowLeft':
			case 'A':
			case 'a':
				this.inputState.left = false
				break
			case 'ArrowRight':
			case 'D':
			case 'd':
				this.inputState.right = false
				break
			case ' ':
				this.inputState.space = false
				break
			case 'Q':
			case 'q':
				this.inputState.cameraLeft = false
				break
			case 'E':
			case 'e':
				this.inputState.cameraRight = false
				break
		}
	}

	private previousInputState: InputMessage | null = null

	public sendInput() {
		if (!this.previousInputState || !this.areInputStatesEqual(this.inputState, this.previousInputState)) {
			this.webSocketManager.send(this.inputState)
			this.previousInputState = { ...this.inputState }
		}
	}

	private areInputStatesEqual(state1: InputMessage, state2: InputMessage): boolean {
		return (
			state1.up === state2.up &&
			state1.down === state2.down &&
			state1.left === state2.left &&
			state1.right === state2.right &&
			state1.space === state2.space &&
			state1.cameraLeft === state2.cameraLeft &&
			state1.cameraRight === state2.cameraRight &&
			state1.angleY === state2.angleY
		)
	}
}
