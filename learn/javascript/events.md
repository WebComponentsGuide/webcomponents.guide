---
title: Events
order: 3
---

Web browsers (and server side engines like [NodeJS][node] and [Deno][deno]) include an Event API which has become a
foundational concept in JavaScript, and is particularly important when we talk about Web Components. The two classes
that drive all of these events are the `Event` class, and the `EventTarget` class.

[node]: https://nodejs.org/en/
[deno]: https://deno.land/

### What are events?

Events are a way to allow two different pieces of code to communicate with each other, without having to import or
otherwise know about their APIs - instead they just need to know about the Event APIs. Using events, your code can
notify other parts of your applicaton when a change has happened.

A really nice feature of events is that they're _loosely coupled_. Code that _dispatches_ events doesn't need to
worry about whether or not there are any listeners, it can just dispatch an event, and if there are no listeners then
nothing will happen. An event can have lots of listeners too, and when an event gets _dispatched_ it will call each
listener in the order that they were added.

A single class can have as many _different_ events as it wants, and call them in any order or at any time. All events
are keyed by `type`, so for example a Timer class could have a `'start'` event for whenever the timer starts, a
`'stop'` event for whenever the time stops, and a `'tick'` event for every second that passes while the timer is
running. Advanced logic like this allows for some really powerful systems.

Whenever these events are _dispatched_, a new piece of code can _listen_ for the events by using the same Event
`type`, for example a piece of code can listen to all `'start'` events, to be notified when a the Timer starts. Rather
than continuously ask "has the timer started?", the code setting up the _listener_ says "notify me when there's a
start event" and the _dispatching_ can then notify all listeners.

All `HTMLElement`s inherit from `EventTarget` which is the API that drives events in JavaScript. _Built-in elements_
and objects like `window` send hundreds of events during a typical web page session. For example almost all elements
will dispatch events for mouse movement and clicks, key presses, touch events (if your device has a touch screen) and
more. These events provide a safe, scalable, and uniform way for developers to write interactive apps.


### What does the `EventTarget` target class do?

`EventTarget` is a special class that exists in the browser, and is responsible for the API to _dispatch_ and to
attach _listeners_ for events. Here's what the definition for the `EventTarget` class looks like:

```js
class EventTarget {

  addEventListener(type, listener, options)
  
  removeEventListener(type, listener, options)
  
  dispatchEvent(event)

}
```

#### Subclassing Event Target

Everything that subclasses `EventTarget` gets these methods, and can use them. To make a subclass of `EventTarget`
you'll need to make your class `extends EventTarget`. Here's an example of a timer class that extends `EventTarget`:

```js
class Timer extends EventTarget {
}

const mytimer = new Timer()

// Now these are all available:
mytimer.addEventListener()
mytimer.dispatchEvent()
mytimer.removeEventListener()
```

#### Listening to Events

A piece of code can call `addEventListener()` which expects three arguments. The first is `type` argument which is a
string of the event type, for example `'click'`. The second is the callback `listener` function, this is a function
that gets called whenever the event is _dispatched_. The _listener_ function might never be called, it might be called
once, twice, or even hundreds of times, it all depends on how often the event is dispatched. Lastly you can pass in
`options`, which allows advanced customisation of event listeners. Read more about the options below. Here's an
example of adding an event listener:

```js
const target = new EventTarget()

// This will call `console.log` whenever the `start` event type is dispatched
target.addEventListener('start', (event) => console.log('something started!'))
```

You can use a single function for multiple event listeners, if they each have different names:

```js
const target = new EventTarget()

function logEvent(event) {
  console.log(`saw event: ${event.type}`)
}

target.addEventListener('start', logEvent)
target.addEventListener('stop', logEvent)
target.addEventListener('pause', logEvent)
```

Bear in mind that listeners will only be added once for each function, so if you call `addEventListener` with the same
type and the same function multiple times, it'll only add one:

```js
const target = new EventTarget()

function logEvent(event) {
  console.log(`saw event: ${event.type}`)
}

function anotherLogFunction(event) {
  console.log(`saw event: ${event.type}`)
}

// adds the event listener logEvent to the 'start' event
target.addEventListener('start', logEvent)

// this line does nothing because logEvent is already added for 'start'
target.addEventListener('start', logEvent)

// this line does nothing either, logEvent is already added for 'start'
target.addEventListener('start', logEvent)

// adds the event listener anotherLogFunction to the 'start' event
target.addEventListener('start', anotherLogFunction)
```

