import { Entity } from "../entity/Entity.js";
import { SerializedEntityType } from "../network/server/serialized.js";
import { Component } from "../component/Component.js";

export class EntityManager {
  private static instance: EntityManager;
  private entities: Entity[] = [];
  private static nextId = 1;
  private constructor() {}

  /**
   * Create a new entity and add it to the list
   * @param type The type of the entity
   * @param id Optional id for the entity. If not provided, a new id will be generated.
   * @returns The created entity
   */
  createEntity(type: SerializedEntityType, id?: number): Entity {
    const entity = new Entity(type, id ? id : EntityManager.nextId++);
    this.entities.push(entity);
    return entity;
  }

  /**
   * Get the singleton instance of the EntityManager
   * @returns The EntityManager instance
   */
  public static getInstance(): EntityManager {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }
    return EntityManager.instance;
  }

  /**
   * Get all entities
   * @returns An array of all entities
   */
  getAllEntities(): Entity[] {
    return this.entities;
  }

  /**
   * Get an entity by id
   * @param id The id of the entity to retrieve
   * @returns The entity with the specified id, or undefined if not found
   */
  getEntityById(id: number): Entity | undefined {
    return this.entities.find((entity) => entity.id === id);
  }

  /**
   * Get entities with specific components
   * @param componentType The type of the component to filter by
   * @returns An array of entities that have the specified component
   */
  getEntitiesWithComponents<T extends Component>(
    componentType: new (entityId: number, ...args: any[]) => T
  ): Entity[] {
    return this.entities.filter((entity) => entity.getComponent(componentType));
  }

  /**
   * Remove an entity
   * @param entity The entity to remove
   */
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
}

