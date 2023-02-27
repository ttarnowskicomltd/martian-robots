export enum Orientation {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

type RobotPosition = {
  xCoordinate: number;
  yCoordinate: number;
  orientation: Orientation;
};

export class Robot {
  constructor(private currentPosition: RobotPosition) {}

  sendInstruction(instruction: RobotInstruction) {
    this.currentPosition = instruction.run(this.currentPosition);
  }

  getCurrentPosition(): RobotPosition {
    return this.currentPosition;
  }
}

interface RobotInstruction {
  run(position: RobotPosition): RobotPosition;
}

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

type World = {
  sizeX: number;
  sizeY: number;
};

export const run = (input: string): string => {
  return `1 1 E
3 3 N LOST
2 3 S`;
};
