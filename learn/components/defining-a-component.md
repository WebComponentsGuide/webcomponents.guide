---
title: Defining a Component
order: 1
---

Most components you write will need some kind of JavaScript. While it's not _stricly_ necessary, more often than not you'll want to add JavaScript to provide logic, or to make it more convenient to use your component. To do this you'll need to create a JavaScript `class`, and use the "Custom Elements Registry" to attach your class to the browser.

Without the "Custom Element Registry" the browser won't know what JavaScript to associate to what elements. By default, whenever the browser encounters a tag it does not know it will use the `HTMLUnknownElement` class to give it a default behaviour. You can tell the browser to use a different class by _defining_ the tag name in the Custom Element Registry. With your own class defined, any time the browser sees the defined tag, it will set it up using the associated class. To define a Custom Element, you can use the global `customElements` API. There are two types of elements you can define:

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

## Some advanced tricks for defining elements

Depending on how your code is loaded, you might find it runs multiple times. Calling `customElements.define` on an already existing component will cause an error in the browser:

```js
DOMException: NotSupportedError
```

If you wanted to guard against re-defining an element you could wrap the call to `customElements.define` by first checking if it's already been defined with `customElements.get`:

```js
if (!customElements.get('my-element')) {
  customElements.define('my-element', class extends HTMLElement {})
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

This way users of your component can call `MyElement.define()` in a place in their code where all components get registered.