---
title: Lifecycle
order: 2
---

Custom Elements have several "well known" method names which are called periodically through the life cycle of the
element, and let you observe when an element changes in various ways. When you define these on your class the browser
will call these on your behalf as various things happen to the element. Aside from `constructor()` (which is a native
part of JavaScript itself) each lifecycle callback is suffixed with `Callback`, to make it easier to see that the
browser will call this method for you.

## `constructor()`

The [constructor][constructor] is a native part of the JavaScript language. It exists for any class, and a Custom
Element is no different! Because Custom Elements must always extend from `HTMLElement` (or another tags constructor, for
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
- When the HTML parser enounters the closing tag of an element, and can connect it to the tree, e.g. `</my-element>`.
  - This could mean HTML content from a server response.
  - It could also mean content coming from `.innerHTML = '...'`
  - It could also mean content coming `new DOMParser()`

### What is `connectedCallback` good for?

The `connectedCallback` is called _as soon as_ the element is attached to a `document`, and so the elements
`.ownerDocument` property will be set (usually that will point to the global `document` object).

This _may_ occur _before_ an element has any children appended to it, so you should be careful not expect an element to
have children during a `connectedCallback` call. This means you might want to avoid using APIs like `querySelector`.

Instead use this function to initialize itself, render any [ShadowDOM][shadowdom] and add [global event listeners][events].

[shadowdom]: {{ site.base_url}}/learn/components/shadowdom
[events]: {{ site.base_url}}/learn/components/events

If your element depends heavily on its children existing, consider adding a
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) in the `connectedCallback` to
track when your elements children change.

## `disconnectedCallback()`

The [`disconnectedCallback()` is part of Custom Elements][ce-callbacks], and gets called as soon as your element is
_removed_ from the DOM. Event listeners will automatically be cleaned up, and memory will be freed automatically from
JavaScript, so you're unlikely to need this callback for much.

## `attributeChangedCallback()`

The [`attributeChangedCallback()` is part of Custom Elements][ce-callbacks], and gets called when _observed attributes_
are added, changed, or removed from your element. It required you set a `static observedAttributes` array on your class,
the values of which will be any attributes that will be observed for mutations. This is given a set of arguments, the
signature of your function should be:

```typescript
attributeChangedCallback(name: string, oldValue: string|null, newValue: string|null): void {}
```

### Things to remember

The `attributeChangedCallback` will fire whenever `setAttribute` is called with an observed attribute, even if the _new_
value is the same as the _old_ value. In other words, it is possible for `attributeChangedCallback` to be called when
`oldValue === newValue`. In most cases this really won't matter much, and in some cases this is very helpful; but
sometimes this can bite, especially if you have
[non-idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_examples) code inside your
`attributeChangedCallback`. Try to make sure operations inside `attributeChangedCallback` are idempotent, or perhaps
consider adding a check to ensure `oldValue !== newValue` before performing operations which may be sensitive to this.

## `adoptedCallback()`

The [`adoptedCallback()` is part of Custom Elements][ce-callbacks], and gets called when your element moves from one
`document` to another (such as an iframe). It's very unlikely to occur, you'll almost never need this.

[ce-callbacks]:
  https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
