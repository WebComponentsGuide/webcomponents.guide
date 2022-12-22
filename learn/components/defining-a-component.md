---
title: Defining a Component
order: 1
---

Most components you write will need some kind of JavaScript. While it's not _stricly_ necessary, more often than not
you'll want to add JavaScript to provide logic. To do this you'll need to create a JavaScript `class`, and use the
"Custom Elements Registry" to attach your class so the browser knows to use it.

Without the "Custom Element Registry" the browser won't know what JavaScript to associate to what elements. By default,
whenever the browser encounters a tag it does not know, it will use the `HTMLUnknownElement` class to give it a default
behaviour. You can tell the browser to use a different class by _defining_ the tag name in the Custom Element Registry.
With your own class defined, any time the browser sees the defined tag, it will set it up using the associated class.

To define a Custom Element, you can use the global `customElements` API. You won't need to include any JavaScript
libraries to use `customElements`, it's a global that already exists, like `console` or `localStorage`. There are two
types of elements you can define:

## Autonomous Custom Elements

"Autonomous Custom Elements" is a fancy way of saying that you're extending from the _base element_. The base element - 
`HTMLElement` - doesn't have a tag, so you need to make one up. It also doesn't have any built in semantics,
accessibility, or styling. In that way it's kind of like a `<div>` or `<span>` element. How it behaves beyond that is
totally up to you.

To define an "Autonomous Custom Element", you can call `customElements.define` giving it a tag name and a class to use.
The class has to extend from `HTMLElement`. Here's an example:

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

[lifecycle]: /learn/components/lifecycle-reference

## Customized Built-in Elements

"Customized Built-in" elements are extensions to the browsers existing built-in elements. For example if you wanted to
make a button extends the normal behaviours, you can customise it with a customized built-in. Instead of making up your
own tag name, you'll use the same tag as the built-in you're targeting. Your class will also have to extend from the
existing built-in's class. To extend the `<button>` element, your class will need to `extends HTMLButtonElement`. When
you call `customElements.define` you will need to tell it that you're extending a built in tag:

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

If you don't extend from the right `HTML*Element` class, when your tag is created you might see an error like
`TypeError: Illegal constructor: localName does not match the HTML element interface`.

{% endtip %}

<details>
  <summary>
    For a full list of the browsers built in elements and the classes you have to extend from, see here:
  </summary>

