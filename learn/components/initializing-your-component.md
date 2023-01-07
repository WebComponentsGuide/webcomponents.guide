---
title: Initializing Your Component
order: 5
---

Components can have many things that make them useful, for example styles, templates, or other information. Some
components might keep a memory of things - often called _state_. All of these things need to be initialized
somehow. There's several ways to set this information up, and you will likely use a combination of these
techniques when building a component:


### Private State

Components might have some _private state_. State often needs to be _private_ to prevent code from outside of the
component from being able to manipulate it. For example a timer component might need to keep track of the start
time. Using a _Private Field_ can be good for this state:

```js
class MyComponent extends HTMLElement {
  static define(tag = "my-component") {
    customElements.define(tag, this)
  }
  
  #time = Date.now()
}
```

_Private fields_ are initialized when the _class is instantiated_. This means that in the above example code
`#time` will reflect the time that the element was created, and so will be different for each element created.

