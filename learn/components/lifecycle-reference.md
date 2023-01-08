---
title: Lifecycle Reference
order: 10
---

Custom Elements have several "well known" method names which are called periodically through the life cycle of the
element, and let you observe when an element changes in various ways. When you define these on your class the browser
will call these on your behalf as various things happen to the element. Aside from `constructor()` (which is a native
part of JavaScript itself) each lifecycle callback is suffixed with `Callback`, to make it easier to see that the
browser will call this method for you.

## `constructor()`

The [constructor][constructor] is a native part of the JavaScript language. It exists for any class, and a Custom
Element is no different. Because Custom Elements must always extend from `HTMLElement` (or another tags constructor, for
example `HTMLDialogElement`), it always has a "super class", and so the first thing it must do is call `super()`:

```js
class MyElement extends HTMLElement {
  constructor() {
    super()
  }
}
```

Typically `constructor` gets called when you instantiate a class with `new` (e.g. `new MyElement()`). HTML Elements will
throw an error if you try to instantiate them like this though, instead if you want to create one you have to use the
`document.createElement` factory method.

Whenever an _already defined_ element is created, its constructor will be called. So that means:

- When the `document.createElement` factory is called with your tag-name, e.g. `document.createElement('my-element')`.
- When the HTML parser encounters the tag in rendered markup, e.g. `<my-element>`.
  - This could mean HTML content from a server response.
  - It could also mean content coming from `.innerHTML = '...'`
  - It could also mean content coming `new DOMParser()`

When an element gets defined, any matching tags that are already in the HTML document will have their constructor
called.

### What is `constructor` good for?

Because the `constructor()` is typically called _before_ the element has any _attributes_ or sometimes any _inner HTML_,
it's not a great idea to query an element to see if it has attributes, or query its DOM. Instead, the `constructor()` is
the best place to initialize private internal state.

In general, work should probably be deferred to `connectedCallback()` as much as possible.

{% tip "danger" %}

If the `constructor()` throws an error for any reason, then the browser cannot "upgrade" the element to your class, and
so instead of inheriting from your class, the element will fall back to being an `HTMLUnknownElement`.

{% endtip %}

[constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor

## `connectedCallback()`

The `connectedCallback()` is a "well known" method. It doesn't exist as part of native JavaScript classes, instead it's
something that the browser knows about just within the context of custom Elements.

When the browser attaches an element to the DOM tree, if it has a `connectedCallback()`, then that will be called. So
that means:

- When an element created in JavaScript is appended to the document, e.g. via a call like `container.append(myElement)`.
- When the HTML parser encounters the closing tag of an element, and can connect it to the tree, e.g. `</my-element>`.
  - This could mean HTML content from a server response.
  - It could also mean content coming from `.innerHTML = '...'`
  - It could also mean content coming `new DOMParser()`

### What is `connectedCallback` good for?

The `connectedCallback` is called _as soon as_ the element is attached to a `document`, and so the elements
`.ownerDocument` property will be set (usually that will point to the global `document` object).

This _may_ occur _before_ an element has any children appended to it, so you should be careful not expect an element to
have children during a `connectedCallback` call. This means you might want to avoid using APIs like `querySelector`.

Instead use this function to initialize itself, render any [ShadowDOM][shadowdom] and add [global event
listeners][events].

[shadowdom]: /learn/components/shadowdom
[events]: /learn/components/events

If your element depends heavily on its children existing, consider adding a
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) in the `connectedCallback` to
track when your elements children change.

## `disconnectedCallback()`

Just like `connectedCallback()`, `disconnectedCallback()` is a "well known" method. It doesn't exist as part of native
JavaScript classes, instead it's something that the browser knows about just within the context of custom Elements.

### What is `disconnectedCallback` good for?

`disconnectedCallback()` is sort of like the opposite of `connectedCallback()`. Anything that you do in
`connectedCallback()` should be undone in `disconnectedCallback()`. This means if you have called `addEventListener` in
your `connectedCallback()` you'll need call `removeEventListener` in the `disconnectedCallback()`.

## `attributeChangedCallback()`

The `attributeChangedCallback()` is a "well known" method. It doesn't exist as part of native JavaScript classes,
instead it's something that the browser knows about just within the context of custom Elements.

### What is `attributeChangedCallback` good for?

On its own, `attributeChangedCallback()` won't do anything. It gets called whenever an _observed attribute_ changes
value. _Observed attributes_ are attributes a class declares that it would like to observe, through the
`static observedAttributes` property:

```js
class MyElement extends HTMLElement {
  static observedAttributes = ["my-attribute", "other-attribute"]
  // ^ declare you'd like to observe "my-attribute" and "other-attribute"

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "my-attribute") {
      console.log("my-attribute changed!")
    } else if (name === "other-attribute") {
      console.log("other-attribute changed!")
    }
  }
}
```

When a document is parsed all of the attributes which are observed will result in a call to
`attributeChangedCallback()`. This can happen _before_ the element is connected and `connectedCallback` has been called,
so avoid relying on the element being connected during this time.

The `attributeChangedCallback()` will fire whenever `setAttribute`, `removeAttribute`, `toggleAttribute` are called if
they are changing an observed attribute.

Attributes are also nodes that can be constructed with [`document.createAttribute()`][createattribute], which returns an
`Attr` object. This `Attr` object can then be applied to the element via `.setAttributeNode()`. This will also result in
the `attributeChangedCallback()` being called if it's an observed attribute. An `Attr` object also has a `.value`
property; changing that will _also_ call `attributeChangedCallback()`.

It's worth noting that even if the _new_ value is the same as the _old_ value, calling `setAttribute` or changing the
`.value` on an `Attr` will result in the `attributeChangedCallback()` being called. In other words, it is possible for
`attributeChangedCallback` to be called when `oldValue === newValue`. In most cases this really won't matter much, and
in some cases this is very helpful; but sometimes this can bite, especially if you have
[non-idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_examples) code inside your
`attributeChangedCallback`. Try to make sure operations inside `attributeChangedCallback` are idempotent, or perhaps
consider adding a check to ensure `oldValue !== newValue` before performing operations which may be sensitive to this.

[createattribute]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute

## `adoptedCallback()`

The `adoptedCallback()` is another well known method gets called when your element moves from one `document` to another
(such as an iframe). It's rare that this happens, and so for the most part you can skip implementing this, but it can be
useful especially if you have event listeners on the `document` or `window`, which will change when the
`adoptedCallback()` is called.

## Summary

Here's a quick summary showing how each of the lifecycle elements get called during some typical code:

```js
customElements.define(
  "my-element",
  class extends HTMLElement {
    static observedAttributes = ["some-attr"]
  }
)

const el = document.createElement("my-element")
// browser calls `el.constructor()`

el.setAttribute("some-attr", "some-value")
// browser calls `el.attributeChangedCallback('some-attr', null, 'some-value')`

el.setAttribute("other-attr", "some-value")
// (nothing called)

document.body.appendChild(el)
// browser calls `el.connectedCallback()`

el.remove()
// browser calls `disconnectedCallback()`

document.querySelector("#my-app").append(el)
// browser calls `connectedCallback()`

document.body.append(el)
// browser calls `disconnectedCallback()`
// browser calls `connectedCallback()`

document.body.querySelector("iframe").contentWindow.document.body.append(el)
// browser calls `disconnectedCallback()`
// browser calls `adoptedCallback()`
// browser calls `connectedCallback()`
```
