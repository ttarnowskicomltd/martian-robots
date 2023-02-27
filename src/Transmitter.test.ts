import { Transmitter } from "./Transmitter";

describe("Transmitter", () => {
  const transmitter = new Transmitter();

  describe("transmit", () => {
    it("returns output with LOST information if robot went off the grid", () => {
      const input = `2 2
1 1 N
FF`;
      const expectedOutput = "1 2 N LOST";

      const actualOutput = transmitter.transmit(input);

      expect(actualOutput).toEqual(expectedOutput);
    });

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

      const actualOutput = transmitter.transmit(input);

      expect(actualOutput).toEqual(expectedOutput);
    });
  });
});
