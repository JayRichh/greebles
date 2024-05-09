import { Component, Serializable } from "../component/Component.js";
import { SerializedComponentType } from "./server/serialized.js";

/**
 * A component that can be serialized and sent over the network.
 * By default, a NetworkComponent is always sent on each network tick.
 * However, some NetworkComponents may only be sent when a change occurs,
 * rather than on every tick.
 *
 * If a NetworkComponent has an "initialSent" flag set to true, it indicates
 * that this is the first time the component is being sent. In this case,
 * the entire component state should be broadcast to ensure the recipient
 * has a complete initial copy of the component.
 */
export class NetworkComponent extends Component implements Serializable {
  /**
   * Flag indicating whether the component has been updated and needs to be sent.
   */
  updated: boolean = true;

  /**
   * Creates a new NetworkComponent instance.
   * @param entityId The ID of the entity this component belongs to.
   * @param type The serialized type of the component.
   */
  constructor(entityId: number, public type: SerializedComponentType) {
    super(entityId);
  }

  /**
   * Serializes the component into a format suitable for network transmission.
   * @returns The serialized representation of the component.
   */
  serialize() {
    throw new Error("Method not implemented.");
  }

  /**
   * Deserializes the component from a network transmission.
   * @param data The serialized data to deserialize.
   */
  deserialize(data: any): void {
    throw new Error("Method not implemented.");
  }
}
