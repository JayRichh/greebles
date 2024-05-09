/**
 * Represents a rotation component for an entity in the game world.
 * The RotationComponent stores the rotation of an entity as a quaternion.
 * It provides methods to deserialize and serialize the rotation data for network transmission.
 */
import {
  SerializedComponentType,
  SerializedRotationComponent,
} from "../network/server/serialized.js";
import { NetworkComponent } from "../network/NetworkComponent.js";

// Define a RotationComponent class
export class RotationComponent extends NetworkComponent {
  constructor(
    entityId: number,
    public x: number,
    public y: number,
    public z: number,
    public w = 0
  ) {
    super(entityId, SerializedComponentType.ROTATION);
  }
  deserialize(data: SerializedRotationComponent): void {
    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
    this.w = data.w;
  }

  serialize(): SerializedRotationComponent {
    return {
      x: Number(this.x.toFixed(2)),
      y: Number(this.y.toFixed(2)),
      z: Number(this.z.toFixed(2)),
      w: Number(this.w.toFixed(2)),
    };
  }
}
