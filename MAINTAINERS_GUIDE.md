To release, bump the version in `package.json` manually, push the commit to let the CI pipeline check the code.

Then build the latest version of the package:

```bash
pnpm build
```

Finally, publish the package to npm:

```bash
pnpm publish
```

Then go on GitHub and create a release and write the changelog.
