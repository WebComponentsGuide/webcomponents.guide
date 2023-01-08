---
title: Defining a Component
order: 1
---

Most components you write will need some kind of JavaScript. While it's not **strictly** necessary, more often than not
you'll want to add JavaScript to provide logic. To do this you'll need to create a JavaScript `class`, and use the
_Custom Elements Registry_ to attach your class so the browser knows to use it.

Without the _Custom Element Registry_ the browser won't know what JavaScript to associate to what elements. By default,
whenever the browser encounters a tag it does not know, it will use the `HTMLUnknownElement` class to give it a default
behavior. You can tell the browser to use a different class by _defining_ the tag name in the _Custom Element Registry_.
With your own class _defined_, any time the browser sees the defined tag, it will set it up using the _associated
class_.

To define a _Custom Element_, you can use the global `customElements` API. You won't need to include any JavaScript
libraries to use `customElements`, it's a global that already exists, like `console` or `localStorage`. There are two
types of elements you can define:

## Autonomous Custom Elements

_Autonomous Custom Elements_ is a fancy way of saying that you're extending from the _base element_. The base element -
`HTMLElement` - doesn't have a tag, so you need to make one up. It also doesn't have any built in semantics,
accessibility, or styling. In that way it's kind of like a `<div>` or `<span>` element. How it behaves beyond that is
totally up to you.

To define an _Autonomous Custom Element_, you can call `customElements.define` giving it a tag name and a class to use.
The class has to extend from `HTMLElement`. Here's an example:

```js
customElements.define(
  "my-element", // The tag name
  class extends HTMLElement {} // The class definition
)
```

Now, whenever `<my-element>` appears in HTML, the browser will use that class for the element. The class doesn't do
anything on its own but you can add methods or use the [_lifecycle callbacks_][lifecycle] to make it do fun things!

{% tip "danger" %}

If you don't extend from `HTMLElement`, when your tag is created then the browser will throw a `TypeError` with a
message like `autonomous custom elements must extend HTMLElement`.

{% endtip %}

[lifecycle]: /learn/components/lifecycle-reference

## Customized Built-in Elements

_Customized Built-in_ elements are extensions to the browsers existing _built-in_ elements. For example if you wanted to
make a button that extends the normal behaviors, you can customize it with a _Customized Built-in_. Instead of making up
your own tag name, you'll use the same tag as the _built-in_ you're targeting. Your class will also have to extend from
the existing _built-in's_ class. For example extending the `<button>` element means your class will need to
`extends HTMLButtonElement`. When you call `customElements.define` you will need to tell it that you're extending a
_built-in_ tag:

```js
customElements.define(
  "fancy-button", // The name
  class extends HTMLButtonElement {}, // The class definition
  { extends: "button" } // Only extend "button" elements
)
```

To create one of these elements, you'll use the regular tag name (e.g. `button`) and pass an `is=` attribute with your
element name to tell the browser to use your class. In HTML this looks like:

```html
<button is="fancy-button"></button>
```

If you're using the DOM APIs, you can use `createElement` with the `is` option:

```js
document.createElement("button", { is: "fancy-button" })
```

{% tip "danger" %}

If you don't extend from the right `HTML*Element` class, when your tag is created the browser will throw a `TypeError`
with a message like `localName does not match the HTML element interface`.

{% endtip %}

<details>
  <summary>
    For a full list of the browsers _built-in_ elements and the classes you have to extend from, see here:
  </summary>

