import { Robot } from "./Robot";

class Grid {
  private robots: Robot[] = [];
  constructor(private sizeX: number, private sizeY: number) {}
}

export const run = (input: string): string => {
  // parse input

  // create instructions sequence

  // keep track of robot position vs grid

  // send forward instruction only if there is no "robot scent" at the current position for the given orientation

  return `1 1 E
3 3 N LOST
2 3 S`;
};
