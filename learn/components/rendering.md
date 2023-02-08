---
title: Rendering
order: 5
---

When a Web Component initializes, it can start interacting with the document and make changes to it. While a component
**could** make manipulate other parts of DOM or even it's children, there's a better way. Each component can have its
own DOM, _encapsulated_ from the rest of the page. This is called the _ShadowDOM_. A component can create and attach a
_ShadowDOM_ to itself by using `attachShadow({ mode: 'open' })`:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Make a ShadowDOM and assign it to public state
  shadowRoot = this.attachShadow({ mode: "open" })
}
```

{% tip "info" %}

The `.shadowRoot` property is always present on an element. It will return an elements _open shadow root_ or `null` if
it doesn't have one. Setting `shadowRoot =` isn't necessary - it's redundant - but it makes the code more readable.

{% endtip %}

This _ShadowDOM_ tree is exclusive to your Web Component. The rest of the document can't accidentally influence it. You
can add new elements into a _ShadowDOM_ - even stylesheets - and it won't impact the rest of the DOM. Other logic or
styles won't get access to a components _ShadowDOM_. CSS selectors do not cross the boundary between the main _light
DOM_ and the _ShadowDOM_. APIs like `.querySelector()`, or `.children` also don't cross this boundary. All this means
the _ShadowDOM_ is your components safe space to put whatever content it needs to render.

One way to make use of this _ShadowDOM_ is to use the same DOM APIs to construct the contents. For example setting the
`.innerHTML` whenever your element gets connected. To do this you can use the `connectedCallback()` lifecycle function:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <span>00:00:00</span>
      <button>Start</button>
    `
  }
}
```

```html
<my-component></my-component>
```

You can define a `<template>` element up front. Using the `cloneNode()` API efficiently copies the template into the
_Shadow Root_. This requires less computation than setting `innerHTML` each time, and can be easier to read. It also
separates your template from your logic. Keeping templates away from logic keeps code cleaner as your component grows in
complexity.

```js
// The template can be defined up front and re-used
const template = document.createElement("template")
template.innerHTML = `
  <span>00:00:00</span>
  <button>Start</button>
`

class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  connectedCallback() {
    // The template can be cloned and then added to the ShadowDOM
    this.shadowRoot.replaceChildren(template.content.cloneNode(true))
  }
}
```

### Declaring your template in HTML

If you don't want to define the template within JavaScript, you can instead define it up-front in the HTML of your
component with a _declarative ShadowDOM template_. When you define a _declarative ShadowDOM template_ the browser will
handle attaching a _shadow root_ and cloning the contents of the template for you. To do this, you'll need to add a
`<template>` tag as a child of your element, with a `shadowrootmode` attribute:

```html
<stop-watch>
  <template shadowrootmode="open">
    <span>00:00:00</span>
    <button>Start</button>
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
    const el = this.shadowRoot.querySelector("span")
    console.assert(el.outerHTML === `<span>00:00:00</span>`)
  }
}
```

{% tip "warn" %}

You will need to declare the `<template>` tag for each element you want to have a _declarative ShadowDOM_. This means
repeating your `<template>` tag for every element in your HTML. It's a good idea to use a server side language that
supports _partials_ or some other system to avoid manually repeating this each time.

{% endtip %}

### Advanced: Adding _declarative ShadowDOM_ fallback

Given that a _declarative ShadowDOM_ might not always be available, it can be a good idea to fall back to defining it in
JavaScript instead. You can do this by checking if `.shadowRoot` is not null before calling
`attachShadow({ mode: 'open' })`.

```js
const template = document.createElement("template")
template.innerHTML = `
  <span>00:00:00</span>
  <button>Start</button>
`

class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  constructor() {
    super()
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" })
      this.shadowRoot.replaceChildren(template.content.cloneNode(true))
    }
  }
}
```

### Advanced: Using a closed _ShadowDOM_

You might have noticed that `attachShadow()` has to be passed `mode: 'open'` (and similarly _declarative ShadowDOM_ is
created using `<template shadowrootmode="open">`). This tells the ShadowRoot to be in "open" mode, which makes it
_public_. Other elements will be able to access an open ShadowRoot via the `.shadowRoot` property - even if you don't
set it yourself. Generally speaking, open ShadowRoots are the best choice; they still offer good isolation and are easy
to work with.

Another option, however, is to set it to `mode: 'closed'`. This makes your ShadowRoot private. A _closed ShadowRoot_
**will not** be accessible via `.shadowRoot` (unless you intentionally assign it to `.shadowRoot`). It will also change
some other minor edge cases:

- Elements inside of a Closed ShadowRoot will not appear in an Event's `.composedPath()`.
- Elements assigned to a [Slot][slots] within a closed ShadowRoot won't be reflected in the `.assignedSlot` property.

If those two points don't make sense, then don't worry! They're seldom used APIs. The point being, it's more difficult
for outside code to find its way to your ShadowRoot. It's important to note that _private_ doesn't mean _secure_. It's
still possible to get a closed ShadowRoot, such as overriding the `HTMLElement.prototype.attachShadow` function itself.
Don't rely on _closed ShadowRoots_ for security.

Using a _closed ShadowRoot_ does mean there's a bit more work involved within your component to access the ShadowRoot.
If you're calling `attachShadow` in JavaScript, you will want to set it to a private field:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Define a "private" or closed shadow root
  #shadowRoot = this.attachShadow({ mode: "closed" })

  connectedCallback() {
    // The standard .shadowRoot property will be null
    console.assert(this.shadowRoot === null)

    // It can only be access via your private field
    console.assert(this.#shadowRoot instanceof ShadowRoot)
  }
}
```

If you're using a _declarative ShadowDOM_ then you'll need to use an API called _Element Internals_. To get to a Web
Components _Element Internals_, `.attachInternals()` can be called. It can only be called once though - subsequent calls
will throw an error. Internals should be private in a Web Component class as - like the name suggests - they contain a
variety of internal APIs for a Web Component. The Element Internals API **also** has a `.shadowRoot` property, but this
one can also get the _closed ShadowRoot_:

```html
<stop-watch>
  <template shadowrootmode="closed">
    <span>00:00:00</span>
    <button>Start</button>
  </template>
</stop-watch>
```

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Capture the Element Internals
  #internals = this.attachInternals()

  // Get the closed declarative ShadowRoot from internals:
  #shadowRoot = this.#internals.shadowRoot
}
```

[slots]: /learn/components/slots
