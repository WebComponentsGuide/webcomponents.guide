---
title: Initializing Your Component
order: 5
---

Components can have many things that make them useful, for example styles, templates, or other information. Some
components might keep a memory of things - often called _state_. All of these things need to be initialized using
different techniques. You will likely use a combination of these techniques when building a component.

It can be very useful to create things during _instantiation_, that is when the component is first created. Most likely
any _state_ will want to be instantiated with each new component instance created. This can be done with _class fields_
or as logic during the _constructor_.

### Class Fields

Components might have some _state_, much of which can be assigned using [class fields][class-fields]. These could be
public, private, or a combination of the two:

[class-fields]: /learn/javascript/classes

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  #time = Date.now()

  endTime = this.#time + 30_000
}
```

### Adding logic during instantiation

Classes can use the `constructor()` method to perform extra logic during instantiation. Web Components are free to use
the `constructor()`, but it's not necessarily the best way to initialize a component. If you can, use private or public
fields to set up state without having to use the `constructor()` - it'll be easier to read. If your component has
additional set up logic, like adding event listeners, then the `constructor()` isn't the best place for that - as the
Web Component isn't inserted into (or _connected_) to a DOM tree, and so it won't have a `parent`. For that, you'll
need a _lifecycle callback_...

### Adding logic when an element is inserted into the DOM

Perhaps more valuable than knowing when an element is created, is to know when it gets _inserted_ into the DOM. At this
point an element can look at its _parent elements_ to know where it is in the tree, and can do useful logic like adding
_event listeners_, and start rendering or animating.

If a _custom element_ has a `connectedCallback()` function, then the browser will automatically call this whenever the
element is inserted into (or _connected_) a DOM tree. This is sometimes called a [lifecycle callback][lifecycle]. You
can use the `connectedCallback` to call other functions you have in your class, or to perform the elements set up.

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  #time = Date.now()

  // This gets called automatically by the browser
  connectedCallback() {
    this.start()
  }

  start() {
    console.log("timer started")
  }
}
```

It's a good idea to also make use of the `disconnectedCallback()` function, which is another [lifecycle
callback][lifecycle]. The `disconnectedCallback()` gets called whenever the element is removed (or _disconnected_) from
the DOM tree. Things you set up in the `connectedCallback()` can be cleaned up in the `disconnectedCallback()`:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  #time = Date.now()

  connectedCallback() {
    // Add event listeners when connected
    this.ownerDocument.addEventListener("keypress", this)
  }

  disconnectedCallback() {
    // Remove the registered event listeners when disconnected
    this.ownerDocument.removeEventListener("keypress", this)
  }
}
```

{% tip "danger" %}

Event listeners will stay active until they're removed. If you don't remove them in the `disconnectedCallback()`, they
could still be active, which will result in errors when those events get triggered.

{% endtip %}

### Advanced: use an AbortController in your `disconnectedCallback()`

Instead of setting up things in `connectedCallback()` and tearing those down in the `disconnectedCallback()`, you can
make use of an `AbortController` to group the setup and tear down logic close to each other. You can set up an
`AbortController` during the `connectedCallback()`, and call `.abort()` in the `disconnectedCallback()`. Then, whatever
makes use of the signal will get cleaned up when the signal aborts.

Lots of APIs make use of _signals_, including `addEventListener`. Take a look at the following two classes which are
have equivalent functionality, but one uses the `AbortController`:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Set up the class field, but set it to null for now
  #abortController = null

  connectedCallback() {
    // Make a new AbortController
    this.#abortController = new AbortController()

    const { signal } = this.#abortContoller

    // Pass the signal to addEventListener
    this.ownerDocument.addEventListener("keypress", this, { signal })

    // Use a signal "abort" event to stop the timer
    signal.addEventListener("abort", () => this.stop(), { once: true })
    this.start()
  }

  disconnectedCallback() {
    // All cleanup happens with this one line
    this.#abortController?.abort()
  }
}
```

[lifecycle]: /learn/components/lifecycle-reference/
