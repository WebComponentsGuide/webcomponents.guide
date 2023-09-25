---
title: Classes
order: 2
---

Modern JavaScript includes classes which allow you to concisely define a blueprint for creating objects that include
their own API. Classes are really useful as they can maintain their own private state, have their own private
subroutines, and also expose public state and subroutines for other code to call.

Classes are important for _Web Components_, because most of the time you'll want to use a class to define their logic.

Here's a quick tour of how classes work, but you can [read much more about classes and how they work on MDN][classes].

### Defining a class

Classes can be defined using the `class` keyword and providing a name. You can also define a class using a class
_expression_, as long as it's passed to a function or assigned to a variable.

```js
class Point {}

const Point = class {}

console.log(class {})
```

A class can then be instantiated with the `new` keyword, and can be checked with `instanceof`:

```js
// creates a new `Point` object
const mypoint = new Point()

// Check `mypoint` is an `instanceof` `Point`
console.assert(mypoint instanceof Point)
```

### Defining a public API

Classes can have public properties, and methods to give them features which other code can use. They can also have well
known methods that get automatically called during certain events:

```js
class Point {
  // Public "Fields"
  x = 0
  y = 0

  // This is called whenever `new Point()` is called
  constructor(x, y) {
    // A class instance refers to itself with `this`.
    this.x = x
    this.y = y
  }

  // Methods
  translate(deltaX, deltaY) {
    this.x += deltaX
    this.y += deltaY
  }

  equals(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y
  }

  // This is a "well known" method, called whenever
  // a `Point` is converted to a `String`
  toString() {
    return `(${x}, ${y})`
  }
}

const mypoint = new Point(1, 1)
mypoint.translate(5, 5)

console.assert(mypoint.equals(new Point(6, 6)))

// String(mypoint) is the equivalent of mypoint.toString()
console.assert(String(mypoint) === "(6, 6)")
```

Public fields are _initialized_ every time the class is. If you're familiar with JavaScript classes but haven't used
Class Fields before, then you can imagine them as lines of code that would execute in the class `constructor`. The
following two classes are functionally equivalent:

```js
class PublicFields {
  x = 0
  y = 0
}

class ConstructorFields {
  constructor() {
    this.x = 0
    this.y = 0
  }
}
```

This is important because these fields don't just have to have primitive values in them. You could call a function, or
even refer to `this` within a public field, and it will be executed whenever the class is constructed:

```js
class RandomField {
  x = Math.random()
}
const first = new RandomField()
const second = new RandomField()

console.assert(first.x !== second.x)
```

One final thing to think about _public fields_: a class will not know when they change. If knowing when a public field
changes is important, then you might want to read on to see how to combine _private fields_ with _derived state_.

### Defining _derived_ state

Classes can also use `get <name>()` or `set <name>()` to _derive_ new state, using meta properties. These methods act
like properties but you can add custom logic to them, defining new properties that use existing class data to generate a
value. If you define a `get <name>` without a `set <name>`, then the property will be **read only**.

```js
class Point {
  x = 0
  y = 0

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get isEmpty() {
    return this.x === 0 && this.y === 0
  }
}

const mypoint = new Point(0, 0)

console.assert(mypoint.isEmpty)

// This will throw an Error
mypoint.isEmpty = false
```

### Defining a private API

Classes can also have "Private" state and private methods, which cannot be called outside of the class.

```js
class CaseChange {
  #original = ""
  constructor(original) {
    this.#original = original
  }

  upper() {
    return this.#original.toUpperCase()
  }

  lower() {
    return this.#original.toLowerCase()
  }
}

const myupper = new CaseChange("Hello World")

console.assert(myupper.upper() === "HELLO WORLD")
console.assert(myupper.lower() === "hello world")

// This will throw an error
// private fields can't be used outside a class
console.log(myupper.#original)

// This will also throw an error
myupper.#original = "Hello"
```

Private fields work like public fields with regards to evaluation. They get evaluated with the class _instantiation_, so
`this` will refer to the class instance, and function calls will be called each time the class is constructed.

### _Read only fields_ using private state & public APIs

_Private fields_ are useful to have a value that the internals of a class can change, but that outside code cannot. It's
also often useful to allow outside code to _read_ a classes _private state_, but not change it. To do this you can
combine _private state_ with _public getters_:

```js
class Sentence {
  #original = ""
  constructor(original) {
    this.#original = original
  }

  get sentence() {
    return this.#original
  }

  get firstWord() {
    return this.#original.split(" ").at(0)
  }
}

const mysentence = new Sentence("Hello World.")

console.assert(mysentence.sentence === "Hello World.")
console.assert(mysentence.firstWord === "Hello")

// This will throw an error, accessors that only define
// a get method cannot be set.
myupper.sentence = "Hello Universe"

// This will also throw an error
myupper.firstWord = "Hola"
```

### _Reactive fields_ using private state & public APIs

A _public field_ can be changed on a class instance, and the class will not know when that happens. To make a class
react to a change in its public fields, you can combine a private field with `get` and `set` functions, like so:

```js
class Timer {
  #startTime = Date.now()

  get startTime() {
    return this.#startTime
  }

  set startTime(newTime) {
    this.#startTime = newTime
    this.resetTimer()
  }

  resetTimer() {
    console.log("Timer has been reset")
  }
}

const mytimer = new Timer()

console.assert(mytimer.startTime === Date.now())

mytimer.startTime = 0

// Will log "Timer has been reset"
```

This pattern can also be useful for validating values when they are being set.

### Extending a class

Classes can extend from other classes. The extended class will receive all the parent classes methods and properties,
and it can define new methods and properties. The extended class cannot access private state or private methods from the
parent class. If an extended class overrides the class constructor, it must call the original constructor by using
`super()`. If the extended class overrides a method that exists on the parent class, it can optionally call
`super.<method>()`.

```js
class Point {
  constructor(x, y) {
    this.x = 0
    this.y = 0
  }

  equals(otherPoint) {
    return this.x === otherPoint.x && this.y === otherPoint.y
  }
}

class Point3D extends Point {
  constructor(x, y, z) {
    super(x, y)
    this.z = z
  }

  equals(otherPoint) {
    return super.equals(otherPoint) && this.z === otherPoint.z
  }
}
```

You can [read much more about classes and how they work on MDN][classes].

[classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
