import { SingleSizeComponent } from '@shared/component/SingleSizeComponent'
import { MeshComponent } from '../component/MeshComponent'
import { SizeComponent } from '@shared/component/SizeComponent'
import { Entity } from '@shared/entity/Entity'
import { SerializedEntityType } from '@shared/network/server/serialized'
import { BoxGeometry, SphereGeometry } from 'three'

export class SyncSizeSystem {
	update(entities: Entity[]) {
		for (const entity of entities) {
			const meshComponent = entity.getComponent(MeshComponent)
			const sizeComponent = entity.getComponent(SizeComponent)
			if (!meshComponent) continue
			if (sizeComponent) {
				if (entity.type === SerializedEntityType.CUBE) {
					meshComponent.mesh.geometry.dispose() // Avoids memory leak.
					meshComponent.mesh.geometry = new BoxGeometry(
						sizeComponent.width * 2,
						sizeComponent.height * 2,
						sizeComponent.depth * 2
					)
				}
			}
			const singleSizeComponent = entity.getComponent(SingleSizeComponent)
			if (singleSizeComponent) {
				if (entity.type === SerializedEntityType.SPHERE) {
					meshComponent.mesh.geometry.dispose() // Avoids memory leak.
					meshComponent.mesh.geometry = new SphereGeometry(singleSizeComponent.size, 32, 16)
				}
			}
		}
	}
}
