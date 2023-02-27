import { RobotInstruction, RobotPosition, RobotUnit } from "./RobotUnit";

export class Robot implements RobotUnit {
  constructor(private currentPosition: RobotPosition) {}

  sendInstruction(instruction: RobotInstruction) {
    this.currentPosition = instruction.run(this.currentPosition);
  }

  getCurrentPosition(): RobotPosition {
    return this.currentPosition;
  }
}
