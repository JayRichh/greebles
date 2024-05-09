import { ClientMessage } from "./base";

export interface InputMessage extends ClientMessage {
  t: number;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
  throw: boolean;
  shift: boolean;
  escape: boolean;
  numberKeys: boolean[];

  leftButton: boolean
  rightButton: boolean
  mouseXDelta: number
  mouseYDelta: number
  mouseWheelDelta: number

  cameraLeft?: boolean;
  cameraRight?: boolean;
  lookingYAngle?: number;
  lookingXAngle?: number;

  scrollUp: boolean;
  scrollDown: boolean;

  angleY: number;
}
