import { InputComponent } from "../component/InputComponent.js";
import { Entity } from "../../../../shared/entity/Entity.js";
import { InputMessage } from "../../../../shared/network/client/input.js";
import { ClientMessageType } from "shared/network/client/base";

export class InputProcessingSystem {
  constructor() {}

  // This function simulates receiving an input packet from a client
  // In a real-world scenario, this would involve listening on a network socket
  receiveInputPacket(playerEntity: Entity, inputMessage: InputMessage) {
    // Get or create the InputComponent for the entity
    let inputComponent = playerEntity.getComponent(InputComponent);

    if (!inputComponent) {
      inputComponent = new InputComponent(playerEntity.id);
      playerEntity.addComponent(inputComponent);
    }
    console.log("Received input packet: ", inputMessage)
    // Update the InputComponent based on the received packet
    inputComponent.t = inputMessage.t;
    inputComponent.down = inputMessage.down || false;
    inputComponent.up = inputMessage.up || false;
    inputComponent.left = inputMessage.left || false;
    inputComponent.right = inputMessage.right || false;
    inputComponent.space = inputMessage.space || false;
    inputComponent.throw = inputMessage.throw || false;
    inputComponent.shift = inputMessage.shift || false;
    inputComponent.escape = inputMessage.escape || false;
    inputComponent.scrollUp = inputMessage.scrollUp || false;
    inputComponent.scrollDown = inputMessage.scrollDown || false;
    inputComponent.cameraLeft = inputMessage.cameraLeft || false;
    inputComponent.cameraRight = inputMessage.cameraRight || false;
    inputComponent.leftButton = inputMessage.leftButton || false;
    inputComponent.rightButton = inputMessage.rightButton || false;
    inputComponent.mouseXDelta = inputMessage.mouseXDelta || 0;
    inputComponent.mouseYDelta = inputMessage.mouseYDelta || 0;
    inputComponent.lookingYAngle = inputMessage.lookingYAngle || 0;
    inputComponent.mouseWheelDelta = inputMessage.mouseWheelDelta || 0;
    inputComponent.numberKeys = inputMessage.numberKeys || Array(10).fill(false);
  }
}
