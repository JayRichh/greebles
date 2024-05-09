import { SizeComponent } from "../../../../shared/component/SizeComponent.js";
import { Entity } from "../../../../shared/entity/Entity.js";
import { EventSizeComponent } from "../component/events/EventSizeComponent.js";

export class UpdateSizeSystem {
  update(entities: Entity[]) {
    for (const entity of entities) {
      const sizeComponent = entity.getComponent(SizeComponent);
      if (sizeComponent) {
        // Implement random size change
        if (Math.random() < 0.001) {
          const { width, height, depth } = sizeComponent;
          entity.addComponent(
            new EventSizeComponent(
              entity.id,
              Math.max(0.5, width + Math.random() / 3),
              Math.max(0.5, height + Math.random() / 3),
              Math.max(0.5, depth + Math.random() / 3)
            )
          );
        }
      }
    }
  }
}
