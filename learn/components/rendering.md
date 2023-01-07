---
title: Rendering
order: 5
---

When a Web Component is initialised, it can start interacting with the document and make changes to it. While a
component **could** make changes to the DOM the element is within, there's a better way. Each component can have
its own DOM, that is _encapsulated_ from the rest of the page. This is called the _ShadowDOM_. A component can
create and attach a _ShadowDOM_ to itself by using `attachShadow({ mode: 'open' })`:

```js
class MyComponent extends HTMLElement {
  static define(tag = "my-component") {
    customElements.define(tag, this)
  }
  
  // Make a ShadowDOM and assign it to private state:
  #root = this.attachShadow({ mode: 'open' })
}
```

This DOM tree is exclusive to your Web Component, and the rest of the document can't accidentally influence it.
You can append new elements into a components _ShadowDOM_ (even stylesheets) and it won't impact other parts of
the page. Other elements can't accidentally reach in to another elements _ShadowDOM_; DOM APIs like
`.querySelector()` won't reach into different _ShadowDOMs_. All this means the _ShadowDOM_ is your components
safe space to put whatever content it needs to render.

One way to make use of this _ShadowDOM_ is to set the `.innerHTML` whenever your element gets connected. To do
this you can use the `connectedCallback()` lifecycle function:

```js
class MyComponent extends HTMLElement {
  static define(tag = "my-component") {
    customElements.define(tag, this)
  }
  
  // Make a ShadowDOM and assign it to private state:
  #root = this.attachShadow({ mode: 'open' })

  connectedCallback() {
    this.#root.innerHTML = '<p>Hello World!</p>'
  }
}
```

```html
<my-component></my-component>
```
