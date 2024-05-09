import { clamp, lerp, easeOutExpo, EaseOutCirc, UpDownCirc } from '../../../lib/utils'

export class PlayerZoomController {
	zoom: number
	lastZoomLevel: number
	startZoomAnimation: number
	isAnimating: boolean
	startingZoom: number
	MIN_ZOOM_LEVEL = 0.01
	MAX_ZOOM_LEVEL = 100
	SCROLL_ANIMATION_SPEED = 2

	constructor() {
		this.zoom = this.MIN_ZOOM_LEVEL
		this.startingZoom = 0
		this.lastZoomLevel = 0
		this.startZoomAnimation = 0
		this.isAnimating = false
	}

	update(zoomLevel: number, timestamp: number, timeDiff: number) {
		const time = timestamp * this.SCROLL_ANIMATION_SPEED
		const zlClamped = clamp(zoomLevel, this.MIN_ZOOM_LEVEL, this.MAX_ZOOM_LEVEL)

		const zoomLevelHasChanged = this.lastZoomLevel !== zoomLevel
		if (zoomLevelHasChanged) {
			// restart the animation
			this.startingZoom = this.zoom
			this.startZoomAnimation = time
			this.isAnimating = true
		}

		// animating
		if (this.isAnimating) {
			const progress = time - this.startZoomAnimation
			this.zoom = lerp(this.startingZoom, zlClamped, easeOutExpo(progress))

			if (progress >= 1) {
				// end the animation
				this.isAnimating = false
			}
		}

		this.lastZoomLevel = zoomLevel
	}
}
