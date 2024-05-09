// File: Sphere.ts
import { SerializedEntityType } from '@shared/network/server/serialized'
import { Entity } from '@shared/entity/Entity'
import { MeshComponent } from '../component/MeshComponent.js'
import * as THREE from 'three'
import { Game } from '@/game/game.js'

export class Sphere {
	entity: Entity

	constructor(entityId: number, game: Game) {
		this.entity = game.entityManager.createEntity(SerializedEntityType.SPHERE, entityId)

		const meshComponent = new MeshComponent(entityId)
		this.entity.addComponent(meshComponent)
		const mesh = meshComponent.mesh

		// geometry using predefined polyhedron
		const verticesOfCube = [-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1]
		const indicesOfFaces = [
			2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2, 3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4,
		]
		const geometry = new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 10, 2)

		// Create a black and white material with noise and dirt
		const materials = [
			new THREE.MeshPhongMaterial({
				color: 0xffffff,
				bumpMap: new THREE.TextureLoader().load('node_modules/three/examples/textures/planets/moon_1024.jpg'),
				bumpScale: 0.1,
				shininess: 10,
			}), // White with noise and less shine
			new THREE.MeshPhongMaterial({
				color: 0x333333,
				bumpMap: new THREE.TextureLoader().load('node_modules/three/examples/textures/planets/moon_1024.jpg'),
				bumpScale: 0.2,
				shininess: 5,
			}), // Dark gray with more noise and less shine
		]

		// Create mesh with alternating materials
		const meshMaterials = []
		for (let i = 0; i < geometry.groups.length; i++) {
			const group = geometry.groups[i]
			const material = materials[i % materials.length]
			meshMaterials.push(material)
		}

		mesh.geometry = geometry
		mesh.material = meshMaterials
		mesh.receiveShadow = true
		mesh.castShadow = true
	}
}
