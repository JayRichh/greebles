import { Entity } from "../../../../../shared/entity/Entity.js";
import { EventDestroyedComponent } from "../../../../../shared/component/events/EventDestroyedComponent.js";
import { EntityManager } from "../../../../../shared/entity/EntityManager.js";
import { PhysicsBodyComponent } from "../../component/PhysicsBodyComponent.js";
import { World } from "@dimforge/rapier3d-compat";

export class DestroySystem {
  update(entities: Entity[], entityManager: EntityManager, world: World) {
    for (const entity of entities) {
      const destroyComponent = entity.getComponent(EventDestroyedComponent);
      if (destroyComponent) {
        const rigidbodyComponent = entity.getComponent(PhysicsBodyComponent);

        if (rigidbodyComponent) world.removeRigidBody(rigidbodyComponent.body);

        entityManager.removeEntity(entity);
      }
    }
  }
}
