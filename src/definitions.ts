/**
 * An FSD root is an isolated folder structure that adheres to the rules of FSD.
 *
 * There can be several FSD roots in a project, they can also be arbitrarily nested.
 */
export interface FsdRoot {
  type: "root";
  /** Absolute path to the folder containing all the layers of this FSD root. */
  path: string;
  /**
   * The layers of this FSD root.
   *
   * Not every layer has to appear in an FSD root, but each layer can only appear once.
   */
  layers: Record<LayerName, Layer | null>;
}

export type LayerName =
  | "shared"
  | "entities"
  | "features"
  | "widgets"
  | "pages"
  | "app";

/**
 * Slices can have arbitrary names.
 *
 * When a slice is grouped in a folder, the folder name becomes a part of the slice's name.
 *
 * For example, for a slice `logout` grouped in a folder `auth`, the slice's name is `auth/logout`.
 * In the filesystem, this is represented as follows:
 *  - 📂 features/
 *    - 📂 auth/
 *      - 📂 logout/
 *        - …
 *        - index.ts
 *      - 📂 login/
 *        - …
 *        - index.ts
 */
export type SliceName = string;

/**
 * Although there are several recommended segment names such as `ui`, `model`, and `api`,
 * segment names can be arbitrary.
 */
export type SegmentName = string;

export type Layer = SlicedLayer | UnslicedLayer;

/**
 * A sliced layer is a layer that has slices as immediate child folders.
 *
 * According to the methodology, the following layers are sliced:
 *  - Entities
 *  - Features
 *  - Widgets
 *  - Pages
 */
export interface SlicedLayer {
  type: "sliced-layer";
  name: Exclude<LayerName, UnslicedLayerName>;
  /** Absolute path to this layer's folder. */
  path: string;
  /**
   * Slices can appear as direct subfolders or be grouped.
   *
   * The name of a slice is the path from the layer to the slice's folder,
   * the one that contains the slice's index file.
   */
  slices: Record<SliceName, Slice>;
}

export type UnslicedLayerName = "shared" | "app";

/**
 * An unsliced layer is a layer that has segments as immediate child folders.
 *
 * According to the methodology, the following layers are unsliced:
 *  - Shared
 *  - App
 */
export interface UnslicedLayer {
  type: "unsliced-layer";
  name: UnslicedLayerName;
  /** Absolute path to this layer's folder. */
  path: string;
  /** Segments appear only as direct subfolders of the layer they appear in. */
  segments: Record<SegmentName, Segment>;
}

export interface Slice {
  type: "slice";
  name: SliceName;
  /** Absolute path to this slice's folder. */
  path: string;
  /** Segments appear only as direct subfolders of the slice they appear in. */
  segments: Record<SegmentName, Segment>;
  /** Absolute path to the index file, if present. */
  index: string | null;
}

export interface Segment {
  type: "segment";
  name: SegmentName;
  /** Absolute path to this segment's folder or file. */
  path: string;
  /**
   * Absolute path to the index file, if present.
   *
   * If the segment is a file, this should be identical to `path`.
   */
  index: string | null;
}

export interface FileLocation {
  type: "file-location";
  layer: LayerName;
  slice: SliceName | null;
  segment: SegmentName | null;
}
