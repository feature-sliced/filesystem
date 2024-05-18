# @feature-sliced/filesystem

![npm version](https://img.shields.io/npm/v/@feature-sliced/filesystem)
![minzipped package size](https://img.shields.io/bundlephobia/minzip/@feature-sliced/filesystem.svg)

A set of utilities for locating and working with FSD roots in the file system.

This project is intended for developers of tooling for [Feature-Sliced Design][feature-sliced-design].

## Installation

```bash
pnpm add @feature-sliced/filesystem
```

```bash
npm install --save @feature-sliced/filesystem
```

Type definitions are built in 😎.

## API

### `resolveImport`

```ts
function resolveImport(
  importedPath: string,
  importerPath: string,
  tsCompilerOptions: typescript.CompilerOptions,
  fileExists: (path: string) => boolean,
  directoryExists?: (path: string) => boolean,
): string | null;
```

Given a file name, an imported path, and a TSConfig object, produce a path to the imported file, relative to TypeScript's `baseUrl`.

Example:

```tsx
// /project/src/pages/home/ui/HomePage.tsx
import { Button } from "~/shared/ui";
```

```json
// ./tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

```tsx
resolveImport(
  "~/shared/ui",
  "./src/pages/home/ui/HomePage.tsx",
  { moduleResolution: "Bundler", baseUrl: ".", paths: { "~/*": ["./src/*"] } },
  fs.existsSync,
);
```

Expected output: `/project/src/shared/ui/index.ts`.

## FSD-aware traversal

A set of traversal functions for a simple representation of a file system:

```ts
export interface File {
  type: "file";
  path: string;
}

export interface Folder {
  type: "folder";
  path: string;
  children: Array<File | Folder>;
}
```

### `getLayers`

```ts
export type LayerName =
  | "shared"
  | "entities"
  | "features"
  | "widgets"
  | "pages"
  | "app";

function getLayers(fsdRoot: Folder): Partial<Record<LayerName, Folder>>;
```

Extract layers from an FSD root. Returns a mapping of layer name to folder object.

### `getSlices`

```ts
function getSlices(
  slicedLayer: Folder,
  additionalSegmentNames: Array<string> = [],
): Record<string, Folder>;
```

Extract slices from a **sliced** layer. Returns a mapping of slice name (potentially containing slashes) to folder object.

A folder is detected as a slice when it has at least one folder/file with a name of a conventional segment (`ui`, `api`, `model`, `lib`, `config`). If your project contains slices that don't have those segments, you can provide additional segment names.

### `getSegments`

```ts
function getSegments(
  sliceOrUnslicedLayer: Folder,
): Record<string, Folder | File>;
```

Extract segments from a slice or an **unsliced** layer. Returns a mapping of segment name to folder or file object.

### `getAllSlices`

```ts
function getAllSlices(
  fsdRoot: Folder,
  additionalSegmentNames: Array<string> = [],
): Record<string, Folder>;
```

Extract slices from all layers of an FSD root. Returns a mapping of slice name (potentially containing slashes) to folder object.

A folder is detected as a slice when it has at least one folder/file with a name of a conventional segment (`ui`, `api`, `model`, `lib`, `config`). If your project contains slices that don't have those segments, you can provide additional segment names.

### `getAllSegments`

```ts
function getAllSegments(fsdRoot: Folder): Array<{
  segment: Folder | File;
  segmentName: string;
  sliceName: string | null;
  layerName: LayerName;
}>;
```

Extract segments from all slices and layers of an FSD root. Returns a flat array of segments along with their name and location in the FSD root (layer, slice).

### `isSliced`

```ts
export type LayerName =
  | "shared"
  | "entities"
  | "features"
  | "widgets"
  | "pages"
  | "app";

function isSliced(layerOrName: Folder | LayerName): boolean;
```

Determine if this layer is sliced. You can pass the folder of a layer or the name (lowercase). Only layers Shared and App are not sliced, the rest are.

### `getIndex`

```ts
function getIndex(fileOrFolder: File | Folder): File | undefined;
```

Get the index (public API) of a slice or segment. When a segment is a file, it is its own index.

[feature-sliced-design]: https://feature-sliced.design
