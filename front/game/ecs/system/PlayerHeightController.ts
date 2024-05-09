import { clamp, lerp, UpDownCirc } from '../../../lib/utils'

export class PlayerHeightController {
	height: number
	lastHeight: number
	movePerFrame: number
	lastGroundHeight: number
	startFallAnimation: number
	fallProgress: number
	jumpProgress: number
	isAnimating: boolean
	grounded: boolean
	startJumpAnimation: number
	isTabOpen: boolean
	animatingJump: boolean
	JUMP_AMPLITUDE = 2
	JUMP_DURATION = 0.5

	constructor() {
		this.isTabOpen = false
		this.height = 0
		this.lastHeight = this.height
		this.movePerFrame = 0
		this.lastGroundHeight = this.height
		this.fallProgress = 0
		this.startFallAnimation = 0
		this.animatingJump = false
		this.jumpProgress = 0
		this.startJumpAnimation = 0
		this.isAnimating = false
		this.grounded = false

		this.init()
	}

	init() {
		document.addEventListener('visibilitychange', () => {
			const isVisible = document.visibilityState === 'visible'
			if (isVisible) {
				// * Keeping track of when the tab is active to re-adjust animation state
				this.isTabOpen = isVisible
			}
		})
	}

	update(timestamp: number, timeDiff: number) {
		if (this.isAnimating) {
			if (this.isTabOpen) {
				// * If the user changes the tab and then comes back, fall progress won't be lost
				this.startFallAnimation = timestamp - this.fallProgress
				this.startJumpAnimation = 0
				this.isTabOpen = !this.isTabOpen
			} else {
				this.fallProgress = timestamp - this.startFallAnimation

				const t = this.fallProgress
				const GRAVITY = { x: 0, y: -9.81 * 10, z: 0 }
				// Gravity formula
				this.height = 0.5 * GRAVITY.y * t * t

				this.movePerFrame = this.height - this.lastHeight
			}
		} else {
			// reset the animation
			this.height = 0
			this.lastHeight = 0
			this.movePerFrame = 0
			this.startFallAnimation = timestamp
		}

		this.jumpProgress = timestamp - this.startJumpAnimation

		if (this.grounded && !this.animatingJump) {
			// reset parameters
			this.startJumpAnimation = timestamp
		} else {
			this.movePerFrame += lerp(0, this.JUMP_AMPLITUDE, UpDownCirc(clamp(this.jumpProgress / this.JUMP_DURATION, 0, 1)))
		}

		if (this.jumpProgress > this.JUMP_DURATION) {
			// end the animation
			this.animatingJump = false
		}

		this.lastHeight = this.height
		this.isAnimating = !this.grounded
	}

	setGrounded(grounded: boolean) {
		this.grounded = grounded
	}

	setJumpFactor(jumpFactor: number) {
		if (!this.animatingJump) {
			this.animatingJump = jumpFactor > 0
		}
	}
}
