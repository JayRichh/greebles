import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { Scene } from 'three'

export interface Config {
	view_size: number
	camera_pos_x: number
	camera_pos_y: number
	camera_pos_z: number
	camera_quat_x: number
	camera_quat_y: number
	camera_quat_z: number
	camera_quat_w: number
	kiwi_pos_x: number
	kiwi_pos_y: number
	kiwi_pos_z: number
	kiwi_scale: number
	kiwi_rotation_x: number
	kiwi_rotation_y: number
	kiwi_rotation_z: number
	kiwi_rotation_w: number
	kiwi_mass: number
	mousePos: THREE.Vector2
	gravity_x: number
	gravity_y: number
	gravity_z: number
	margin: number
	force: number
	scene_background_color: number
	ambient_light_color: number
	fore_light_color: number
	fore_light_pos_x: number
	fore_light_pos_y: number
	fore_light_pos_z: number
	back_light_color: number
	back_light_pos_x: number
	back_light_pos_y: number
	back_light_pos_z: number
	contact_material_friction: number
}

export const initialConfig: Config = {
	view_size: 25,
	camera_pos_x: 0,
	camera_pos_y: 0,
	camera_pos_z: 20,
	camera_quat_x: -0.2,
	camera_quat_y: 0,
	camera_quat_z: 0,
	camera_quat_w: 1,
	kiwi_pos_x: 0,
	kiwi_pos_y: 5,
	kiwi_pos_z: 0,
	kiwi_scale: 1,
	kiwi_rotation_x: 0,
	kiwi_rotation_y: Math.PI,
	kiwi_rotation_z: 0,
	kiwi_rotation_w: 1,
	kiwi_mass: 5,
	mousePos: new THREE.Vector2(),
	gravity_x: 0,
	gravity_y: -9.81,
	gravity_z: 0,
	margin: 6,
	force: 10,
	scene_background_color: 0xffffff,
	ambient_light_color: 0xcccccc,
	fore_light_color: 0xffffff,
	fore_light_pos_x: 5,
	fore_light_pos_y: 5,
	fore_light_pos_z: 20,
	back_light_color: 0xffffff,
	back_light_pos_x: -15,
	back_light_pos_y: -5,
	back_light_pos_z: -10,
	contact_material_friction: 0.001,
}
