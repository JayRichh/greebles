import { InputComponent } from "../component/InputComponent.js";
import { PhysicsBodyComponent } from "../component/PhysicsBodyComponent.js";
import { Entity } from "../../../../shared/entity/Entity.js";
import Rapier from "../../physics/rapier.js";
import { PositionComponent } from "../../../../shared/component/PositionComponent.js";
import { PhysicsColliderComponent } from "../component/PhysicsColliderComponent.js";
import { SingleSizeComponent } from "../../../../shared/component/SingleSizeComponent.js";
import { GroundCheckComponent } from "../component/GroundedComponent.js";

export class MovementSystem {
  update(dt: number, entities: Entity[], world: Rapier.World): void {
    for (const entity of entities) {
      this.updateEntityMovement(dt, entity, world);
    }
  }

  updateEntityMovement(dt: number, entity: Entity, world: Rapier.World) {
    const inputComponent = entity.getComponent(InputComponent);
    const rigidBodyComponent = entity.getComponent(PhysicsBodyComponent);
    const positionComponent = entity.getComponent(PositionComponent);
    const groundedCheckComponent = entity.getComponent(GroundCheckComponent);

    if (
      !inputComponent ||
      !rigidBodyComponent ||
      !positionComponent ||
      !groundedCheckComponent
    ) {
      return; // Skip processing this entity if any required component is missing
    }

    const impulse = this.calculateImpulse(
      dt,
      inputComponent,
      rigidBodyComponent
    );
    // If the space key is pressed and the entity is grounded, apply an impulse
    if (
      inputComponent.space &&
      groundedCheckComponent &&
      groundedCheckComponent.grounded
    ) {
      // const sizeComponent = entity.getComponent(SingleSizeComponent);
      // if (sizeComponent) {
      //   sizeComponent.size += 0.1;
      //   sizeComponent.updated = true;
      // }
      impulse.y = 1.5 * dt;
    }
    this.applyImpulse(dt, rigidBodyComponent, impulse);
  }

  calculateImpulse(
    dt: number,
    inputComponent: InputComponent,
    rigidBodyComponent: PhysicsBodyComponent
  ) {
    const currentLinVel = rigidBodyComponent.body.linvel();
    const speed = 0.8;
    const lookingYAngle = inputComponent.lookingYAngle;

    const impulse = new Rapier.Vector3(0, currentLinVel.y - 0.1 * dt, 0);

    if (inputComponent.up) {
      impulse.z += -speed * Math.sin(lookingYAngle);
      impulse.x += -speed * Math.cos(lookingYAngle);
    }
    if (inputComponent.down) {
      impulse.z += speed * Math.sin(lookingYAngle);
      impulse.x += speed * Math.cos(lookingYAngle);
    }
    if (inputComponent.right) {
      impulse.z += speed * Math.sin(lookingYAngle - Math.PI / 2);
      impulse.x += speed * Math.cos(lookingYAngle - Math.PI / 2);
    }
    if (inputComponent.left) {
      impulse.z += speed * Math.sin(lookingYAngle + Math.PI / 2);
      impulse.x += speed * Math.cos(lookingYAngle + Math.PI / 2);
    }

    impulse.x *= dt;
    impulse.z *= dt;

    return impulse;
  }

  applyImpulse(
    dt: number,
    rigidBodyComponent: PhysicsBodyComponent,
    impulse: Rapier.Vector3
  ) {
    rigidBodyComponent.body.setLinvel(impulse, true);
  }
}
