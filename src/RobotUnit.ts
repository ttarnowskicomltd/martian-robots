export enum Orientation {
  North = "N",
  South = "S",
  East = "E",
  West = "W",
}

export type RobotPosition = {
  xCoordinate: number;
  yCoordinate: number;
  orientation: Orientation;
};

export interface RobotInstruction {
  run(position: RobotPosition): RobotPosition;
}

export interface RobotUnit {
  sendInstruction(instruction: RobotInstruction): void;
}
