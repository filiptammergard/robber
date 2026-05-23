const ROBBER_CONSONANTS = "bcdfghjklmnpqrstvwz"
const ALL_CONSONANTS = `${ROBBER_CONSONANTS}x`

const TRIO_ALTERNATION = ROBBER_CONSONANTS.split("")
	.map((c) => `[${c.toUpperCase()}${c}]o${c}`)
	.join("|")

const NON_CONSONANT_CLASS = `[^${ALL_CONSONANTS}${ALL_CONSONANTS.toUpperCase()}]`

export const pattern = new RegExp(
	`^(?:${TRIO_ALTERNATION}|${NON_CONSONANT_CLASS})*$`,
)

const X_PATTERN = /x/gi
const CONSONANT_PATTERN = new RegExp(`[${ROBBER_CONSONANTS}]`, "gi")
const TRIO_PATTERN = new RegExp(TRIO_ALTERNATION, "g")

export function toRobber(text: string): string {
	if (typeof text !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof text}`)
	}
	return text
		.replace(X_PATTERN, (m) => (m === "X" ? "Ks" : "ks"))
		.replace(CONSONANT_PATTERN, (c) => `${c}o${c.toLowerCase()}`)
}

export function fromRobber(robber: string): string {
	if (typeof robber !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof robber}`)
	}
	if (!pattern.test(robber)) {
		throw new Error("input is not a valid robber language string")
	}
	return robber.replace(TRIO_PATTERN, (match) => match.charAt(0))
}
