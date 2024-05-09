import * as THREE from 'three'
import { MeshComponent } from '../component/MeshComponent'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Entity } from '@shared/entity/Entity'
import { SerializedEntityType } from '@shared/network/server/serialized'
import { Game } from '@/game/game'
import { FollowComponent } from '../component/FollowComponent'
import { AnimationComponent } from '../component/AnimationComponent'
import { TextComponent } from '../component/TextComponent'

/**
 * Represents a player entity in the game.
 */
export class Player {
	entity: Entity

	/**
	 * Creates a new player entity.
	 * @param entityId The unique identifier of the player entity.
	 * @param game The game instance.
	 */
	constructor(entityId: number, game: Game) {
		this.entity = game.entityManager.createEntity(SerializedEntityType.PLAYER, entityId)

		const meshComponent = new MeshComponent(entityId)
		this.entity.addComponent(meshComponent)
		const mesh: THREE.Mesh = meshComponent.mesh
		const geometry = new THREE.CapsuleGeometry(1, 2, 1)
		const material = new THREE.MeshPhongMaterial()
		material.color = new THREE.Color(0xff5522)
		mesh.material = material
		mesh.receiveShadow = true
		mesh.castShadow = true

		const isCurrentPlayer = this.entity.id === game.currentPlayerEntityId
		if (isCurrentPlayer) {
			this.entity.addComponent(new FollowComponent(entityId, game.renderer.camera))
			const pointLight = new THREE.PointLight(0xff3aff, 15, 50)
			mesh.add(pointLight)
		} else {
			const textComponent = new TextComponent(entityId, 'Moit ' + entityId)
			this.entity.addComponent(textComponent)
			textComponent.setFollowedMesh(mesh)
		}

		const loader = game.loadManager

		loader.glTFLoad('https://myaudio.nyc3.cdn.digitaloceanspaces.com/Character.glb').then((gltf: GLTF) => {
			if (gltf.scenes && gltf.scenes.length > 0) {
				mesh.add(gltf.scenes[0])
				if (gltf.animations) {
					this.entity.addComponent(new AnimationComponent(this.entity.id, mesh, gltf.animations))
				}
			}
		})

		this.activateShadows()
	}

	/**
	 * Activates shadows for the player's mesh and its child meshes.
	 */
	private activateShadows() {
		const meshComponent = this.entity.getComponent(MeshComponent)

		if (meshComponent) {
			const object3D = meshComponent.mesh

			// Enable shadows for all child meshes
			object3D.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.castShadow = true // Make the child mesh cast shadows
					child.receiveShadow = true // Make the child mesh receive shadows
				}
			})
		}
	}
}
