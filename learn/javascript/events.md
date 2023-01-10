---
title: Event Basics
order: 3
---

Web browsers (and server side engines like [NodeJS][node] and [Deno][deno]) include an Event API which has become a
foundational concept in JavaScript, and is particularly important when we talk about Web Components. The two classes
that drive all of these events are the `Event` class, and the `EventTarget` class.

This section will go over the concepts of Events, the basics of the `EventTarget` and `Event` classes, and the next
section will touch on some more advanced topics but - as always - if you're interested in learning more there are many
great pages on MDN that cover Events:

- [Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [The EventTarget API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [The Event API](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [Web Browser Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

### What are events?

Events are a way to allow two different pieces of code to communicate with each other, without having to import or
otherwise know about their APIs - instead they just need to know about the Event APIs. Using events, your code can
notify other parts of your application when a change has happened.

A really nice feature of events is that they're _loosely coupled_. Code that _dispatches_ events doesn't need to worry
about whether or not there are any listeners, it can just dispatch an event, and if there are no listeners then nothing
will happen. An event can have lots of listeners too, and when an event gets _dispatched_ it will call each listener in
the order that they were added.

A single class can have as many _different_ events as it wants, and call them in any order or at any time. All events
are keyed by `type`, so for example a Timer class could have a `'start'` event for whenever the timer starts, a `'stop'`
event for whenever the time stops, and a `'tick'` event for every second that passes while the timer is running.
Advanced logic like this allows for some really powerful systems.

Whenever these events are _dispatched_, a new piece of code can _listen_ for the events by using the same Event `type`,
for example a piece of code can listen to all `'start'` events to be notified when a the Timer starts. Rather than
continuously ask "has the timer started?", the code setting up the _listener_ says "notify me when there's a start
event". The code responsible for starting the timer can then _dispatch_ the start Event that will notify all listeners.

### What does the `EventTarget` target class do?

`EventTarget` is a special class that exists in the browser, and is responsible for the API to _dispatch_ Events, and to
attach _listeners_ for Events. Here's what the definition for the `EventTarget` class looks like:

```js
class EventTarget {

  addEventListener(type, listener, options)

  removeEventListener(type, listener, options)

  dispatchEvent(event)

}
```

#### Sub classing Event Target

Everything that extends from `EventTarget` gets these methods, and can use them. `HTMLElement` extends from
`EventTarget` which means all _Built-in elements_ and any Web Components you create will also extend from it too. Lots
of _built-in objects_ extend it too - it's not just for elements. Global like `window` and `document` also extend from
`EventTarget`. A single browser session can send hundreds of events during a typical web page session. For example
almost all elements will dispatch events for mouse movement and clicks, key presses, touch events (if your device has a
touch screen) and more. These events provide a safe, scalable, and uniform way for developers to write interactive apps.

To make a subclass of `EventTarget` you'll need to make your class `extends EventTarget` (or it can `extends` another
class that itself extends `EventTarget`). Here's an example of a timer class that extends `EventTarget`:

```js
class Timer extends EventTarget {}

const mytimer = new Timer()

// Now these are all available:
mytimer.addEventListener()
mytimer.dispatchEvent()
mytimer.removeEventListener()
```

#### Listening to Events

An `EventTarget` includes the `addEventListener()` method, which can be called to _listen_ to events. It expects two
arguments, with an optional third argument. The first argument is `type`, which is a string of the event type, for
example `'click'`. The second is the callback `listener` function, this is a function that gets called whenever the
event is _dispatched_. The _listener_ function might never be called, it might be called once, twice, or even hundreds
of times, it all depends on how often the event is dispatched. Lastly you can pass in `options`, which allows advanced
customization of event listeners. For now let's focus on the first two arguments. Here's an example of adding an event
listener:

```js
const mytimer = new Timer()

// This will call `console.log` whenever the
// `start` event type is dispatched
mytimer.addEventListener("start", (event) => {
  console.log("something started!")
})
```

#### Dispatching Events

An `EventTarget` also has a `dispatchEvent()` method, which can be called to run attached event listeners. It takes one
argument, which is an `Event` instance. Every time `dispatchEvent()` is called, the `EventTarget` will go through the
list of _listeners_ that have been added (via `addEventListener()`) and if the `name` matches the Events name, then the
`listener` will be called. Going back to the `Timer` example, let's make some methods that _dispatch_ events and add
some code to listen to them:

```js
class Timer extends EventTarget {
  start() {
    this.dispatchEvent(new Event("start"))
  }

  pause() {
    this.dispatchEvent(new Event("paused"))
  }

  unpause() {
    this.dispatchEvent(new Event("unpaused"))
  }

  stop() {
    this.dispatchEvent(new Event("stop"))
  }
}

const mytimer = new Timer()

mytimer.addEventListener("start", () => console.log("timer started!"))
mytimer.addEventListener("stop", () => console.log("timer stopped!"))

mytimer.start()
// logs: "timer started!"

mytimer.pause()
// nothing is logged because there are no 'paused' listeners

mytimer.stop()
// logs "timer stopped!"
```

### What does the `Event` class do?

The `Event` class represents an Event that all listeners will be passed as the Event propagates through the system. The
reason it's an object, rather than a `string` is that it contains lots of information about the event, and it can be
extended to add more info. The `Event` class requires a `type` argument that will set the `.type` of the event object.
This is the most important piece of information as it determines which listeners get called. The `Event` class also
takes an optional second argument which is the _event options_. Let's just focus on the `.type` for now. You can read
more about the second options argument in the next section [Events in detail][events-in-detail].

It's common to subclass `Event` for different types that have more specific properties. For example the built-in
`KeyboardEvent` is used for events like `'keypress'`, `'keydown'`, and `'keyup'` and has additional properties such as
`.key` which describes the keyboard key related to the event. Another example, the built-in `MouseEvent`, has a
`.button` property instead, which describes which mouse button was pressed.

You can extend from `Event` for your own classes, and add new properties or change the constructor to add or remove the
required arguments. Going back to the `Timer` class, let's add a `TickEvent` subclass which gets dispatched with every
second that passes while the Timer is running. Rather than using the standard `Event` class, our `TickEvent` can include
a `.count` property which represents the amount of ticks that have happened since the timer was started:

```js
class TickEvent extends Event {
  // Our TickEvent class only takes a count,
  // we hard code the .type
  constructor(count = 0) {
    // hardcode the .type of the element to 'tick'.
    super("tick")

    this.count = count
  }
}

class Timer extends EventTarget {
  start() {
    this.dispatchEvent("start")

    // Call #tick(1) after one second
    setTimeout(() => this.#tick(1), 1000)
  }

  #tick(times) {
    this.dispatchEvent(new TickEvent(times))

    // Call #tick(n + 1) after one second
    setTimeout(() => this.#tick(times + 1), 1000)
  }
}

const mytimer = new Timer()

mytimer.addEventListener("tick", (event) => {
  console.log(`timer has ticked ${event.count} times!`)
})

mytimer.start()
```

[node]: https://nodejs.org/en/
[deno]: https://deno.land/
[events-in-detail]: /learn/javascript/events-in-detail
