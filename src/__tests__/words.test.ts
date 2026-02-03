import { describe, it, expect } from "vitest";
import {
  TECH_WORDS,
  TECH_WORD_LIST,
  TECH_WORD_DESCRIPTIONS,
  pickRandomWord,
  isValidGuess,
  evaluateGuess,
  getWordDescription,
} from "../words";

describe("TECH_WORDS", () => {
  it("contains only lowercase words", () => {
    for (const word of TECH_WORDS) {
      expect(word).toBe(word.toLowerCase());
    }
  });

  it("contains words between 3 and 7 characters", () => {
    for (const word of TECH_WORDS) {
      expect(word.length).toBeGreaterThanOrEqual(3);
      expect(word.length).toBeLessThanOrEqual(7);
    }
  });
});

describe("TECH_WORD_LIST", () => {
  it("has no duplicates", () => {
    const unique = new Set(TECH_WORD_LIST);
    expect(unique.size).toBe(TECH_WORD_LIST.length);
  });
});

describe("TECH_WORD_DESCRIPTIONS", () => {
  it("has a description for every word in the tech word list", () => {
    for (const word of TECH_WORD_LIST) {
      expect(TECH_WORD_DESCRIPTIONS[word]).toBeDefined();
      expect(TECH_WORD_DESCRIPTIONS[word].length).toBeGreaterThan(0);
    }
  });
});

describe("getWordDescription", () => {
  it("returns the description for a known word", () => {
    expect(getWordDescription("rust")).toContain("memory-safe");
  });

  it("is case-insensitive", () => {
    expect(getWordDescription("RUST")).toBe(getWordDescription("rust"));
  });

  it("returns empty string for unknown words", () => {
    expect(getWordDescription("zzzzz")).toBe("");
  });
});

describe("pickRandomWord", () => {
  it("returns a word from the tech word list", () => {
    const word = pickRandomWord();
    expect(TECH_WORD_LIST).toContain(word);
  });

  it("returns a lowercase string", () => {
    const word = pickRandomWord();
    expect(word).toBe(word.toLowerCase());
  });
});

describe("isValidGuess", () => {
  it("accepts tech words", () => {
    expect(isValidGuess("react")).toBe(true);
    expect(isValidGuess("docker")).toBe(true);
    expect(isValidGuess("rust")).toBe(true);
  });

  it("accepts common English words", () => {
    expect(isValidGuess("able")).toBe(true);
    expect(isValidGuess("about")).toBe(true);
    expect(isValidGuess("action")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(isValidGuess("REACT")).toBe(true);
    expect(isValidGuess("React")).toBe(true);
  });

  it("rejects invalid words", () => {
    expect(isValidGuess("zzzzz")).toBe(false);
    expect(isValidGuess("xyzab")).toBe(false);
  });
});

describe("evaluateGuess", () => {
  it("marks all correct letters", () => {
    const result = evaluateGuess("react", "react");
    expect(result).toEqual(["correct", "correct", "correct", "correct", "correct"]);
  });

  it("marks all absent letters", () => {
    const result = evaluateGuess("build", "react");
    expect(result).toEqual(["absent", "absent", "absent", "absent", "absent"]);
  });

  it("marks present letters in wrong position", () => {
    const result = evaluateGuess("arect", "react");
    // a at 0: not at position 0 in "react" (r), but a exists at index 2 -> present
    // r at 1: not at position 1 in "react" (e), but r exists at index 0 -> present
    // e at 2: not at position 2 in "react" (a), but e exists at index 1 -> present
    // c at 3: correct position -> correct
    // t at 4: correct position -> correct
    expect(result).toEqual(["present", "present", "present", "correct", "correct"]);
  });

  it("handles duplicate letters correctly - one correct, one absent", () => {
    // solution: "react" has one 'a'
    // guess: "aback" has two 'a's
    // first 'a' at index 0 -> not in position 0 of "react", but 'a' exists -> present
    // second 'a' at index 2 -> not in position 2 of "react" (which is 'a'... wait)
    // Let me pick a clearer example
    // solution: "hello", guess: "llama"
    // l at 0: not correct (h), but l is in solution -> present (consume one l)
    // l at 1: not correct (e), but l is in solution -> present (consume second l)
    // a at 2: not correct (l), a not in solution -> absent
    // m at 3: not correct (l), m not in solution -> absent
    // a at 4: not correct (o), a not in solution -> absent
    const result = evaluateGuess("llama", "hello");
    expect(result).toEqual(["present", "present", "absent", "absent", "absent"]);
  });

  it("handles duplicate letters - correct position takes priority", () => {
    // solution: "hello" (h, e, l, l, o)
    // guess:    "lllow" (l, l, l, o, w)
    // First pass (correct): l≠h, l≠e, l=l(correct), o≠l, w≠o
    //   remaining = [h, e, null, l, o]
    // Second pass: l at 0 -> remaining has l at index 3 -> present, remaining[3]=null
    //   l at 1 -> no more l remaining -> absent
    //   o at 3 -> remaining has o at index 4 -> present, remaining[4]=null
    //   w at 4 -> absent
    const result = evaluateGuess("lllow", "hello");
    expect(result).toEqual(["present", "absent", "correct", "present", "absent"]);
  });

  it("handles single present vs multiple guessed", () => {
    // solution: "parse" (p, a, r, s, e)
    // guess:    "aabcd" (a, a, b, c, d)
    // First pass: a≠p, a=a(correct at 1), b≠r, c≠s, d≠e
    //   remaining = [p, null, r, s, e]
    // Second pass: a at 0 -> no more a in remaining -> absent
    //   b at 2 -> absent, c at 3 -> absent, d at 4 -> absent
    const result = evaluateGuess("aabcd", "parse");
    expect(result).toEqual(["absent", "correct", "absent", "absent", "absent"]);
  });

  it("returns correct length for different word sizes", () => {
    const result4 = evaluateGuess("rust", "bash");
    expect(result4).toHaveLength(4);

    const result7 = evaluateGuess("angular", "webpack");
    expect(result7).toHaveLength(7);
  });
});
