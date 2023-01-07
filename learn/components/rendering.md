---
title: Rendering
order: 4
---

When a Web Component is initialised, it can start interacting with the document and make changes to it. A component's
class is just JavaScript, and so you have access to the whole `document` and can change anything on the page - but
that's not a good idea, as it can be brittle and complex. For example, when this element is inserted into the page,
it'll take over all of the contents of the page, and replace everything with `Hello World!`. That's not good at all!

```js
class BadComponent extends HTMLElement {
  static define(tag = "bad-component") {
    customElements.define(tag, this)
  }

  connectedCallback() {
    // This is bad!
    document.write("Hello world!")
  }
}
```

```html
<bad-component></bad-component>
```

Instead, good components should only change their _subtree_, in other words anything that is nested inside of the
component. You could do this using the regular _DOM APIs_ but only manipulate the contents of your element and its
children, via `this`. That too can suffer from the same issues though.

```js
class OkayComponent extends HTMLElement {
  static define(tag = "okay-component") {
    customElements.define(tag, this)
  }

  connectedCallback() {
    // This is better!
    this.append("Hello World!")
  }
}
```

```html
<okay-component></okay-component>
```

Web Components have a special API that you can tap into to create a subtree **just** for your Web Component, called
_ShadowDOM_.

```js
class OkayComponent extends HTMLElement {
  #shadowRoot = this.attachShadow({ mode: 'open' })
  
  static define(tag = "okay-component") {
    customElements.define(tag, this)
  }

  connectedCallback() {
    // This is best!
    this.#shadowRoot.append("Hello World!")
  }
}
```

```html
<best-component></best-component>
```
