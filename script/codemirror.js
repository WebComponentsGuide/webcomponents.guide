import styles from "../css/code-interactive.css"

import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
} from "@codemirror/view"
import { EditorState, Transaction } from "@codemirror/state"
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search"
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"
import { lintKeymap } from "@codemirror/lint"

const setup = (() => [
  //lineNumbers(),
  //highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  //foldGutter(),
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

class CodeInteractiveElement extends HTMLElement {
  static define(tagName = "code-interactive") {
    customElements.define(tagName, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })
  #editor = new EditorView({
    extensions: [setup, javascript()],
    parent: this.shadowRoot,
    root: this.shadowRoot,
    doc: this.textContent,
  })

  connectedCallback() {
    this.shadowRoot.adoptedStyleSheets.push(styles)
  }
}

CodeInteractiveElement.define()
