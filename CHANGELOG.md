# @tammergard/robber

## 1.0.2

### Patch Changes

- 9b76737: Use `devEngines` instead of `engines` for the Node version requirement, so it applies to development only and no longer constrains consumers of the package.

## 1.0.1

### Patch Changes

- 90358d8: Refactor `toRobber` to use regex-based substitution instead of `split`/`map`/`join`. No API changes; runtime is faster and the bundle is ~10% smaller.

## 1.0.0

### Major Changes

- Initial release. Exposes `toRobber`, `fromRobber` and `pattern` for
  converting to and from robber language (rövarspråket).