| Element      | Tag Name       | Class to extend from                                                                                |
| :----------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| Anchor       | `<a>`          | [HTMLAnchorElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)             |
| Area         | `<area>`       | [HTMLAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAreaElement)                 |
| Audio        | `<audio>`      | [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)               |
| Base         | `<base>`       | [HTMLBaseElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBaseElement)                 |
| BlockQuote   | `<blockquote>` | [HTMLQuoteElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement)               |
| Body         | `<body>`       | [HTMLBodyElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement)                 |
| BR           | `<br>`         | [HTMLBRElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLBRElement)                     |
| Button       | `<button>`     | [HTMLButtonElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement)             |
| Canvas       | `<canvas>`     | [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)             |
| Data         | `<data>`       | [HTMLDataElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataElement)                 |
| DataList     | `<datalist>`   | [HTMLDataListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataListElement)         |
| Del          | `<del>`        | [HTMLModElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement)                   |
| Details      | `<details>`    | [HTMLDetailsElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement)           |
| Dialog       | `<dialog>`     | [HTMLDialogElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)             |
| Div          | `<div>`        | [HTMLDivElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement)                   |
| DList        | `<dl>`         | [HTMLDListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDListElement)               |
| Embed        | `<embed>`      | [HTMLEmbedElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLEmbedElement)               |
| FieldSet     | `<fieldset>`   | [HTMLFieldSetElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement)         |
| Form         | `<form>`       | [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement)                 |
| H1           | `<h1>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H2           | `<h2>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H3           | `<h3>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H4           | `<h4>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H5           | `<h5>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| H6           | `<h6>`         | [HTMLHeadingElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement)           |
| HR           | `<hr>`         | [HTMLHRElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHRElement)                     |
| Head         | `<head>`       | [HTMLHeadElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement)                 |
| Html         | `<html>`       | [HTMLHtmlElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement)                 |
| IFrame       | `<iframe>`     | [HTMLIFrameElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement)             |
| Image        | `<img>`        | [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)               |
| Ins          | `<ins>`        | [HTMLModElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement)                   |
| Input        | `<input>`      | [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)               |
| Label        | `<label>`      | [HTMLLabelElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement)               |
| Legend       | `<legend>`     | [HTMLLegendElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLegendElement)             |
| LI           | `<li>`         | [HTMLLIElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement)                     |
| Link         | `<link>`       | [HTMLLinkElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement)                 |
| Map          | `<map>`        | [HTMLMapElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement)                   |
| Menu         | `<menu>`       | [HTMLMenuElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMenuElement)                 |
| Meta         | `<meta>`       | [HTMLMetaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMetaElement)                 |
| Meter        | `<meter>`      | [HTMLMeterElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement)               |
| Object       | `<object>`     | [HTMLObjectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement)             |
| OList        | `<ol>`         | [HTMLOListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOListElement)               |
| OptGroup     | `<optgroup>`   | [HTMLOptGroupElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptGroupElement)         |
| Option       | `<option>`     | [HTMLOptionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement)             |
| Output       | `<output>`     | [HTMLOutputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement)             |
| Paragraph    | `<p>`          | [HTMLParagraphElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement)       |
| Picture      | `<picture>`    | [HTMLPictureElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLPictureElement)           |
| Pre          | `<pre>`        | [HTMLPreElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLPreElement)                   |
| Progress     | `<progress>`   | [HTMLProgressElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement)         |
| Quote        | `<q>`          | [HTMLQuoteElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement)               |
| Script       | `<script>`     | [HTMLScriptElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)             |
| Select       | `<select>`     | [HTMLSelectElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement)             |
| Slot         | `<slot>`       | [HTMLSlotElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement)                 |
| Source       | `<source>`     | [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement)             |
| Span         | `<span>`       | [HTMLSpanElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSpanElement)                 |
| Style        | `<style>`      | [HTMLStyleElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement)               |
| TableCaption | `<caption>`    | [HTMLTableCaptionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCaptionElement) |
| TableCell    | `<td>`         | [HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement)       |
| Table        | `<table>`      | [HTMLTableElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement)               |
| TableRow     | `<tr>`         | [HTMLTableRowElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement)         |
| TBody        | `<tbody>`      | [HTMLTableSectionElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement) |
| Template     | `<template>`   | [HTMLTemplateElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement)         |
| TextArea     | `<textarea>`   | [HTMLTextAreaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement)         |
| Time         | `<time>`       | [HTMLTimeElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement)                 |
| Title        | `<title>`      | [HTMLTitleElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTitleElement)               |
| Track        | `<track>`      | [HTMLTrackElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTrackElement)               |
| UList        | `<ul>`         | [HTMLUListElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLUListElement)               |
| Video        | `<video>`      | [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)               |

</details>

## When to use Autonomous Custom Elements vs Customized Built-ins

The most popular way to make elements is with "Autonomous Custom Elements", by making up your own tag and extending
`HTMLElement`.

Each style comes with different trade-offs. Autonomous Custom Elements give you a blank canvas to work with. They have
no default CSS so you might want to add some (even if it's just `display: block`). Built-ins are going to have some
user-agent CSS supplied already, for example `<button>` already has a certain look and feel. If you create a
`<fancy-button>` you'll need to replicate that look and feel. `<button is="fancy-button">` will _extend_ the `<button>`
and so gets all the styles applied from `<button>`. If you want to Customize a built-in by applying new styles and not
adding any new logic, it might be best to use a CSS class instead.

Many built-in elements will only allow certain tags to nest inside ([you can read more about _Content Categories_ on
MDN][content-categories]). Autonomous Custom Elements allow any nested tag. So while `<button is="fancy-button">` will
only allow nested _[phrasing content][phrasing-content]_ tags, an element like `<fancy-button>` could include any _[flow
content][flow-content]_ tags. It might be weird to see a `<fancy-button>` with an `<iframe>` nested inside!

[content-categories]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
[phrasing-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content
[flow-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content

Autonomous Custom Elements can make use of the [ShadowDOM][shadowdom]. Only a limited set of built-ins can use the
ShadowDOM. If you want to alter any nested elements, it's a great idea to use ShadowDOM, and so you probably won't want
to customise a built-in. Here's a list of built-ins that you can customise with ShadowDOM:

- `<article>`
- `<aside>`
- `<blockquote>`
- `<body>`
- `<div>`
- The `<header>` and `<footer>` elements
- Heading elements `<h1>`,`<h2>`,`<h3>`,`<h4>`,`<h5>`, and`<h6>`
- `<main>`
- `<nav>`
- `<p>`
- `<section>`
- `<span>`

[shadowdom]: /learn/components/shadowdom

Autonomous Custom Elements must extend from `HTMLElement`. They'll get all the methods and properties inherited
from that, for example `.querySelector()`, `.addEventListener()`, `.hidden`, `.focus()`. They will also trigger the
regular events that all elements do, for example `click`, `mousemove`, `animationend`. Customized built-ins will have
even more on top. For example `HTMLButtonElement` has a `.type` property, and `HTMLVideoElement` has a `.play()`
function. You can override properties or methods on both types but remember that other code might already expect those
functions to behave a certain way, so you'll need to be careful.

You can think of Customized Built-ins as "mixins" or "extensions" to an existing element. All of the existing features
of the built-in will continue to exist on your customised version, but you can add extra logic or features.

## Tips on naming elements

Custom Element tag names must have at least one dash (`-`) in them, and so you probably want to name your element with two distinct words like `theme-picker`.

### Avoid splitting compound words

It can be tricky to think of two words for every element, so it might be tempting to add a dash inside a compound word, for example `tool-tip` or `over-lay`. Adding dashes to compound words like this can look a little confusing so it might be beneficial to spend the effort and think of another word to add to these, for example `tooltip-popover` or `overlay-dialog`.

If your Autonomous Custom Element borrows concepts from other built-ins then you could make up a name that uses the built-in, for example `fancy-button`, `color-input`, `radial-meter`.

### Make the name concise, but clear

A lot of built-ins use shortened names like `<img>`, `<abbr>`, `<ol>`. It might be tempting to use contracted names in your element but it should be carefully considered. These shortened names can be confusing for newcomers and it can be unclear what they do until you familiarise yourself with them. Good components have names which make their intent really clear!

Conversely using difficult to spell words can cause errors and typos more often. It's best to avoid difficult to spell element names like `<abbreviated-text>` or `<widget-accessory>`. Some general rules that make words difficult to spell: words longer than 10 characters, words with double letters (abbreviated, occasion, accommodate), words using different letters with the same sound (necessary, accessory), words with "silent" constanants (knack, assign, doubt). In these cases it might be better to replace a hard to spell word with a simpler word, e.g. `<abbreviated-text>` could be come `<short-text>`, `<approximate-date>` could be `<rounded-date>`. Alternatively you could replace one hard to spell word with two easier to spell words that mean the same thing, for example `<establish-account>` could be `<set-up-account>`.

Tag names don't have to use a single dash! Names like `<auto-complete-input>` or `<ajax-form-provider>` are valid, and can sometimes be clearer! However just like long methods or class names they can be overly verbose which makes them tiresome to read and type. It's good to avoid generic "filler" words that don't add to the meaning, like `wrapper`, `provider`, `effect`, or `element`.


Some design systems will prefix their Web Components with a branding. For example all of [Adobe Spectrum's][spectrum] Web Components are prefixed `<sp-`, [Shoelace Components][shoelace] are prefixed `<sl-`. This can be useful, as you can easily tell apart a component from a design system to a generic off-the-shelf component. On the other hand, this makes every component name longer.

[spectrum]: https://opensource.adobe.com/spectrum-web-components/
[shoelace]: https://shoelace.style/

### Some tag names are reserved

There are also some names which are _disallowed_ because they have existed in the HTML spec prior to the creation of
custom elements. These are:

- `annotation-xml`
- `color-profile`
- `font-face`
- `font-face-src`
- `font-face-uri`
- `font-face-format`
- `font-face-name`
- `missing-glyph`

Trying to create an element with one of these names will result in an error like:

```js
DOMException: CustomElementRegistry.define: 'annotation-xml' is not a valid custom element name
```

### If in doubt, use the `noun-noun` pattern

As a general rule you can think about answering to the following question: What **action** does your element to do the **thing**?

So for example, an element that lists users might be a `<user-list>`. For an element that formats text you could use `<text-format>`.

While figuring out the action you might come up with a verb like `<file-drop>`, `<number-guess>`, or `<currency-convert>`, it can be clearer to use two nouns instead. It helps reinforce that the component is declarative. Many verbs can be converted to nouns, for example `<file-dropper>`, `<number-guesser>`, or `<currency-conversion>`. 

## Some advanced tricks for defining elements

Depending on how your code is loaded, you might find it runs multiple times. Calling `customElements.define` on an
already existing component will cause an error in the browser:

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
    customElements.define('my-element, MyElement)
  }

}
```

This way users of your component can call `MyElement.define()` in a place in their code where all components get
registered.
