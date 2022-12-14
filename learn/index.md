---
order: 1
group: Getting Started
title: Introduction
---

## What are Web Components?

Web Components are a native way for web developers to build user interfaces. They're built right into your browser so
you don't have to download any framework to get started!

Web Components allow you to extend the vocabulary of your HTML. You can define entirely new behaviors that go beyond the
built in tags; new features such as `<slide-out-menu>` or `<stop-watch>` are at your finger tips. These definitions can
be driven by JavaScript, allowing advanced behaviours and interactions.

The best thing about Web Components is that they fit right into however you render your HTML today. If you're already
using a server side language that can render HTML, then you can render web components!

{% tip %}

Custom Element tag names are required to include a dash in it's name. This allows browsers to know if a tag name is a
custom or native element, and keeps forward-compatibility with new natively added elements.

{% endtip %}

Here's an example of a web component that renders a timer. It defines its own [styles][styles], it renders into a
[shadowroot][shadowroot], and has its own [private state][private-state]. It makes use of the [lifecycle
callbacks][lifecycle] to know when to start counting. These are all built in web platform features!

[styles]: {{ site.base_url}}/learn/components/styling

[shadowroot]: {{ site.base_url}}/learn/components/shadowdom

[private-state]: {{ site.base_url}}/learn/components/private-state

[lifecycle]: {{ site.base_url}}/learn/components/lifecycle

{% demo %}

```js
// Create a new stylesheet that can be shared by all `stop-watch` elements
const styles = new CSSStyleSheet()
styles.replaceSync(`
  :host {
    font-size: var(--font-size-3);
    font-style: italic;
  }
`)

// Define the `<stop-watch>` element
customElements.define(
  "stop-watch",
  class extends HTMLElement {
    // Private state
    #start = 0

    connectedCallback() {
      this.attachShadow({ mode: "open" }).adoptedStyleSheets.push(styles)

      this.#start = Date.now()
      this.#tick()
    }

    #tick() {
      this.update()
      requestAnimationFrame(() => this.#tick())
    }

    update() {
      const milliseconds = Date.now() - this.#start
      const minutes = String(Math.floor(milliseconds / (1000 * 60))).padStart(2, "0")
      const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, "0")
      const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0")
      this.shadowRoot.innerHTML = `${minutes}:${seconds}:${hundredths}`
    }
  }
)
```

```html
<stop-watch></stop-watch>
```

{% enddemo %}
