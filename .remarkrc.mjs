import retext from "remark-retext"
import { Parser } from "retext-english"
import dictionary from "dictionary-en"
import { readFileSync } from "node:fs"
export default {
  plugins: [
    "remark-lint",
    "remark-preset-lint-consistent",
    "remark-preset-lint-markdown-style-guide",
    "remark-preset-lint-recommended",
    "remark-preset-prettier",
    "remark-frontmatter",
    "remark-gfm",
    "remark-validate-links",
    "remark-lint-no-duplicate-headings-in-section",
    ["remark-lint-no-duplicate-headings", false],
    ["remark-lint-heading-style", false],
    ["remark-lint-list-item-indent", false],
    ["remark-lint-no-undefined-references", false],
    ["remark-lint-no-shell-dollars", false],
    ["remark-lint-maximum-heading-length", 73],
    [retext, Parser],
    "retext-diacritics",
    "retext-indefinite-article",
    "retext-redundant-acronyms",
    "retext-repeated-words",
    "retext-sentence-spacing",
    ["retext-quotes", { preferred: "straight" }],
    ["retext-contractions", { straight: true }],
    ["retext-passive", { ignore: ["read", "set"] }],
    ["retext-profanities", { ignore: ["execute", "executed", "hook"] }],
    [
      "retext-simplify",
      {
        ignore: [
          "component",
          "implement",
          "render",
          "function",
          "request",
          "type",
          "immediately",
          "observe",
          "perform",
          // TODO: Reduce this list
          "in order to",
          "caveat",
          "consequently",
          "maintain",
          "equivalent",
          "subsequent",
          "similar to",
          "e.g.",
          "multiple",
          "additional",
          "represents",
          "option",
          "notify",
          "previous",
          "modify",
          "very",
        ],
      },
    ],
    [
      "retext-equality",
      {
        noBinary: true,
        // TODO: Reduce this list
        ignore: ["primitive", "just", "easy", "easily", "straightforward", "invalid", "obvious", "host", "hosts"],
      },
    ],
    // TODO: Lower this threshold to 5 / 7
    ["retext-readability", { threshold: 6 / 7 }],
    [
      "retext-spell",
      {
        dictionary,
        ignore: readFileSync(".spelling", "utf-8")
          .split("\n")
          .filter((l) => !l.startsWith("#")),
      },
    ],
  ],
}
