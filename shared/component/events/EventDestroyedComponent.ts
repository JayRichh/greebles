/**
 * Represents a component that is used to indicate that an entity has been destroyed.
 * This component is serialized and sent over the network to notify other clients of the entity's destruction.
 */
import {
  SerializedComponentType,
  SerializedSizeComponent,
} from "../../network/server/serialized.js";

import { NetworkComponent } from "../../network/NetworkComponent.js";

export class EventDestroyedComponent extends NetworkComponent {
  constructor(entityId: number) {
    super(entityId, SerializedComponentType.DESTROYED);
  }

  deserialize(data: any): void {}
  serialize(): any {
    return {};
  }
}
