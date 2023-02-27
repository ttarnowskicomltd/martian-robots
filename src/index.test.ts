import {
  ForwardInstruction,
  LeftInstruction,
  Orientation,
  RightInstruction,
  Robot,
  run,
} from ".";

describe("Robot Commands", () => {
  it("run() returns expected output for exercise's input", () => {
    const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

    const expectedOutput = `1 1 E
3 3 N LOST
2 3 S`;

    const actualOutput = run(input);

    expect(actualOutput).toEqual(expectedOutput);
  });

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
    ])(
      "given initial position of $initialPosition, it changes position $expectedPosition for sequence of instructions: $instructions",
      ({ expectedPosition, initialPosition, instructions }) => {
        const robot = new Robot(initialPosition);

        instructions.forEach((instruction) =>
          robot.sendInstruction(instruction)
        );

        expect(robot.getCurrentPosition()).toEqual(expectedPosition);
      }
    );
  });
});
