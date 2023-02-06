import styles from "../css/code-interactive.css"

import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
} from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import {
  bracketMatching,
  defaultHighlightStyle,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search"
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from "@codemirror/autocomplete"
import { lintKeymap } from "@codemirror/lint"

const setup = (() => [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])()

export default class CodeInteractiveElement extends HTMLElement {
  static define(tagName = "code-interactive") {
    customElements.define(tagName, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  get lang() {
    return this.getAttribute("lang")
  }

  connectedCallback() {
    const extensions = [setup]

    if (this.lang === "html") {
      extensions.push(html())
    } else if (this.lang === "css") {
      extensions.push(css())
    } else {
      console.warn(`Language ${this.lang} is not supported. Defaulting to JavaScript`)
      extensions.push(javascript())
    }

    new EditorView({
      extensions,
      parent: this.shadowRoot,
      root: this.shadowRoot,
      doc: this.textContent,
    })

    this.shadowRoot.adoptedStyleSheets.push(styles)
  }
}
