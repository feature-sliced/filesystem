import type { FileLocation, LayerName, SegmentName } from "./definitions";

export interface LocateInFsdRootOptions {
  /**
   * Segment names that can appear in the project.
   *
   * Can either be a flat array of segment names across all layers,
   * or an individual set of segment names for each layer.
   */
  segments: Array<SegmentName> | Record<LayerName, Array<SegmentName>>;
}

const defaultOptions = {
  segments: ["ui", "model", "lib", "api", "config"],
};

export function locateInFsdRoot(
  path: string,
  options: LocateInFsdRootOptions = defaultOptions,
): FileLocation | null {
  return null;
}
