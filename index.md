---
layout: main.html
css: [index.css]
---

<hero-header>
  <img slot="logo" src="/images/logo.svg" />
  <h1 slot="title">Web Components</h1>
  <h2 slot="subtitle">The native way to build powerful user interfaces</h2>
  <a slot="cta" href="/learn">Learn</a>
  <a slot="cta" href="/tutorials">Tutorials</a>
</hero-header>
<advantage-item>
  <h2>{% icon "package-open" %}Built in</h2>
  <p>
    Web Components are <strong>built right into the browser</strong> and require no additional frameworks or JavaScript libraries to pull
    in. Bundle sizes will be small and loading times short.
  </p>
</advantage-item>
<advantage-item>
  <h2>{% icon "layout-dashboard" %}Interoperable</h2>
  <p>
    Web Components are standard JavaScript, and so <strong>work anywhere that HTML does</strong>. If you're already using a framework,
    then Web Components will fit right in!
  </p>
</advantage-item>
<advantage-item>
  <h2>{% icon "zap" %}Powerful</h2>
  <p>
    Web Components provide <strong>new ways of building UI</strong>, like the ShadowDOM, which enables powerful new patterns for
    encapsulation.
  </p>
</advantage-item>

<section>

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

</section>
