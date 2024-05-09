import { SerializedComponentType } from "../network/server/serialized.js";
/**
 * Defines the interface for serializable components, which can be serialized and deserialized for network transmission.
 */
export interface Serializable {
  /**
   * The type of the serialized component.
   */
  type: SerializedComponentType;

  /**
   * Serializes the component into a data structure that can be transmitted over the network.
   * @returns The serialized data.
   */
  serialize(): any;

  /**
   * Deserializes the component from the provided data.
   * @param data The data to deserialize the component from.
   */
  deserialize(data: any): void;
}

/**
 * Represents a component of an entity in the game.
 */
export class Component {
  /**
   * Creates a new instance of the Component class.
   * @param entityId The ID of the entity that this component belongs to.
   */
  constructor(public entityId: number) {}
}