#### Dispatching Events

Any piece of code can call `dispatchEvent()` on an event target. It takes one argument, which is an `Event` instance.
Every time `dispatchEvent()` is called, the `EventTarget` will go through the list of internal _listeners_ that have
subscribed (via `addEventListener()`) and if the `name` matches the Events name, then the `listener` will be called.
Going back to the `Timer` example, let's make some methods that _dispatch_ events and add some code to listen to them:


```js
class Timer extends EventTarget {

  start() {
    this.dispatchEvent(new Event('start'))
  }
  
  pause() {
    this.dispatchEvent(new Event('paused'))
  }
  
  unpause() {
    this.dispatchEvent(new Event('unpaused'))
  }
  
  stop() {
    this.dispatchEvent(new Event('stop'))
  }

}


const mytimer = new Timer()

mytimer.addEventListener('start', () => console.log('timer started!'))
mytimer.addEventListener('stop', () => console.log('timer stopped!'))


mytimer.start()
// logs: "timer started!"

mytimer.pause()
// nothing is logged because there are no 'paused' listeners

mytimer.stop()
// logs "timer stopped!"
```

### What does the `Event` class do?

The `Event` class takes a `type` argument that will set the `.type` of the event object. This is the most
important piece of information it determines which listeners get called. The `Event` class also takes a second,
optional argument, which is the _event options_. Take a look at the sections below which describe the event
options.

It's common to subclass `Event` for different types that have more specific properties. For example the built-in
`KeyboardEvent` is used for events like `'keypress'`, `'keydown'`, and `'keyup'` and has additional properties
such as `.key` which describes the keyboard key related to the event.

You can subclass your own event, which can add new properties or change the constructor and fix the `type`. Going
back to the `Timer` class, let's add a `TickEvent` subclass which gets dispatched with every second that passes
while the Timer is running:

```js
class TickEvent extends Event {

  constructor(count = 0) {
    super('tick') // fixes the event type to `tick`.
    this.count = count
  }

}

class Timer extends EventTarget {

  start() {
    this.dispatchEvent('start')
    setTimeout(() => this.#tick(1), 1000)
  }
  
  #tick(times) {
    this.dispatchEvent(new TickEvent(times))
    setTimeout(() => this.#tick(times + 1), 1000)
  }

}

const mytimer = new Timer()

mytimer.addEventListener('tick', event => console.log(`timer has ticked ${event.count} times!`)

mytimer.start()
```

### Advanced: Default behaviors

A good pattern for utilising event listeners is to have your code behave a certain way by default, but give
other code the option of "opting out" of the default behavior. This is really useful for applications that
want to customise what happens after a certain event has been triggered. 

Events allow you to dispatch an event that declares it has a _default behavior_, and a listener can _prevent
the default behavior_, which tells the _dispatching_ code to not execute the _default behaviour_.

Looking at our Timer class again, let's say it has an alarm functionality that gets triggered every 60
seconds. We want something to happen without having to write any extra code, so by default we can `alert`
with a message. That will be the _default behavior_. A listener can call `preventDefault()` and stop the
default behaviour from executing, and customise the behavior by doing something different!

```js
class Timer extends EventTarget {

  start() {
    this.dispatchEvent('start')
    setTimeout(() => this.#tick(1), 1000)
  }
  
  #tick(times) {
    // timer has ticked an exact multiple of 60 (e.g. 60, 120, 180)
    if (times % 60 === 0) {
    
      // The event needs to add the `cancelable: true` option
      // for `preventDefault() to work
      const event = new Event('alarm', { cancelable: true })
      
      // `dispatchEvent` will return `false` is a cancelable event
      // had `preventDefault()` called by a listener
      const runDefault = this.dispatchEvent(event)
      
      if (runDefault) {
        alert('A minute has passed!')
      }
    
    }
    setTimeout(() => this.#tick(times + 1), 1000)
  }

}

const mytimer = new Timer()
mytimer.start()

mytimer.addEventListener('alarm', event => {
  
  // prevent the default alert() from running
  event.preventDefault()
  
  // use our own special `customAlert()` function instead:
  customAlert('A minute has passed!')
  
})
```

### Event Bubbling 
{% stub %}
