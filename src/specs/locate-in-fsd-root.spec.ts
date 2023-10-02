import { expect, test } from "vitest";
import { locateInFsdRoot } from "../locate-in-fsd-root";

test("correctly locates TODO.ts", () => {
  expect(locateInFsdRoot("/TODO.ts")).toBe(null);
});
