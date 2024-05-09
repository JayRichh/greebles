/**
 * Represents a position component for an entity in the game world.
 * The position component is responsible for storing and serializing the x, y, and z coordinates of an entity.
 * It is a part of the NetworkComponent hierarchy, which means it can be serialized and deserialized for network communication.
 */
import {
  SerializedComponentType,
  SerializedPositionComponent,
} from "../network/server/serialized.js";
import { NetworkComponent } from "../network/NetworkComponent.js";

export class PositionComponent extends NetworkComponent {
  constructor(
    entityId: number,
    public x: number,
    public y: number,
    public z: number
  ) {
    super(entityId, SerializedComponentType.POSITION);
  }
  deserialize(data: SerializedPositionComponent): void {
    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
  }
  serialize(): SerializedPositionComponent {
    return {
      x: Number(this.x.toFixed(2)),
      y: Number(this.y.toFixed(2)),
      z: Number(this.z.toFixed(2)),
    };
  }
}
