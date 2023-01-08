---
title: Initializing Your Component
order: 5
---

Components can have many things that make them useful, for example styles, templates, or other information. Some
components might keep a memory of things - often called _state_. All of these things need to be initialized
somehow. There's several ways to set this information up, and you will likely use a combination of these
techniques when building a component:


## Instantiation

It can be very useful to create things during _instantiation_, that is when the component is first created. Most
likely any _state_ will want to be instantiated with each new component instance created. This can be done with
_class fields_ or as logic during the _constructor_.  

### Class Fields

Components might have some _state_, much of which can be assigned using [class fields][class-fields]. These could
be public, private, or a combination of the two:

[class-fields]: /learn/javascript/classes

```js
class MyComponent extends HTMLElement {
  static define(tag = "my-component") {
    customElements.define(tag, this)
  }
  
  #time = Date.now()
  
  endTime = this.#time + 30_000
  
}
```

### Adding logic during instantiation

Classes can use the `constructor()` method to perform extra logic during instantiation.

{% stub %}

### Adding logic when an element is inserted into the DOM

Perhaps more valuable than knowing when an element is created, is to know when it gets _inserted_ into the DOM.
At this point an element can look at its parent elements to know where it is in the tree, and can do useful
logic like adding event listeners, and start rendering or animating.

If a _custom element_ has a `connectedCallback()` function, then the browser will automatically call this
whenever the element is inserted into a DOM tree (or "connected"). This is sometimes called a "lifecycle
callback" - it's a method that gets called during the elements lifecycle.

```js
class MyComponent extends HTMLElement {
  static define(tag = "my-component") {
    customElements.define(tag, this)
  }
  
  #time = Date.now()
  
  // This gets called automatically by the browser
  connectedCallback() {
  }
  
}
```