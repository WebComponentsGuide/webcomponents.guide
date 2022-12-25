---
title: Classes
order: 2
---

Modern JavaScript includes classes which allow you to concisely define a template for creating objects that include
their own API. Classes are really useful as they can maintain their own private state, have their own private
subroutines, and also expose public state and subroutines for other code to call.

Classes are important for Web Components, because most of the time you'll want to use a class to

Here's a quick tour of how classes work, but you can [read much more about classes and how they work on MDN][classes].

### Defining a class

{% include "support-table.html" title: "Classes", feature: compat.javascript.classes.__compat %}

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

{% include "support-table.html" title: "Class Public Fields", feature: compat.javascript.classes.public_class_fields %}

Classes can be given public properties, and methods to give them features which other code can use. They can also have
special well known methods that get automatically called during certain events:

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

### Defining _derived_ state

Classes can also use `get <name>()` or `set <name>()` to _derive_ new state, using meta properties. These methods act
like properties but you can add custom logic to them, defining new properties that use existing class data to generate a
value. If you define a `get <name>` without a `set <name>`, then the property will be **readonly**.

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

// This will throw an Error!
mypoint.isEmpty = false
```

### Defining a private API

{% include "support-table.html" title: "Class Private Fields", feature: compat.javascript.classes.private_class_fields %}
{% include "support-table.html" title: "Class Private Methods", feature: compat.javascript.classes.private_class_methods %}

Classes can also have "Private" state and private methods, which cannot be called outside of the class.

```js
class Upper {
  #original = ""
  constructor(original) {
    this.#original = original
  }

  #uppercase() {
    return this.#original.toUpperCase()
  }

  get value() {
    return this.#uppercase()
  }
}

const myupper = new Upper("Hello World")

console.assert(myupper.value === "HELLO WORLD")

// This will throw an error:
myupper.#original = "Hello"

// This will throw an error too:
myupper.#uppercase()
```

### Extending a class

{% include "support-table.html" title: "Extending Classes", feature: compat.javascript.classes.extends %}

Classes can extend from other classes. The extended class will receive all of the parent classes methods and properties,
and it can define new methods and properties. The extended class cannot access private state or private methods from the
parent class. If an extended class overrides the class constructor, it must call the original constructor by using
`super()`. If the extended class overrides a method that exists on the parent class, it can optionally call
`super<method>()`.

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
