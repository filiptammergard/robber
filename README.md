# @tammergard/robber

Convert to and from robber language (Swedish: _rövarspråket_).

## Installation

```bash
# npm
npm install @tammergard/robber

# pnpm
pnpm add @tammergard/robber

# bun
bun add @tammergard/robber
```

## Usage

```ts
import { fromRobber, pattern, toRobber } from "@tammergard/robber"

toRobber("Hej") // "Hohejoj"
fromRobber("Hohejoj") // "Hej"

pattern.test("Hohejoj") // true
pattern.test("Hohej") // false
```

## API

### `toRobber(text: string): string`

Encodes a string into robber language: every consonant is replaced with the
consonant + `"o"` + the same consonant. The letter `x` is first expanded to
`ks` (since `x` is pronounced `"ks"` in Swedish), so `"yxa"` becomes
`"ykoksosa"`. Vowels, digits, punctuation and other characters pass through
unchanged.

Throws if the input is not a string.

### `fromRobber(robber: string): string`

Decodes a robber language string back to plain text by reversing the
consonant-doubling rule. Throws if the input is not a string or not a valid
robber language string.

Note that the `x → ks` step in `toRobber` is lossy, so the round trip is not
perfectly reversible:

```ts
toRobber("yxa") // "ykoksosa"
fromRobber("ykoksosa") // "yksa", not "yxa"
```

This is by design: `"x"` and `"ks"` both encode to the same robber output, so
there's no way for `fromRobber` to tell them apart.

### `pattern: RegExp`

A regular expression that matches valid robber language strings. A string is
valid if every consonant is immediately followed by `"o"` + the same consonant
(case-insensitive on the trailing one), and no standalone `x` or `X` appears.

## License

MIT
