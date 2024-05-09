import * as THREE from 'three'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

export const easeOutExpo = (x: number) => {
	return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

export const EaseOutCirc = (x: number) => {
	return Math.sqrt(1.0 - Math.pow(x - 1.0, 2.0))
}

export const UpDownCirc = (x: number) => {
	return Math.sin(EaseOutCirc(x) * Math.PI)
}

export const clamp = (x: number, a: number, b: number) => {
	return Math.min(Math.max(x, a), b)
}

export const easeInOutCubic = (x: number, y: number, a: number) => {
	return x + a * (y - x)
}

export function smoothDamp(
	current: number,
	target: number,
	currentVelocity: number,
	smoothTime: number,
	deltaTime: number,
	maxSpeed = Infinity
) {
	smoothTime = Math.max(0.0001, smoothTime)
	const omega = 2 / smoothTime
	const x = omega * deltaTime
	const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
	let change = current - target
	const originalTo = target

	// Clamp maximum speed
	const maxChange = maxSpeed * smoothTime
	change = Math.max(-maxChange, Math.min(maxChange, change))
	target = current - change

	const tempVelocity = (currentVelocity + omega * change) * deltaTime
	currentVelocity = (currentVelocity - omega * tempVelocity) * exp
	let output = target + (change + tempVelocity) * exp

	// Prevent overshooting
	if (originalTo - current > 0.0 === output > originalTo) {
		output = originalTo
		currentVelocity = (output - originalTo) / deltaTime
	}

	return [output, currentVelocity]
}

export const _calculateObjectSize = (object: THREE.Object3D) => {
	const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3())
	return size
}
