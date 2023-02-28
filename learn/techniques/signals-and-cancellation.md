---
title: Using Signals and Cancellation
order: 2
---

Long running tasks, asynchronous tasks, and operations that have a _set up_ and _tear down_ phase, can make use of a
concept called _cancellation_. If you've used other programming languages you might be familiar with objects like
`CancellationToken` (or [Go's `context`](https://pkg.go.dev/context)) - JavaScript's equivalent is `AbortSignal` which
can be operated with an `AbortController`.

The `AbortController` & `AbortSignal` APIs can help manage operational "life time". Some examples:

- Long running or asynchronous tasks, for example timers or network fetches
- Overlapping operations, for example cancelling in-flight network fetches to replace them with newer ones
- Set up and tear down, for example a Web Components `connectedCallback` and `disconnectedCallback`

## Signal Controller Pattern

_Signals_ get given to APIs so they know when to abort. Signals are created by _controllers_ (`new AbortSignal()` will
throw an error). _Controllers_ allow you to make the decision of when a Signal changes. Creating an `AbortController`
will also create a new _Signal_ accessible via `.signal`. Code that has access to the _controller_ can determine when it
should be aborted (by calling `.abort()`), while code that has access to the _signal_ can be notified of the abort. To
make a new `AbortController`, call `new AbortContoller()`. The constructor takes no arguments.

A _signals_ `.aborted` property will be `true` if the signal has been aborted - you can periodically check that to stop
any work that is about to be done. `AbortSignal` is also an `EventTarget` - it emits an `abort` event which you can
listen to and invoke your tear down.

You can also create some basic _controller-free signals_ that follow some common patterns. For example
`AbortSignal.timeout(1000)` will create a _signal_ that aborts after 1000ms. These _controller-free signals_ cannot be
manually aborted. However, you can _combine_ controller-free and controllable signals with
`AbortSignal.any([...signals])`.

## Using Signals internally manage your private APIs

_Signals_ can be used to manage internal state that you might have. You can create an `AbortController` as part of your
private state, and make use of _signals_ to control behavior. Consumers of your component won't pass these signals to
you, instead you can use them to track a tasks state internally.

A component with `start()` and `stop()` functions can make the `stop()` function abort the controller, and the `start()`
function create the controller, while checking if the signal has been aborted during an asynchronous loop like so:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  // Set up the class field, but set it to null for now
  #startStopController = null

  async start() {
    // Stop the current task if there was one
    this.stop()

    // Create a new internal controller, and get the signal
    this.#startStopController = new AbortController()
    const signal = this.#startStopController.signal

    // Loop until `signal.aborted` is `true`.
    while (!signal.aborted) {
      // Automatically stop when this element is disconnected
      if (!this.isConnected) return

      const milliseconds = Date.now() - this.#start
      const minutes = String(Math.floor(milliseconds / (1000 * 60))).padStart(2, "0")
      const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, "0")
      const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0")
      this.shadowRoot.replaceChildren(`${minutes}:${seconds}:${hundredths}`)

      // Schedule next update by awaiting an animation frame
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }

  stop() {
    // Stop aborts the startStopController if it exists
    this.#startStopController?.abort()
  }
}
```

## Using Signals in your own public APIs

If you can use a signal as part of your internal state, it might be simpler to provide it as part of the public API. If
you are considering using _signals_ in a public API, it's a good idea to make them an optional part of your API as they
won't always be _needed_.

A component using _signals_ no longer needs separate start & stop methods, instead combining into one and relying on the
signal to know when to stop. This can often simplify code as there is no need to track state across different methods.

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  async start({ signal } = {}) {
    // Loop until `signal.aborted` is `true`.
    // If `signal` doesn't exist, then loop forever.
    // Uses the optional chaining operator to safely check if signal exists
    while (!signal?.aborted) {
      // Automatically stop when this element is disconnected
      if (!this.isConnected) return

      const milliseconds = Date.now() - this.#start
      const minutes = String(Math.floor(milliseconds / (1000 * 60))).padStart(2, "0")
      const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, "0")
      const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0")
      this.shadowRoot.replaceChildren(`${minutes}:${seconds}:${hundredths}`)

      // Schedule next update by awaiting an animation frame
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }
}
```

## Combining multiple Signals

It's possible to combine multiple sources of signals - for example combining internal and external signals to allow for
multiple flavors of API. Two or more signals can be combined into one using `AbortSignal.any()`, which creates a _new
signal_ that aborts when any of the given _signals_ abort. It's similar to `Promise.any()`, but for Signals.

A component can provide the more traditional `start()` and `stop()` APIs, as well allowing signals to be passed via
`start({ signal })`. Making use of internal and external signals, with `AbortSignal.any()`:

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  shadowRoot = this.attachShadow({ mode: "open" })

  #startStopController = null

  async start({ signal } = {}) {
    // Stop the current task if there was one
    this.stop()

    // Create a new internal controller
    this.#startStopController = new AbortController()
    // Collect all valid signals
    const signals = [this.#startStopController.signal, signal].filter((s) => s)

    const signal = AbortSignal.any(signals)

    // Loop until `signal.aborted` is `true`.
    while (!signal.aborted) {
      // Automatically stop when this element is disconnected
      if (!this.isConnected) return

      const milliseconds = Date.now() - this.#start
      const minutes = String(Math.floor(milliseconds / (1000 * 60))).padStart(2, "0")
      const seconds = String(Math.floor((milliseconds / 1000) % 60)).padStart(2, "0")
      const hundredths = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, "0")
      this.shadowRoot.replaceChildren(`${minutes}:${seconds}:${hundredths}`)

      // Schedule next update by awaiting an animation frame
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }

  stop() {
    this.#startStopController?.abort()
  }
}
```

### Using Signals to clean up `disconnectedCallback()`

_Web Components_ that use the `connectedCallback()` lifecycle hook to set things up typically want to tear down those
same things in the `disconnectedCallback()`, but this can sometimes get a little unwieldy. Instead of mirroring
everything in `disconnectedCallback()`, using an `AbortController` can reduce `disconnectedCallback()` down to one line
of code. APIs called in `connectedCallback` will get given the _signal_, and `disconnectedCallback()` only calls
`abort()`.

APIs like `addEventListener` accept a `signal` option. When an _Event Listeners_ _signal_ is _aborted_, the _event
listener_ will be removed (just like calling `removeEventListener`).

```js
class StopWatchElement extends HTMLElement {
  static define(tag = "stop-watch") {
    customElements.define(tag, this)
  }

  // Set up the class field, but set it to null for now
  #connectedController = null

  connectedCallback() {
    // Make a new AbortController and extract the `signal` property
    const { signal } = (this.#connectedController = new AbortController())

    // Pass the signal to addEventListener
    this.ownerDocument.addEventListener("keypress", this, { signal })
    this.ownerDocument.addEventListener("mouseenter", this, { signal })
    this.ownerDocument.addEventListener("mouseleave", this, { signal })
  }

  disconnectedCallback() {
    // All cleanup happens with this one line
    this.#connectedController?.abort()

    // No need to do any of this:
    // this.ownerDocument.removeEventListener("keypress", this)
    // this.ownerDocument.removeEventListener("mouseenter", this)
    // this.ownerDocument.removeEventListener("mouseleave", this)
  }
}
```

### Using signals to cancel old requests

A common task that components might do is turn a user action into a network fetch. For example a search input might
query the database every time a character is pressed. If the user types into the input fast enough, old network requests
might stay _in-flight_, saturating the network and delaying newer requests from coming in, making the component feel
sluggish. A good way to combat this is to cancel stale requests by using signals:

```js
class SearchInputElement extends HTMLInputElement {
  static define(tag = "search-input") {
    customElements.define(tag, this, { extends: "input" })
  }

  src = new URL("/search")

  connectedCallback() {
    this.addEventListener("input", this)
  }

  // Set up the class field, but set it to null for now
  #fetchController = null

  async handleEvent() {
    // Abort the old fetch, if the controller exists
    this.#fetchController?.abort()

    // Create a new one and extract the signal
    const { signal } = (this.#fetchController = new AbortContoller())

    const src = new URL(this.src)
    src.searchParams.add("q", this.value)

    // Perform the fetch, make sure to pass it the signal so it can be aborted
    try {
      const res = await fetch(src, { signal })
    } catch (error) {
      // An aborted network fetch will throw, so we should return early
      if (signal.aborted) return

      throw error
    }

    if (res.ok) {
      this.list.append(await res.text())
    }
  }
}
```
