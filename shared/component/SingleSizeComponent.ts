/**
 * Represents a single-size component for a networked entity.
 * The `SingleSizeComponent` class extends the `NetworkComponent` class and is responsible for managing the size of an entity in a networked environment.
 *
 * @class SingleSizeComponent
 * @extends NetworkComponent
 * @property {number} size - The size of the entity.
 * @constructor
 * @param {number} entityId - The ID of the entity.
 * @param {number} size - The size of the entity.
 */
import {
  SerializedComponent,
  SerializedComponentType,
} from "../network/server/serialized.js";

import { NetworkComponent } from "../network/NetworkComponent.js";

export class SingleSizeComponent extends NetworkComponent {
  constructor(entityId: number, public size: number) {
    super(entityId, SerializedComponentType.SINGLE_SIZE);
  }
  deserialize(data: SerializedSingleSizeComponent): void {
    this.size = data.size;
  }
  serialize(): SerializedSingleSizeComponent {
    return {
      size: Number(this.size.toFixed(2)),
    };
  }
}

export interface SerializedSingleSizeComponent extends SerializedComponent {
  size: number;
}
