import retext from 'remark-retext'
import {Parser} from 'retext-english'
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
    "retext-indefinite-article"
  ],
}
