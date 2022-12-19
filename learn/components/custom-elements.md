---
title: Custom Elements
order: 1
---

You might have heard Web Components being called a "suite of technologies". This is because building a Web Component
uses different platform APIs that don't necessarily all have to be used together. For example a Web Component doesn't
need to use the [ShadowDOM][shadowdom], or have its own CSS. Alternatively it's possible to use Web Component APIs like
ShadowDOM regular `<div>` tag.

[shadowdom]: /learn/components/shadowdom

A big part of Web Components is "Custom Elements". This refers to making customised HTML elements, which have their own
JavaScript behaviour backing them. You'll need JavaScript to tell the browser that you want an element to use a specific
class, from then on, that class will be called whenever an Element is created or used.

To define a Custom Element, you can use the global `customElements` API. There are two types of elements you can define:

## Autonomous Custom Elements

"Autonomous Custom Elements" is a fancy way of saying that you're extending from the _base element_. The base element,
`HTMLElement`, doesn't have a tag - so you need to make one up. It also doesn't have any built in semantics,
accessibility, or styling. In that way it's kind of like a `<span>` element. How it behaves beyond that is totally up to
you.

To define an "Autonomous Custom Elements", you can call `customElements.define` giving it a tag name and a class to use
(the class has to extend from `HTMLElement`). Here's an example:

```js
customElements.define(
  "my-element", // The tag name
  class extends HTMLElement {} // The class definition
)
```

Now, whenever `<my-element>` appears in HTML, the browser will use that class for the element. The class doesn't do
anything on its own but you can add methods or use the [lifecycle callbacks][lifecycle] to make it do fun things!

{% tip "danger" %}

If you don't extend from `HTMLElement`, when your tag is created you might see an error like
`TypeError: Illegal constructor: autonomous custom elements must extend HTMLElement`.

{% endtip %}

[lifecycle]: /learn/components/lifecycle

## Customized Built-in Custom Elements

"Customized Built-in" elements are extensions to the existing elements. For example if you wanted to make a button that
behaves differently to how it normally does, you can customise it with a customized built-in. Instead of making up your
own tag name, you'll use the same tag as the built-in you're targeting. Your class will also have to extend from the
matching class, so for example if you wanted to extend the `<button>` element, your class will need to have
`extends HTMLButtonElement`. Lastly, when you call `customElements.define` you will need to tell it that you're
extending a built in tag:

```js
customElements.define(
  "fancy-button", // The name
  class extends HTMLButtonElement {}, // The class definition
  { extends: "button" } // Only extends "button" elements
)
```

To create an element that uses the customized built-in definition the regular tag name it used, but you'll need to use
the customized built-in name to tell the browser to use your class. In HTML this looks like:

```html
<button is="fancy-button"></button>
```

If you're using the DOM APIs, you can use `createElement` with the `is` option:

```js
document.createElement("button", { is: "fancy-button" })
```

{% tip "danger" %}

If you don't extend from the right `HTML*Element` class, when your tag is created you might see an error like
`TypeError: Illegal constructor: localName does not match the HTML element interface`.

{% endtip %}
