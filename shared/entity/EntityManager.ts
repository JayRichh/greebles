import { Entity } from "../entity/Entity.js";
import { SerializedEntityType } from "../network/server/serialized.js";
import { Component } from "../component/Component.js";

export class EntityManager {
  private static instance: EntityManager;
  private entities: Entity[] = [];
  private static nextId = 1;
  private constructor() {}

  // Create a new entity and add it to the list
  createEntity(type: SerializedEntityType, id?: number): Entity {
    const entity = new Entity(type, id ? id : EntityManager.nextId++);
    this.entities.push(entity);
    return entity;
  }
  public static getInstance(): EntityManager {
    if (!EntityManager.instance) {
      EntityManager.instance = new EntityManager();
    }
    return EntityManager.instance;
  }

  // Get all entities
  getAllEntities(): Entity[] {
    return this.entities;
  }

  static getEntitiesByType(entities: Entity[], type: SerializedEntityType) {
    return entities.filter((entity) => entity.type === type);
  }

  static getFirstEntityByType(entities: Entity[], type: SerializedEntityType) {
    return entities.find((entity) => entity.type === type);
  }
  static getEntityById(entities: Entity[], id: number) {
    return entities.find((entity) => entity.id === id);
  }

  // Get entities with specific components
  static getEntitiesWithComponents<T extends Component>(
    entities: Entity[],
    componentType: new (entityId: number, ...args: any[]) => T
  ): Entity[] {
    return entities.filter((entity) => entity.getComponent(componentType));
  }

  static getFirstEntityWithComponent<T extends Component>(
    entities: Entity[],
    componentType: new (entityId: number, ...args: any[]) => T
  ): Entity | undefined {
    return entities.find((entity) => entity.getComponent(componentType));
  }
  // Remove an entity
  removeEntity(entity: Entity): void {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
  removeEntityById(id: number): void {
    const index = this.entities.findIndex((entity) => entity.id === id);
    console.log("Removing entity", id, "from EntityManager");
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }
}
