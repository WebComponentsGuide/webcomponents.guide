---
title: Events
order: 3
---

Web browsers (and server side engines like [NodeJS][node] and [Deno][deno]) include an Event API which has become a
foundational concept in JavaScript, and is particularly important when we talk about Web Components. The two classes
that drive all of these events are the `Event` class, and the `EventTarget` class.

This section will go over the concepts of Events, the basics of the `EventTarget` and `Event` classes, and touch on
some more advanced topics but - as always - if you're interested in learning more there are many great pages on MDN
that cover Events:

 - [Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
 - [The EventTarget API](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
 - [The Event API](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 - [Web Browser Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

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
`type`, for example a piece of code can listen to all `'start'` events to be notified when a the Timer starts. Rather
than continuously ask "has the timer started?", the code setting up the _listener_ says "notify me when there's a
start event". The code responsible for starting the timer can then _dispatch_ the start Event that will notify all
listeners.

### What does the `EventTarget` target class do?

`EventTarget` is a special class that exists in the browser, and is responsible for the API to _dispatch_ Events, and
to attach _listeners_ for Events. Here's what the definition for the `EventTarget` class looks like:

```js
class EventTarget {

  addEventListener(type, listener, options)
  
  removeEventListener(type, listener, options)
  
  dispatchEvent(event)

}
```

#### Subclassing Event Target

Everything that extends from `EventTarget` gets these methods, and can use them. `HTMLElement` extends from
`EventTarget` which means all _Built-in elements_ and any Web Components you create will also extend from it too. Lots
of _built-in objects_ extend it too - it's not just for elements. Global like `window` and `document` also extend from
`EventTarget`. A single browser session can send hundreds of events during a typical web page session. For example almost
all elements will dispatch events for mouse movement and clicks, key presses, touch events (if your device has a touch
screen) and more. These events provide a safe, scalable, and uniform way for developers to write interactive apps.

To make a subclass of `EventTarget` you'll need to make your class `extends EventTarget` (or it can `extends` another class
that itself extends `EventTarget`). Here's an example of a timer class that extends `EventTarget`:

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
`options`, which allows advanced customisation of event listeners. For now let's focus on the first two arguments.
Here's an example of adding an event listener:

```js
const target = new EventTarget()

// This will call `console.log` whenever the
/ `start` event type is dispatched
target.addEventListener('start', (event) => {

  console.log('something started!')
  
})
```

You can use a single function to listen to multiple different event types, if they each have different names. The
function will be given an `Event` object that has a `.type` property which can be used to determine which event
listener was called:

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

// this line does nothing because
// logEvent is already added for 'start'
target.addEventListener('start', logEvent)

// this line does nothing either,
// logEvent is already added for 'start'
target.addEventListener('start', logEvent)

// this line adds the event listener
// anotherLogFunction to the 'start' event
target.addEventListener('start', anotherLogFunction)
```

#### Removing Event Listeners with `removeEventListener`

`EventTarget` comes with `removeEventListener()`, which takes the same arguments as `addEventListener()`, but as the
name might suggest, it stops the listener from being called by removing it from the internal list of listeners. To
use `removeEventListener()` you give it the same arguments as `addEventListener()`:

```js
const target = new EventTarget()

function logEvent(event) {
  console.log(`saw event: ${event.type}`)
}

target.addEventListener('start', logEvent)

// undo the `addEventListener` with `removeEventListener`
target.removeEventListener('start', logEvent)
```

An important caveat to point out here is that _function expressions_ are unique, so if you pass a function directly
to `addEventListener` then typing that function out again won't work, as it's a different function. You can _only_
remove event listeners this way if you have a _reference_ to the original function that was added:

```js
const target = new EventTarget()

target.addEventListener('start', (event) => {
  console.log(event)
})

// this wont do anything because this is a new function!
target.removeEventListener('start', (event) => {
  console.log(event)
})
```

This is also true of functions that _copy functions_, like `.bind()`! If you see code like `myfunction.bind()` this
creates a _new copy_ of the function each time, and so this won't work either:

```js
const target = new EventTarget()

const logger = {
  log() { ... }
}
  
target.addEventListener('start', logger.log.bind(logger))

// this wont do anything because `.bind` copies the function!
target.removeEventListener('start', logger.log.bind(logger))
```

In these instances, you can use a `signal` instead:

#### Removing Event Listeners with a Signal

Another very useful _built-in_ object is the `AbortController`. `AbortController` acts like a messenger to tell certain
code to stop an operation. An `AbortController` instance has a `signal` which you can pass to various APIs and an
`abort()` function which, when called, makes the `signal` abort.

`addEventListener` accepts a `signal` option, and when the controller's `.abort()` is called, it will automatically call `removeEventListener` on your behalf. The `AbortController` pattern is really useful if you're registering lots of
_event listeners_ that you want to stop all at once, or if you're registering event listeners where you don't have a
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

#### Dispatching Events

Any piece of code can call `dispatchEvent()` on an event target. It takes one argument, which is an `Event` instance.
Every time `dispatchEvent()` is called, the `EventTarget` will go through the list of _listeners_ that have been added
(via `addEventListener()`) and if the `name` matches the Events name, then the `listener` will be called. Going back to
the `Timer` example, let's make some methods that _dispatch_ events and add some code to listen to them:


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
important piece of information as it determines which listeners get called. The `Event` class also takes an optional
second argument which is the _event options_. Let's just focus on the `.type` for now. You can read more about the
second options argument further down below.

It's common to subclass `Event` for different types that have more specific properties. For example the built-in
`KeyboardEvent` is used for events like `'keypress'`, `'keydown'`, and `'keyup'` and has additional properties
such as `.key` which describes the keyboard key related to the event.

You can extend from `Event` for your own classes, and add new properties or change the constructor to fix the
`type` or options. Going back to the `Timer` class, let's add a `TickEvent` subclass which gets dispatched with every
second that passes while the Timer is running:

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

mytimer.addEventListener('tick', (event) => {

  console.log(`timer has ticked ${event.count} times!`)
  
})

mytimer.start()
```

### Advanced: Default behaviors

A good pattern for utilising event listeners is to have your code behave a certain way by default, but give
other code the option of "opting out" of the _default behavior_. This is really useful for applications that
want to customise what happens after a certain event has been triggered. 

The `Event` class has an option to to declare an event is `cancelable`, which implies it has a _default
behavior_ that can be stopped. An event listener can _prevent the default behavior_ by calling
`.preventDefault()`, which tells the _dispatching_ code to not execute the _default behaviour_.

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
      
      // `dispatchEvent` will return `false` if a cancelable event
      // had `preventDefault()` called by a listener
      const shouldRunDefault = this.dispatchEvent(event)
      
      if (shouldRunDefault) {
        alert('A minute has passed!')
      }
    
    }
    setTimeout(() => this.#tick(times + 1), 1000)
  }

}

const mytimer = new Timer()
mytimer.start()

mytimer.addEventListener('alarm', (event) => {
  
  // prevent the default alert() from running
  event.preventDefault()
  
  // use our own special `customAlert()` function instead:
  customAlert('A minute has passed!')
  
})
```

If you have listeners that customise how a cancelable event behaves, a listener can check if a previous
listener has called `preventDefault()`. By checking the `defaultPrevented` property, listeners can avoid
doing their own work which might duplicate the work of another event listener:

```js

mytimer.addEventListener('alarm', (event) => {

  if (event.defaultPrevented) {
    console.log('Something else has prevented the default')

  } else {
    console.log('Default has not been prevented yet.')
    
    event.preventDefault()
    customAlert('A minute has passed!')
  }

})
```

### Advanced: Event Listener Objects

So far we've covered how to add event listener functions, but it is also possible to pass an _object_ to
`addEventListener`. The passed _object_ should have a `handleEvent()` function, and whenever `dispatchEvent()`
is called the object's `handleEvent()` function will be called instead.

This might not sound super useful, but one big benefit of doing this is that it keeps the `this` _context_,
which might otherwise get lost. Consider the following code:

```js
class Logger {

  log(message) {
    this.stream.write(message)
  }

}

const logger = new Logger()

const target = new EventTarget()

target.addEventListener('start', logger.log)

target.dispatchEvent(new Event('start'))

// Oh no! An Error!
```

The above code causes an error because `logger.log` is passed by _value_ and consequently it loses its `this`
_context_. This is an unfortunate caveat with functions in JavaScript. Before JavaScript got _arrow functions_,
a lot of code used to call `.bind` to get around this. Newer code might use an arrow function instead. Both of
these patterns have their own problems though, mostly to do with losing the _function reference_, which makes
them harder to clean up (see above about removing event listeners):

```js
target.addEventListener('start', logger.log.bind(logger))
target.addEventListener('start', (event) => logger.log(event))
```

Another way around this is to pass the entire `logger` object into `addEventListener`. This would only work if
`logger` had a `handleEvent` function. Here's an example of what that might look like:

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

// Pass in the entire object!
target.addEventListener('start', logger)

target.dispatchEvent(new Event('start'))
```

This code avoids the issues of using _arrow functions_ or _copied functions_ like that of `.bind()`, but it does
incur the cost of having to implement `handleEvent`, and so it's not always straightforward to implement. It
might be preferable to use `AbortController` instead, which works around the issues of _arrow functions_ and
_copied functions_.

### Advanced: Capturing events

{% stub %}

### Advanced: Event Bubbling 

{% stub %}
