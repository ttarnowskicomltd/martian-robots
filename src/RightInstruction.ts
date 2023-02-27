import { Orientation, RobotInstruction, RobotPosition } from "./Robot";

export class RightInstruction implements RobotInstruction {
  run(position: RobotPosition): RobotPosition {
    switch (position.orientation) {
      case Orientation.East:
        return {
          ...position,
          orientation: Orientation.South,
        };
      case Orientation.West:
        return {
          ...position,
          orientation: Orientation.North,
        };
      case Orientation.North:
        return {
          ...position,
          orientation: Orientation.East,
        };
      case Orientation.South:
        return {
          ...position,
          orientation: Orientation.West,
        };
    }
  }
}
