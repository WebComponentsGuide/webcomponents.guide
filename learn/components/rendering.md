---
title: Rendering
order: 5
---

When a Web Component is initialised, it can start interacting with the document and make changes to it. While a
component **could** make changes to the DOM the element is within, there's a better way. Each component can have
its own DOM, that is _encapsulated_ from the rest of the page. This is called the _ShadowDOM_. A component can
create and attach a _ShadowDOM_ to itself by using `attachShadow({ mode: 'open' })`:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }
  
  // Make a ShadowDOM and assign it to public state
  shadowRoot = this.attachShadow({ mode: 'open' })
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
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: 'open' })

  connectedCallback() {
    this.shadowRoot.innerHTML = `<p>Hello World!</p>`
  }
}
```

```html
<my-component></my-component>
```

Perhaps a slightly better way to do this is using a `<template>` element, and cloning the contents of it. A key
reason for this is that cloning from a template requires less computation than setting `innerHTML`. It also
separates your template from your logic, which will keep code cleaner as your component grows in complexity.

```js
// The template can be defined up front
const stopWatchTemplate = document.createElement('template')
stopWatchTemplate.innerHTML = `<p>Hello World!</p>`

class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }
  
  shadowRoot = this.attachShadow({ mode: 'open' })

  connectedCallback() {
    // The template can be cloned and then added to the ShadowDOM
    this.shadowRoot.replaceChildren(
      stopWatchTemplate.cloneNode(true)
    )
  }
}
```

### Declaring your template in HTML

If you don't want to define the template within JavaScript, you can instead define it up-front in the HTML of
your component with a _declarative ShadowDOM template_. When you define a _declarative ShadowDOM template_ the
browser will handle attaching a _shadow root_ and cloning the contents of the template for you. To do this,
you'll need to add a `<template>` tag as a child of your element, with a `shadowroot` attribute:

```html
<stop-watch>
  <template shadowroot="open">
    <p>Hello World</p>
  </template>
</stop-watch>
``` 

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  connectedCallback() {
    // The component's ShadowDOM is now available as
    // this.shadowRoot:
    const pEl = this.shadowRoot.querySelector('p')
    console.assert(pEl.outerHTML === '<p>Hello world</p>')
  }
}
```

{% tip "warn" %}

You will need to declare the `<template>` tag for each element you want to have a _declarative ShadowDOM_. This
means repeating your `<template>` tag for every element in your HTML. It's a good idea to use a server side
language that supports _partials_ or some other system to avoid manually repeating this each time.

{% endtip %}

### Advanced: Adding _declarative ShadowDOM_ fallbacks

Given that a _declarative ShadowDOM_ might not always be available, it can be a good idea to fall back to
defining it in JavaScript instead. You can do this by checking if `.shadowRoot` is not null before calling
`attachShadow({ mode: 'open' })`.


```js
const stopWatchTemplate = document.createElement('template')
stopWatchTemplate.innerHTML = `<p>Hello World!</p>`

class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  constructor() {
    super()
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.replaceChildren(
        stopWatchTemplate.cloneNode(true)
      )
    }
  }
}
```

### Advanced: Using a closed _ShadowDOM_

The `.shadowRoot` property will always exist by default, and will return the attached ShadowRoot, if it is
marked as `mode: 'open'`. You can instead opt to use a _closed_ ShadowRoot, which will **not** be provided
via the `.shadowRoot` property. This can be useful to prevent outside code from easily accessing the
ShadowRoot via `.shadowRoot`. Instead, you can assign your own private field:


```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Define a "private" or closed shadow root
  #shadowRoot = this.attachShadow({ mode: 'closed' })

  connectedCallback() {
    // The standard .shadowRoot property will be null
    console.assert(this.shadowRoot === null)
    
    // It can only be access via your private field
    console.assert(this.#shadowRoot instanceof ShadowRoot)
  }
}
```