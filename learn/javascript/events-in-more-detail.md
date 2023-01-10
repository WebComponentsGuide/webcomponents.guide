---
title: Events in more detail
order: 4
---

In the [previous section][events] we learned about `EventTarget` - the class that gives us an event system, with
`addEventListener` and `dispatchEvent`. We also learned about the `Event` class which `EventTarget` takes and propagates
to all listeners.

In this section we'll learn about these features in more detail, covering some more advanced topics, techniques, and
potential pitfalls you'll need to watch out for. It's a good idea to make sure you've got a good understanding of
everything covered in the [previous section][events] before reading on.

#### Adding multiple listeners

The [previous section][events] showed how you can add an _Event listener_ with `.addEventListener()`, but you can add
more than one. In fact, you can use a single function to listen to multiple different event types, if they each have
different names.

Listeners are passed the `Event` object, so the listener function can use that to determine which event type the listener
was called on, using `.type`:

```js
const target = new EventTarget()

function logEvent(event) {
  if (event.type === "start") {
    console.log("timer started!")
  } else if (event.type === "stop") {
    console.log("timer stopped!")
  } else if (event.type === "pause") {
    console.log("timer paused!")
  }
}

target.addEventListener("start", logEvent)
target.addEventListener("stop", logEvent)
target.addEventListener("pause", logEvent)
```

Bear in mind that listeners will only be added once for each function, so if you call `addEventListener` with the same
type and the same function multiple times, it'll only add one. If you want multiple event listeners for a single event
type, you'll need multiple event listeners:

```js
const target = new EventTarget()

function logEvent(event) {
  console.log(`saw event: ${event.type}`)
}

function anotherLogFunction(event) {
  console.log(`saw event: ${event.type}`)
}

// adds the event listener logEvent to the 'start' event
target.addEventListener("start", logEvent)

// this line does nothing because
// logEvent is already added for 'start'
target.addEventListener("start", logEvent)

// this line does nothing either,
// logEvent is already added for 'start'
target.addEventListener("start", logEvent)

// this line adds the event listener
// anotherLogFunction to the 'start' event
target.addEventListener("start", anotherLogFunction)
```

#### Removing Event Listeners with `removeEventListener`

`EventTarget` comes with `removeEventListener()`, which takes the same arguments as `addEventListener()`, but as the
name might suggest, it stops the listener from being called by removing it from the internal list of listeners. To use
`removeEventListener()` you give it the same arguments as `addEventListener()`:

```js
const target = new EventTarget()

function logEvent(event) {
  console.log(`saw event: ${event.type}`)
}

target.addEventListener("start", logEvent)

// undo the `addEventListener` with `removeEventListener`
target.removeEventListener("start", logEvent)
```

An important caveat to point out here is that _function expressions_ are unique, so if you pass a function directly to
`addEventListener` then typing that function out again won't work, as it's a different function. You can _only_ remove
event listeners this way if you have a _reference_ to the original function that was added:

```js
const target = new EventTarget()

target.addEventListener("start", (event) => {
  console.log(event)
})

// this wont do anything because this is a new function
target.removeEventListener("start", (event) => {
  console.log(event)
})
```

This is also true of functions that _copy functions_, like `.bind()`. If you see code like `myfunction.bind()` this
creates a _new copy_ of the function each time, and so this won't work either:

```js
const target = new EventTarget()

const logger = {
  log() { ... }
}

target.addEventListener('start', logger.log.bind(logger))

// this wont do anything because `.bind` copies the function
target.removeEventListener('start', logger.log.bind(logger))
```

In these instances, you can use a `signal` instead:

#### Removing Event Listeners with a Signal

Another very useful _built-in_ object is the `AbortController`. `AbortController` acts like a messenger to tell certain
code to stop an operation. An `AbortController` instance has a `.signal` which you can pass to various APIs and an
`.abort()` function which, when called, makes the `.signal` abort.

`.addEventListener()` accepts a `signal` option, and when the controller's `.abort()` is called, it will automatically
call `.removeEventListener()` on your behalf. The `AbortController` pattern is really useful if you're registering lots
of _event listeners_ that you want to stop all at once, or if you're registering event listeners where you don't have a
_reference_ to the function, for example using _copied functions_ (like that from `.bind()`) or _function expressions_.
Whenever `.abort()` is called, it and event listeners that were added with the controller's `signal` will get removed:

```js
const target = new EventTarget()

const controller = new AbortController()

const logger = { log() { ... } }


target.addEventListener(
  'start',
  logger.log.bind(logger),

  // Pass the "signal" using the third options argument
  { signal: controller.signal }
)

target.addEventListener(
  'start',
  (event) => { console.log('Timer started!') },

  // Pass the "signal" using the third options argument
  { signal: controller.signal }
)

// Remove all events that were given `controller.signal`:

controller.abort()
```

### Event Listener Objects

