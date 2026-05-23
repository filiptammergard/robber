import { describe, expect, it } from "vitest"
import { fromRobber, pattern, toRobber } from "./index"

const KNOWN_PAIRS: ReadonlyArray<readonly [string, string]> = [
	["", ""],
	["a", "a"],
	["hej", "hohejoj"],
	["Hej", "Hohejoj"],
	["rövarspråket", "rorövovarorsospoproråkoketot"],
	["Min mening", "Mominon momenoninongog"],
	["Xylofoner är fina", "Koksosylolofofononeror äror fofinona"],
	["yxa", "ykoksosa"],
	["1 + 2 = 3", "1 + 2 = 3"],
	["Hej, världen!", "Hohejoj, vovärorloldodenon!"],
]

describe("@tammergard/robber", () => {
	it("converts known pairs with toRobber", () => {
		for (const [text, robber] of KNOWN_PAIRS) {
			expect(toRobber(text)).toBe(robber)
		}
	})

	it("recognises robber output as valid via pattern", () => {
		for (const [, robber] of KNOWN_PAIRS) {
			expect(pattern.test(robber)).toBe(true)
		}
	})

	it("roundtrips text without x via fromRobber(toRobber())", () => {
		const inputs = [
			"",
			"a",
			"hej",
			"Hej",
			"rövarspråket",
			"Min mening",
			"1 + 2 = 3",
			"Hej, världen!",
		]
		for (const text of inputs) {
			expect(fromRobber(toRobber(text))).toBe(text)
		}
	})

	it("converts x to ks in the round trip (lossy by design)", () => {
		expect(fromRobber(toRobber("yxa"))).toBe("yksa")
		expect(fromRobber(toRobber("Xylofoner"))).toBe("Ksylofoner")
	})

	it("rejects invalid robber input", () => {
		const message = "input is not a valid robber language string"
		expect(() => fromRobber("b")).toThrow(message) // standalone consonant
		expect(() => fromRobber("bo")).toThrow(message) // incomplete trio
		expect(() => fromRobber("bod")).toThrow(message) // mismatched trio
		expect(() => fromRobber("Hohej")).toThrow(message) // half-encoded
		expect(() => fromRobber("xox")).toThrow(message) // standalone x is invalid
		expect(() => fromRobber("Xox")).toThrow(message) // standalone X is invalid
	})

	it("throws on non-string input", () => {
		expect(() => toRobber(123 as unknown as string)).toThrow(
			"input needs to be of type string, got number",
		)
		expect(() => fromRobber(123 as unknown as string)).toThrow(
			"input needs to be of type string, got number",
		)
	})
})
