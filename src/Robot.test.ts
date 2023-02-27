import { ForwardInstruction } from "./ForwardInstruction";
import { LeftInstruction } from "./LeftInstruction";
import { RightInstruction } from "./RightInstruction";
import { Robot } from "./Robot";
import { Orientation } from "./RobotUnit";

describe("Robot", () => {
  it.each([
    {
      initialPosition: {
        xCoordinate: 2,
        yCoordinate: 2,
        orientation: Orientation.North,
      },
      expectedPosition: {
        xCoordinate: 1,
        yCoordinate: 2,
        orientation: Orientation.West,
      },
      instructions: [new LeftInstruction(), new ForwardInstruction()],
    },
    {
      initialPosition: {
        xCoordinate: 2,
        yCoordinate: 2,
        orientation: Orientation.North,
      },
      expectedPosition: {
        xCoordinate: 2,
        yCoordinate: 2,
        orientation: Orientation.West,
      },
      instructions: [new LeftInstruction()],
    },
    {
      initialPosition: {
        xCoordinate: 2,
        yCoordinate: 2,
        orientation: Orientation.North,
      },
      expectedPosition: {
        xCoordinate: 2,
        yCoordinate: 1,
        orientation: Orientation.South,
      },
      instructions: [
        new LeftInstruction(),
        new LeftInstruction(),
        new ForwardInstruction(),
      ],
    },
    {
      initialPosition: {
        xCoordinate: 5,
        yCoordinate: 5,
        orientation: Orientation.North,
      },
      expectedPosition: {
        xCoordinate: 7,
        yCoordinate: 5,
        orientation: Orientation.East,
      },
      instructions: [
        new ForwardInstruction(), // 5,6,N
        new ForwardInstruction(), // 5,7,N
        new LeftInstruction(),
        new ForwardInstruction(), // 4,7,W
        new LeftInstruction(),
        new ForwardInstruction(), // 4,6,S
        new LeftInstruction(),
        new ForwardInstruction(), // 5,6,E
        new ForwardInstruction(), // 6,6,E
        new ForwardInstruction(), // 7,6,E
        new RightInstruction(), // 7,6,S
        new ForwardInstruction(), // 7,5,S
        new RightInstruction(), // 7,5,W
        new ForwardInstruction(), // 6,5,W
        new RightInstruction(), // 6,5,N
        new RightInstruction(), // 6,5,E
        new ForwardInstruction(), // 7,5,E
      ],
    },
    {
      initialPosition: {
        xCoordinate: 0,
        yCoordinate: 3,
        orientation: Orientation.West,
      },
      expectedPosition: {
        xCoordinate: 2,
        yCoordinate: 4,
        orientation: Orientation.South,
      },
      instructions: [
        new LeftInstruction(),
        new LeftInstruction(),
        new ForwardInstruction(),
        new ForwardInstruction(),
        new ForwardInstruction(),
        new LeftInstruction(),
        new ForwardInstruction(),
        new LeftInstruction(),
        new ForwardInstruction(),
        new LeftInstruction(),
      ],
    },
  ])(
    "given initial position of $initialPosition, it changes position $expectedPosition for sequence of instructions: $instructions",
    ({ expectedPosition, initialPosition, instructions }) => {
      const robot = new Robot(initialPosition);

      instructions.forEach((instruction) => robot.sendInstruction(instruction));

      expect(robot.getCurrentPosition()).toEqual(expectedPosition);
    }
  );
});
