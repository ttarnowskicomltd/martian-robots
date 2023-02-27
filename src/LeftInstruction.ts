import { Orientation, RobotInstruction, RobotPosition } from "./RobotUnit";

export class LeftInstruction implements RobotInstruction {
  run(position: RobotPosition): RobotPosition {
    switch (position.orientation) {
      case Orientation.East:
        return {
          ...position,
          orientation: Orientation.North,
        };
      case Orientation.West:
        return {
          ...position,
          orientation: Orientation.South,
        };
      case Orientation.North:
        return {
          ...position,
          orientation: Orientation.West,
        };
      case Orientation.South:
        return {
          ...position,
          orientation: Orientation.East,
        };
    }
  }
}
