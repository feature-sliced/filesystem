import type { FileLocation, LayerName, SegmentName } from "./definitions";

export interface LocateInFsdRootOptions {
  /**
   * Segment names that can appear in the project.
   *
   * Can either be a flat array of segment names across all layers,
   * or an individual set of segment names for each layer.
   *
   * @default
   * ["ui", "model", "lib", "api", "config"]
   *
   * @example
   * {
   *   pages: ["ui", "api"],
   *   widgets: ["ui", "model", "lib"],
   *   shared: ["ui", "config", "i18n"],
   * }
   */
  segments?:
    | Array<SegmentName>
    | Partial<Record<LayerName, Array<SegmentName>>>;
  /**
   * OS-specific delimiter between path segments.
   *
   * @default
   * "/"
   */
  pathSeparator?: string;
}

const defaultOptions = {
  segments: ["ui", "model", "lib", "api", "config"],
  pathSeparator: "/",
};

const layers = [
  "shared",
  "entities",
  "features",
  "widgets",
  "pages",
  "app",
] satisfies Array<LayerName>;
const slicelessLayers = ["shared", "app"] satisfies Array<LayerName>;

export function locateInFsdRoot(
  path: string,
  options: LocateInFsdRootOptions = defaultOptions,
): FileLocation | null {
  const { pathSeparator, segments } = { ...defaultOptions, ...options };

  const reversedPathSegments = path.split(pathSeparator).reverse();
  const layerIndex = reversedPathSegments.findIndex((pathSegment) =>
    layers.includes(pathSegment),
  );
  if (layerIndex < 0) {
    return null;
  }

  const fsdRoot = reversedPathSegments
    .slice(layerIndex + 1)
    .reverse()
    .join(pathSeparator);
  const layer = reversedPathSegments[layerIndex] as LayerName;

  let segmentIndex = -1;
  let slice: FileLocation["slice"] = null;
  if (slicelessLayers.includes(layer)) {
    segmentIndex = layerIndex - 1;
  } else {
    segmentIndex = reversedPathSegments.findIndex((pathSegment) =>
      Array.isArray(segments)
        ? segments.includes(pathSegment)
        : (segments[layer] ?? defaultOptions.segments).includes(pathSegment),
    );

    if (segmentIndex < 0) {
      slice = reversedPathSegments
        .slice(1, layerIndex)
        .reverse()
        .join(pathSeparator);
    } else {
      slice = reversedPathSegments
        .slice(segmentIndex + 1, layerIndex)
        .reverse()
        .join(pathSeparator);
    }
  }

  if (segmentIndex < 0) {
    return {
      fsdRoot,
      layer,
      slice,
      segment: null,
    };
  }

  const segment = reversedPathSegments[segmentIndex] as SegmentName;

  return {
    fsdRoot,
    layer,
    slice,
    segment,
  };
}
