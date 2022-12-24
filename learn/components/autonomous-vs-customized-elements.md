---
title: Autonomous vs Customized Elements
order: 2
---

In the [previous section][defining-a-component] we learned about "Autonomous Custom Elements" vs "Customized Built-in
Elements". The most popular way to make elements is to use the Autonomous Custom Element style, by making up your own
tag and extending `HTMLElement`. However, each style comes with different trade-offs.

[defining-a-component]: /learn/components/defining-a-component

Choosing a type of component to build will depend on a lot of factors. Autonomous Custom Elements give you a blank
canvas to work with. Customized Built-ins _extend_ the element you're customizing. Here are some considerations to
think about:

### Tag Name

Perhaps the most obvious difference between the two is that Autonomous Custom Elements get to create an entirely new tag
name, and this means if you're querying for the element in the DOM, you'll need to reference that tag name, e.g. 
`.querySelector('fancy-button')` will return the first `<fancy-button>`.

With customized built-in elements, the tag name must match the element you're customising. For example if you wanted to
customise a `<button>` element then your HTML will take the shape of `<button is="fancy-button>`. In order to query this
element you'd need to use an _attribute selector_, for example `.querySelector('button[is="fancy-button"]')`. This also
means existing code that queries for `button` elements will also find your customized built-ins. Calling 
`.querySelectorAll('button')` will find all button elements, including ones which are customized built-in elements. The
way to find _non-customized built-ins_ is to use a selector like: `.querySelectorAll('button:not([is]);')`.

This difference in tag name also effects how you'll select for these elements in CSS. There are additional CSS
considerations...

### CSS & Styling

Given Autonomous Custom Elements have their own tag, they are unlikely to conflict with existing CSS. They can have
_classes_ added to them, and so can be styled by existing CSS but it is opt-in. 

As customised built-ins keep their tags (e.g. `<button is="fancy-button">`) any CSS that has rules like `button {}` will
apply. This means if you have some existing CSS that applies to built-ins, it'll also apply to the customized built-ins.
This also includes the default _user agent CSS_.

All built-ins have some user-agent CSS supplied already, for example `div` elements have `display: block;`, `<button>`
elements are styled to look like your operating systems buttons. Customised built-ins will also get these styles, so
`<button is="fancy-button">` will look the same as `<button>` until you customise it further.

If you want to Customize a built-in by applying only new styles and not adding any new logic, it might be best to use a CSS
class instead. The main benefit of customized built-ins is to extend or add new logic.

If you create an Autonomous Custom Element (e.g. `<fancy-button>`) you'll need to style it from scratch as Autonomous
Custom Elements have no default CSS. You will probably want to add some CSS to these elements - even if it's just
`display: block`.

One other thing to think about with regard to styling is _encapsulated styles_ within the ShadowDOM...

### ShadowDOM

Autonomous Custom Elements can make use of the [ShadowDOM][shadowdom]. Only a limited set of built-ins can use the
ShadowDOM. If you want to alter any nested elements, it's a great idea to use ShadowDOM, and so you probably won't want to
customise a built-in. Here's a list of built-ins that you can customise with ShadowDOM:

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

The ShadowDOM can be really useful for providing encapsulated markup and styles. Styles within the ShadowDOM don't effect
the rest of the page, and so it can be a really useful place to add styles to your elements. If this is a high priority,
you might find using an Autonomous Custom Element to be a better choice than the limited set of built-ins which can use
ShadowDOM.

ShadowDOM also provides elements with the ability to chose how nested elements render. An ability that many built-ins
already have...

[shadowdom]: /learn/components/shadowdom

### Nesting & Semantics

Many built-in elements will only allow certain tags to nest inside ([you can read more about _Content Categories_ on
MDN][content-categories]). For example a `<button>` tag only allows _[phrasing content]_ tags like `<b>`,
`<strong>`, `<span>` and so on. Some elements, for example the `<details>` element will have specific associations with
other elements. A `<summary>` tag can only exist as the first child to a `<details>` element, and if it doesn't exist,
it will be created by the `<details>` tag.

Customized built-ins match the semantics of the built-in they're customising, and that cannot be changed. So for example
a `<button is="fancy-button">` will only allow nested _[phrasing content][phrasing-content]_ tags just like a `<button>`.

Autonomous Custom Elements allow any nested tag by default. This can be customised with the ShadowDOM, but the
default behaviour is to allow any nested element. An element like `<fancy-button>` could include any
_[flow content][flow-content]_ tags. It might be weird to see a `<fancy-button>` with an `<iframe>` nested inside!

[content-categories]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
[phrasing-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content
[flow-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content

### Behaviour & API

Autonomous Custom Elements must extend from `HTMLElement`. They'll get all the methods and properties inherited from that,
for example it will include functions like `.querySelector()`, `.addEventListener()`, or `.focus()`. They will include
properties like `.hidden`, `.inert`, `.lang`, or `.dir`. They will also trigger the regular events that all elements do,
for example `click`, `mousemove`, `animationend`. 

Customized built-ins will have even more on top. They inherit the class related to their tag, and so elements customising
`<button>` need to extend `HTMLButtonElement`, customising `<video>` means extending `HTMLVideoElement`. These all extend
from `HTMLElement` themselves so you'll still get everything `HTMLElement` does, but with even more.

Extending from `HTMLButtonElement`, for example, means your class will inherit the button's properties, like `.type`,
`.disabled`, `.forms`, `.name`, `.value`, and so on. On one hand this would be a lot of code to replicate yourself with an 
Autonomous Custom Element, but on the other hand your element adopting all of these might not be desirable.

When extending from a customised built-in, overriding the already existing methods and properties can have undesirable
consequences. It might be tempting to add new `.type` values to `<button>` for example, but in doing so you might run into
issues with code that isn't expecting to see the newly added types.

### Accessibility

Customised built-ins have very good accessibility information built right into them. Most have an _implicit role_ which means
that assistive technologies know how to interpret them. For example using a screen reader, it is possible to navigate through
all of the headings in a webpage, and the purpose of form controls is explained as each one is focused (e.g. buttons are read
out not only by their label but also referred to as "buttons").

Autonomous Custom Elements, on the other hand, do not have any accessibility information built into them. Assistive
technologies such as screen readers will read the contents of the element as if it were plain text; treating it the same as a 
`<div>` or `<span>`. It's possible to customise how assistive technology like screen readers handle your element by using the [Accessible Internet Rich Applications (or ARIA)][aria] APIs, such as the `role=` attribute.

Accessibility can be hard to get right. Many assistive tools behave differently, and much like browsers, support is not
universal and consistent. It's always worth getting comfortable with these tools, and testing your web applications using a
variety of them. A lot of work has gone into making the built-ins as accessible as possible by default, and so it can be a 
good idea to rely on those defaults.

[aria]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA

### Summary

This has all been a lot to go over. The truth is there's good reasons to pick customising a built-in, but it should be
carefully considered. If your element is substantially different from any existing element, then using an Autonomous Custom
Element is a good choice. To help drive your decision, here's a table summarising the above information:

{% stub %}