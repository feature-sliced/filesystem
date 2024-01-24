import { describe, expect, test } from "vitest";
import { locateInFsdRoot } from "..";

describe("With default options", () => {
  const expectations = [
    {
      path: "/home/ubuntu/frontend/src/pages/home/ui/HomePage.tsx",
      expected: {
        fsdRoot: "/home/ubuntu/frontend/src",
        layer: "pages",
        slice: "home",
        segment: "ui",
      },
    },
    {
      path: "/home/ubuntu/frontend/src/pages/home/index.ts",
      expected: {
        fsdRoot: "/home/ubuntu/frontend/src",
        layer: "pages",
        slice: "home",
        segment: null,
      },
    },
    {
      path: "/home/ubuntu/frontend/src/pages/login/sign-in/ui/SignInPage.svelte",
      expected: {
        fsdRoot: "/home/ubuntu/frontend/src",
        layer: "pages",
        slice: "login/sign-in",
        segment: "ui",
      },
    },
    {
      path: "/home/ubuntu/frontend/src/pages/login/sign-in/index.ts",
      expected: {
        fsdRoot: "/home/ubuntu/frontend/src",
        layer: "pages",
        slice: "login/sign-in",
        segment: null,
      },
    },
    {
      path: "/home/falkomerr/falkchat/src/features/upload-file/ui/file-upload.tsx",
      expected: {
        fsdRoot: "/home/falkomerr/falkchat/src",
        layer: "features",
        slice: "upload-file",
        segment: "ui",
      },
    },
    {
      path: "/home/lollipopfly/polka/src/entities/book/config/index.ts",
      expected: {
        fsdRoot: "/home/lollipopfly/polka/src",
        layer: "entities",
        slice: "book",
        segment: "config",
      },
    },
    {
      path: "/home/lollipopfly/polka/src/app/providers/router/routes.ts",
      expected: {
        fsdRoot: "/home/lollipopfly/polka/src",
        layer: "app",
        slice: null,
        segment: "providers",
      },
    },
    {
      path: "/home/lollipopfly/polka/src/shared/ui/back-link/BackLink.vue",
      expected: {
        fsdRoot: "/home/lollipopfly/polka/src",
        layer: "shared",
        slice: null,
        segment: "ui",
      },
    },
    {
      path: "/home/AKosogorov/fake-cyber-web-store/src/widgets/TheHeader/TheHeader.vue",
      expected: {
        fsdRoot: "/home/AKosogorov/fake-cyber-web-store/src",
        layer: "widgets",
        slice: "TheHeader",
        segment: null,
      },
    },
  ];

  for (const { path, expected } of expectations) {
    test(path, () => {
      expect(locateInFsdRoot(path)).toStrictEqual(expected);
    });
  }
});

describe("With custom segments", () => {
  const expectations = [
    {
      path: "/app/src/pages/home/assets/icon.svg",
      options: {
        segments: ["assets", "ui", "model", "lib", "api", "config"],
      },
      expected: {
        fsdRoot: "/app/src",
        layer: "pages",
        slice: "home",
        segment: "assets",
      },
    },
    {
      path: "/app/src/pages/home/assets/icon.svg",
      options: {
        segments: { pages: ["assets", "ui", "model", "lib", "api", "config"] },
      },
      expected: {
        fsdRoot: "/app/src",
        layer: "pages",
        slice: "home",
        segment: "assets",
      },
    },
  ];

  for (const { path, options, expected } of expectations) {
    test(`${path} (${JSON.stringify(options)})`, () => {
      expect(locateInFsdRoot(path, options)).toStrictEqual(expected);
    });
  }
});

describe("With another path separator", () => {
  const expectations = [
    {
      path: "/app/src/pages/home/assets/icon.svg",
      options: {
        pathSeparator: "\\",
      },
      expected: null,
    },
    {
      path: "\\app\\src\\shared\\ui\\Button.astro",
      options: {
        pathSeparator: "\\",
      },
      expected: {
        fsdRoot: "\\app\\src",
        layer: "shared",
        slice: null,
        segment: "ui",
      },
    },
    {
      path: "C:\\Users\\ubuntu\\frontend\\src\\pages\\login\\sign-in\\ui\\SignInPage.svelte",
      options: {
        pathSeparator: "\\",
      },
      expected: {
        fsdRoot: "C:\\Users\\ubuntu\\frontend\\src",
        layer: "pages",
        slice: "login\\sign-in",
        segment: "ui",
      },
    },
  ];

  for (const { path, options, expected } of expectations) {
    test(`${path} (${JSON.stringify(options)})`, () => {
      expect(locateInFsdRoot(path, options)).toStrictEqual(expected);
    });
  }
});
