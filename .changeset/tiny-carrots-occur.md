---
"@tammergard/robber": patch
---

Refactor `toRobber` to use regex-based substitution instead of `split`/`map`/`join`. No API changes; runtime is faster and the bundle is ~10% smaller.
