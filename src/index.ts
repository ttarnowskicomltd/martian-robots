import { ForwardInstruction } from "./ForwardInstruction";
import { LeftInstruction } from "./LeftInstruction";
import { RightInstruction } from "./RightInstruction";
import { Robot } from "./Robot";
import {
  RobotPosition,
  Orientation,
  RobotInstruction,
  RobotUnit,
} from "./RobotUnit";

type ProcessRobotInstructionsResult = {
  position: RobotPosition;
  isLost: boolean;
};

const processRobotInstructions = (
  robot: Robot,
  lostPositions: RobotPosition[],
  gridMinX: number,
  gridMinY: number,
  gridMaxX: number,
  gridMaxY: number,
  instructions: RobotInstruction[]
): ProcessRobotInstructionsResult => {
  if (instructions.length < 1) {
    return { position: robot.getCurrentPosition(), isLost: false };
  }

  for (const instruction of instructions) {
    if (
      instruction instanceof ForwardInstruction &&
      lostPositions.filter(
        (lostPosition) =>
          lostPosition.orientation === robot.getCurrentPosition().orientation &&
          lostPosition.xCoordinate === robot.getCurrentPosition().xCoordinate &&
          lostPosition.yCoordinate === robot.getCurrentPosition().yCoordinate
      ).length > 0
    ) {
      continue;
    }

    const lastRobotPosition = robot.getCurrentPosition();
    robot.sendInstruction(instruction);

    if (
      robot.getCurrentPosition().xCoordinate > gridMaxX ||
      robot.getCurrentPosition().xCoordinate < gridMinX ||
      robot.getCurrentPosition().yCoordinate > gridMaxY ||
      robot.getCurrentPosition().yCoordinate < gridMinY
    ) {
      lostPositions.push(lastRobotPosition);
      return { position: lastRobotPosition, isLost: true };
    }
  }

  return { position: robot.getCurrentPosition(), isLost: false };
};

export const run = (input: string): string => {
  const initialLinePos = input.indexOf("\n");
  const [gridMaxX, gridMaxY] = input
    .substring(0, initialLinePos)
    .split(" ")
    .map((s) => parseInt(s));
  const [gridMinX, gridMinY] = [0, 0];

  const sequences = input.substring(initialLinePos + 1).split("\n\n");

  const lostPositions = [] as RobotPosition[];
  const processRobotInstructionsResults =
    [] as ProcessRobotInstructionsResult[];

  sequences.forEach((sequence) => {
    const [initialPositionString, instructionsString] = sequence.split("\n");
    const [x, y, o] = initialPositionString.split(" ");
    const initialPosition: RobotPosition = {
      xCoordinate: parseInt(x),
      yCoordinate: parseInt(y),
      orientation: o as Orientation,
    };
    const instructions = instructionsString
      .split("")
      .reduce((instructions, instructionString) => {
        if (instructionString === "F") {
          return [...instructions, new ForwardInstruction()];
        }

        if (instructionString === "L") {
          return [...instructions, new LeftInstruction()];
        }

        if (instructionString === "R") {
          return [...instructions, new RightInstruction()];
        }

        return instructions;
      }, [] as RobotInstruction[]);

    const robot = new Robot(initialPosition);

    processRobotInstructionsResults.push(
      processRobotInstructions(
        robot,
        lostPositions,
        gridMinX,
        gridMinY,
        gridMaxX,
        gridMaxY,
        instructions
      )
    );
  });

  const output = processRobotInstructionsResults
    .map((current) => {
      const line = `${current.position.xCoordinate} ${
        current.position.yCoordinate
      } ${current.position.orientation}${current.isLost ? " LOST" : ""}`;

      return line;
    })
    .join("\n");

  return output;
};
