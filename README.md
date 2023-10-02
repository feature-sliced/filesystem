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

## Usage

The only named export of this package is a function `locateNearestRoot` that accepts a path to a file or a folder and returns an object that describes the found root.

[feature-sliced-design]: https://feature-sliced.design
