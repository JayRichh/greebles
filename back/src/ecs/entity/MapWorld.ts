import { EntityManager } from "../../../../shared/entity/EntityManager.js";
import { Entity } from "../../../../shared/entity/Entity.js";
import { SerializedEntityType } from "../../../../shared/network/server/serialized.js";
import { EventTrimesh } from "../component/events/EventTrimesh.js";

export class MapWorld {
  entity: Entity;
  constructor() {
    this.entity = EntityManager.getInstance().createEntity(
      SerializedEntityType.WORLD
    );

    this.entity.addComponent(
      new EventTrimesh(this.entity.id, "../front/public/assets/small.glb")
    );
  }
}