| Element         | Tag Name       | Class to extend from                                                                                |
| :-------------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| Anchor          | `<a>`          | [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)             |
| Area            | `<area>`       | [HTMLAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAreaElement)                 |
| Audio           | `<audio>`      | [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)               |
| Base            | `<base>`       | [HTMLBaseElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBaseElement)                 |
| Block Quote     | `<blockquote>` | [HTMLQuoteElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement)               |
| Body            | `<body>`       | [HTMLBodyElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement)                 |
| BR              | `<br>`         | [HTMLBRElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBRElement)                     |
| Button          | `<button>`     | [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)             |
| Canvas          | `<canvas>`     | [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)             |
| Data            | `<data>`       | [HTMLDataElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataElement)                 |
| Data List       | `<datalist>`   | [HTMLDataListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataListElement)         |
| Del             | `<del>`        | [HTMLModElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement)                   |
| Details         | `<details>`    | [HTMLDetailsElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement)           |
| Dialog          | `<dialog>`     | [HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)             |
| Div             | `<div>`        | [HTMLDivElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)                   |
| Definition List | `<dl>`         | [HTMLDListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDListElement)               |
| Embed           | `<embed>`      | [HTMLEmbedElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLEmbedElement)               |
| Field Set       | `<fieldset>`   | [HTMLFieldSetElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement)         |
| Form            | `<form>`       | [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)                 |
| H1              | `<h1>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H2              | `<h2>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H3              | `<h3>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H4              | `<h4>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H5              | `<h5>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H6              | `<h6>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| HR              | `<hr>`         | [HTMLHRElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHRElement)                     |
| Head            | `<head>`       | [HTMLHeadElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement)                 |
| HTML            | `<html>`       | [HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)                 |
| IFrame          | `<iframe>`     | [HTMLIFrameElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement)             |
| Image           | `<img>`        | [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)               |
| Ins             | `<ins>`        | [HTMLModElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement)                   |
| Input           | `<input>`      | [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)               |
| Label           | `<label>`      | [HTMLLabelElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement)               |
| Legend          | `<legend>`     | [HTMLLegendElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLegendElement)             |
| LI              | `<li>`         | [HTMLLIElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement)                     |
| Link            | `<link>`       | [HTMLLinkElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement)                 |
| Map             | `<map>`        | [HTMLMapElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement)                   |
| Menu            | `<menu>`       | [HTMLMenuElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMenuElement)                 |
| Meta            | `<meta>`       | [HTMLMetaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMetaElement)                 |
| Meter           | `<meter>`      | [HTMLMeterElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement)               |
| Object          | `<object>`     | [HTMLObjectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement)             |
| OList           | `<ol>`         | [HTMLOListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOListElement)               |
| OptGroup        | `<optgroup>`   | [HTMLOptGroupElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptGroupElement)         |
| Option          | `<option>`     | [HTMLOptionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement)             |
| Output          | `<output>`     | [HTMLOutputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement)             |
| Paragraph       | `<p>`          | [HTMLParagraphElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement)       |
| Picture         | `<picture>`    | [HTMLPictureElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLPictureElement)           |
| Pre             | `<pre>`        | [HTMLPreElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLPreElement)                   |
| Progress        | `<progress>`   | [HTMLProgressElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement)         |
| Quote           | `<q>`          | [HTMLQuoteElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement)               |
| Script          | `<script>`     | [HTMLScriptElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)             |
| Select          | `<select>`     | [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)             |
| Slot            | `<slot>`       | [HTMLSlotElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement)                 |
| Source          | `<source>`     | [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement)             |
| Span            | `<span>`       | [HTMLSpanElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSpanElement)                 |
| Style           | `<style>`      | [HTMLStyleElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement)               |
| TableCaption    | `<caption>`    | [HTMLTableCaptionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCaptionElement) |
| TableCell       | `<td>`         | [HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement)       |
| Table           | `<table>`      | [HTMLTableElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement)               |
| TableRow        | `<tr>`         | [HTMLTableRowElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement)         |
| TBody           | `<tbody>`      | [HTMLTableSectionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement) |
| Template        | `<template>`   | [HTMLTemplateElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement)         |
| TextArea        | `<textarea>`   | [HTMLTextAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement)         |
| Time            | `<time>`       | [HTMLTimeElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement)                 |
| Title           | `<title>`      | [HTMLTitleElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTitleElement)               |
| Track           | `<track>`      | [HTMLTrackElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTrackElement)               |
| UList           | `<ul>`         | [HTMLUListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLUListElement)               |
| Video           | `<video>`      | [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)               |

</details>

## Some advanced tricks for defining elements

Depending on how your code is loaded, you might find it runs multiple times. Calling `customElements.define` on an
already defined component will cause an error in the browser:

```js
DOMException: NotSupportedError
```

If you wanted to guard against re-defining an element you could wrap the call to `customElements.define` by first
checking if it's already been defined with `customElements.get`:

```js
if (!customElements.get("my-element")) {
  customElements.define("my-element", class extends HTMLElement {})
}
```

Another thing you could do is move the definition into a static method on the class, like so:

```js
class MyElement extends HTMLElement {
  static define() {
    customElements.define("my-element", this)
  }
}
```

This way users of your component can call `MyElement.define()` in a place in their code where all components get
registered. To make your component even more flexible, you can make it so the tag name can be customized:

```js
class MyElement extends HTMLElement {
  // call MyElement.define() for default tag name
  // or MyElement.define('custom-tag') to define with a custom tag.
  static define(tagName = "my-element") {
    customElements.define(tagName, this)
  }
}
```
