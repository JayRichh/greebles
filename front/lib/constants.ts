import * as THREE from 'three'

const HALF_PI = Math.PI / 2
const FORWARD = new THREE.Vector3(0, 0, -1)
const LEFT = new THREE.Vector3(-1, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)
const RIGHT = new THREE.Vector3(1, 0, 0)
const DOWN = new THREE.Vector3(0, -1, 0)

const quaternion_0 = new THREE.Quaternion()
const quaternion_1 = new THREE.Quaternion()
const vec3_0 = new THREE.Vector3()
const vec3_1 = new THREE.Vector3()

const MIN_ZOOM_LEVEL = 0.001 // needs to be slightly bigger than zero
const MAX_ZOOM_LEVEL = 50
const UP_DOWN_HEAD_ROTATION_LIMIT = Math.PI / 2
const SCROLL_LEVEL_STEP = 1.5
const SCROLL_ANIMATION_SPEED = 2
const JUMP_DURATION = 0.4
const JUMP_AMPLITUDE = 2
const GROUND_DETECTION_DISTANCE = 0.02

const ONE = () => {
	return 1
}
const FIVE = () => {
	return 5
}
const NEGATIVE_ONE = () => {
	return -1
}
const ZERO = () => {
	return 0
}

export {
	HALF_PI,
	FORWARD,
	LEFT,
	UP,
	RIGHT,
	DOWN,
	quaternion_0,
	quaternion_1,
	vec3_0,
	vec3_1,
	MIN_ZOOM_LEVEL,
	MAX_ZOOM_LEVEL,
	UP_DOWN_HEAD_ROTATION_LIMIT,
	SCROLL_LEVEL_STEP,
	SCROLL_ANIMATION_SPEED,
	JUMP_DURATION,
	JUMP_AMPLITUDE,
	GROUND_DETECTION_DISTANCE,
	ONE,
	FIVE,
	NEGATIVE_ONE,
	ZERO,
}
