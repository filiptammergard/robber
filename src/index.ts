const CONSONANTS = "bcdfghjklmnpqrstvwxz"
const ROBBER_CONSONANTS = "bcdfghjklmnpqrstvwz"

const TRIO_ALTERNATION = ROBBER_CONSONANTS.split("")
	.map((c) => `[${c.toUpperCase()}${c}]o${c}`)
	.join("|")

const NON_CONSONANT_CLASS = `[^${CONSONANTS}${CONSONANTS.toUpperCase()}]`

export const pattern = new RegExp(
	`^(?:${TRIO_ALTERNATION}|${NON_CONSONANT_CLASS})*$`,
)

const TRIO_REGEX = new RegExp(TRIO_ALTERNATION, "g")

function isConsonant(letter: string): boolean {
	return CONSONANTS.includes(letter.toLowerCase())
}

function isUpperCase(letter: string): boolean {
	return letter === letter.toUpperCase()
}

function consonantToRobber(letter: string): string {
	if (letter.toLowerCase() === "x") {
		const k = isUpperCase(letter) ? "K" : "k"
		return `${k}oksos`
	}
	return `${letter}o${letter.toLowerCase()}`
}

export function toRobber(text: string): string {
	if (typeof text !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof text}`)
	}
	return text
		.split("")
		.map((letter) => (isConsonant(letter) ? consonantToRobber(letter) : letter))
		.join("")
}

export function fromRobber(robber: string): string {
	if (typeof robber !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof robber}`)
	}
	if (!pattern.test(robber)) {
		throw new Error("input is not a valid robber language string")
	}
	return robber.replace(TRIO_REGEX, (match) => match.charAt(0))
}
