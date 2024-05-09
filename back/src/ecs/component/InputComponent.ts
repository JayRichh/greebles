import { Component } from "../../../../shared/component/Component.js";

export class InputComponent extends Component {
  t?: number;
  up: boolean = false;
  down: boolean = false;
  left: boolean = false;
  right: boolean = false;
  space: boolean = false;
  throw: boolean = false;
  cameraLeft: boolean = false;
  cameraRight: boolean = false;
  shift: boolean = false;
  escape: boolean = false;
  scrollUp: boolean = false;
  scrollDown: boolean = false;
  leftButton: boolean = false;
  rightButton: boolean = false;
  lookingYAngle: number = 0;
  mouseXDelta: number = 0;
  mouseYDelta: number = 0;
  mouseWheelDelta: number = 0;
  numberKeys: boolean[] = Array(10).fill(false);
}
