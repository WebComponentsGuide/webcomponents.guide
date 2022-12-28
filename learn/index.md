---
order: 1
group: getting started
title: introduction
---

## What are Web Components?

Web Components are a native way for web developers to build user interfaces. They're built right into your browser so
you don't have to download any framework to get started! Web Components fit right into your existing HTML today. If
you've got a server that can render HTML, then you can render Web Components!

Web Components allow you to extend the vocabulary of your HTML. You can define new behaviors that go beyond the built in
tags. New features such as `<slide-out-menu>` or `<stop-watch>` are at your finger tips. JavaScript can drive these
definitions, allowing advanced behaviors and interactions.

{% tip %}

Custom Element tag names are required to include a dash (`-`) in their name. Having a dash makes them easier to tell
apart from native elements. New native elements will never have a dash, and so won't conflict.

{% endtip %}

Here's an example of a web component that renders a timer. It defines its own [styles][styles], it renders into a
[shadow root][shadowroot], and has its own [private state][private-state]. It makes use of the [lifecycle
callbacks][lifecycle] to know when to start counting. These are all built in web platform features!

[styles]: /learn/components/styling
[shadowroot]: /learn/components/shadowdom
[private-state]: /learn/components/private-state
[lifecycle]: /learn/components/lifecycle-reference

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
      // Add the shared styles
      this.attachShadow({ mode: "open" }).adoptedStyleSheets = [styles]

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
<stop-watch role="timer"></stop-watch>
```

{% enddemo %}

Let's find out more about how to build this component...
