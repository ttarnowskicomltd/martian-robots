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

type GridConstraints = {
  gridMinX: number;
  gridMinY: number;
  gridMaxX: number;
  gridMaxY: number;
};

type ProcessRobotInstructionsResult = {
  position: RobotPosition;
  isLost: boolean;
};

const processRobotInstructions = (
  robot: Robot,
  lostPositions: RobotPosition[],
  gridConstraints: GridConstraints,
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
      robot.getCurrentPosition().xCoordinate > gridConstraints.gridMaxX ||
      robot.getCurrentPosition().xCoordinate < gridConstraints.gridMinX ||
      robot.getCurrentPosition().yCoordinate > gridConstraints.gridMaxY ||
      robot.getCurrentPosition().yCoordinate < gridConstraints.gridMinY
    ) {
      lostPositions.push(lastRobotPosition);
      return { position: lastRobotPosition, isLost: true };
    }
  }

  return { position: robot.getCurrentPosition(), isLost: false };
};

const extractGridConstraints = (input: string): GridConstraints => {
  const initialLinePos = input.indexOf("\n");

  const [gridMaxX, gridMaxY] = input
    .substring(0, initialLinePos)
    .split(" ")
    .map((s) => parseInt(s));

  return {
    gridMaxX,
    gridMaxY,
    gridMinX: 0,
    gridMinY: 0,
  };
};

const extractInitialPositionAnInstructionsPairs = (
  input: string
): [RobotPosition, RobotInstruction[]][] => {
  const sequences = input.substring(input.indexOf("\n") + 1).split("\n\n");

  return sequences.map((sequence) => {
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

    return [initialPosition, instructions];
  });
};

export const run = (input: string): string => {
  const gridConstraints = extractGridConstraints(input);
  const initialPositionAnInstructionsPairs =
    extractInitialPositionAnInstructionsPairs(input);

  const lostPositions = [] as RobotPosition[];
  const processRobotInstructionsResults =
    initialPositionAnInstructionsPairs.map(
      ([initialPosition, instructions]) => {
        const robot = new Robot(initialPosition);

        return processRobotInstructions(
          robot,
          lostPositions,
          gridConstraints,
          instructions
        );
      }
    );

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