So far we've covered how to add event listener functions, but it is also possible to pass an _object_ to
`addEventListener`. The passed _object_ should have a `handleEvent()` function, and whenever `dispatchEvent()` is called
the object's `handleEvent()` function will be called instead.

This might not sound super useful, but one big benefit of doing this is that it keeps the `this` _context_, which might
otherwise get lost. Consider the following code:

```js
class Logger {
  log(message) {
    this.stream.write(message)
  }
}

const logger = new Logger()

const target = new EventTarget()

target.addEventListener("start", logger.log)

target.dispatchEvent(new Event("start"))

// An Error will be raised
```

The above code causes an error because `logger.log` is passed by _value_ and consequently it loses its `this` _context_.
This is an unfortunate caveat with functions in JavaScript. Before JavaScript got _arrow functions_, a lot of code used
to call `.bind` to get around this. Newer code might use an arrow function instead. Both of these patterns have their
own problems though, mostly to do with losing the _function reference_, which makes them harder to clean up (see above
about removing event listeners):

```js
target.addEventListener("start", logger.log.bind(logger))
target.addEventListener("start", (event) => logger.log(event))
```

Another way around this is to pass the entire `logger` object into `addEventListener`. This would only work if `logger`
had a `handleEvent` function. Here's an example of what that might look like:

```js
class Logger {
  handleEvent(event) {
    this.log(event)
  }

  log(message) {
    this.stream.write(message)
  }
}

const logger = new Logger()

const target = new EventTarget()

// Pass in the entire object
target.addEventListener("start", logger)

target.dispatchEvent(new Event("start"))
```

This code avoids the issues of using _arrow functions_ or _copied functions_ like that of `.bind()`, but it does incur
the cost of having to implement `handleEvent`, and so it's not always straightforward to implement. It might be
preferable to use `AbortController` instead, which works around the issues of _arrow functions_ and _copied functions_.

### Default behaviors

A good pattern for utilizing event listeners is to have your code behave a certain way by default, but give other code
the option of "opting out" of the _default behavior_. This is really useful for applications that want to customize what
happens after a certain event has been triggered.

The `Event` class has an option to to declare an event is `cancelable`, which implies it has a _default behavior_ that
can be stopped. An event listener can _prevent the default behavior_ by calling `.preventDefault()`, which tells the
_dispatching_ code to not execute the _default behavior_.

Looking at our Timer class again, let's say it has an alarm functionality that gets triggered every 60 seconds. We want
something to happen without having to write any extra code, so by default we can `alert` with a message. That will be
the _default behavior_. A listener can call `preventDefault()` and stop the default behavior from executing, and
customize the behavior by doing something different.

```js
class Timer extends EventTarget {
  start() {
    this.dispatchEvent("start")
    setTimeout(() => this.#tick(1), 1000)
  }

  #tick(times) {
    // timer has ticked an exact multiple of 60 (e.g. 60, 120, 180)
    if (times % 60 === 0) {
      // The event needs to add the `cancelable: true` option
      // for `preventDefault() to work
      const event = new Event("alarm", { cancelable: true })

      // `dispatchEvent` will return `false` if a cancelable event
      // had `preventDefault()` called by a listener
      const shouldRunDefault = this.dispatchEvent(event)

      if (shouldRunDefault) {
        alert("A minute has passed!")
      }
    }
    setTimeout(() => this.#tick(times + 1), 1000)
  }
}

const mytimer = new Timer()
mytimer.start()

mytimer.addEventListener("alarm", (event) => {
  // prevent the default alert() from running
  event.preventDefault()

  // use our own special `customAlert()` function instead:
  customAlert("A minute has passed!")
})
```

If you have listeners that customize how a cancelable event behaves, a listener can check if a previous listener has
called `preventDefault()`. By checking the `defaultPrevented` property, listeners can avoid doing their own work which
might duplicate the work of another event listener:

```js
mytimer.addEventListener("alarm", (event) => {
  if (event.defaultPrevented) {
    console.log("Something else has prevented the default")
  } else {
    console.log("Default has not been prevented yet.")

    event.preventDefault()
    customAlert("A minute has passed!")
  }
})
```

### Stopping Propagation

An _event listener_ has a little bit of control about how an event propagates through the system. If an _event listener_
wants exclusive control of the Event, it can call `.stopImmediatePropagation()` and that will end the event and stop it
from calling further _event listeners_. Events get called in the order they were added, so _event listeners_ that were
added **before** a listener that stops propagation will still trigger, but all listeners **after** won't be called:

```js
mytimer.addEventListener("start", () => {
  console.log("always called!")
})

mytimer.addEventListener("start", (event) => {
  console.log("always called but stops further listeners")

  event.stopImmediatePropagation()
})

mytimer.addEventListener("start", (event) => {
  console.log("never called, as propagation was stopped")
})
```

[events]: /learn/javascript/events
