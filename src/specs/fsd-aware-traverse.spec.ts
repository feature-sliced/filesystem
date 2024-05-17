import { test, expect } from "vitest";

import { getSlices, type Folder } from "../index.js";
import { parseIntoFolder } from "./prepare-test.js";

test("getSlices", () => {
  const rootFolder = parseIntoFolder(`
    📂 entities
      📂 user
        📂 ui
        📄 index.ts
      📂 posts
        📂 ui
        📄 index.ts
    📂 features
      📂 comments
        📂 ui
        📄 index.ts
    📂 pages
      📂 editor
        📂 ui
      📂 settings
        📂 notifications
          📂 ui
          📄 index.ts
        📂 profile
          📂 ui
          📄 index.ts
  `);

  expect(getSlices(rootFolder.children[0] as Folder)).toEqual({
    user: (rootFolder.children[0] as Folder).children[0],
    posts: (rootFolder.children[0] as Folder).children[1],
  });
  expect(getSlices(rootFolder.children[1] as Folder)).toEqual({
    comments: (rootFolder.children[1] as Folder).children[0],
  });
  expect(getSlices(rootFolder.children[2] as Folder)).toEqual({
    editor: (rootFolder.children[2] as Folder).children[0],
    "settings/notifications": (
      (rootFolder.children[2] as Folder).children[1] as Folder
    ).children[0],
    "settings/profile": (
      (rootFolder.children[2] as Folder).children[1] as Folder
    ).children[1],
  });
});
