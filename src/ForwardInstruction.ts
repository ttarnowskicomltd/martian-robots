import { Orientation, RobotInstruction, RobotPosition } from "./RobotUnit";

export class ForwardInstruction implements RobotInstruction {
  run(position: RobotPosition): RobotPosition {
    switch (position.orientation) {
      case Orientation.East:
        return {
          ...position,
          xCoordinate: position.xCoordinate + 1,
        };
      case Orientation.West:
        return {
          ...position,
          xCoordinate: position.xCoordinate - 1,
        };
      case Orientation.North:
        return {
          ...position,
          yCoordinate: position.yCoordinate + 1,
        };
      case Orientation.South:
        return {
          ...position,
          yCoordinate: position.yCoordinate - 1,
        };
    }
  }
}
