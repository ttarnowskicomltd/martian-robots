import { run } from ".";

describe("Transmitter", () => {
  describe("transmit", () => {
    it("returns expected output for exercise's input", () => {
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
  });
});
