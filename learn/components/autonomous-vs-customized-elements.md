---
title: Autonomous vs Customized Elements
order: 2
---

In the [previous section][defining-a-component] we learned about _Autonomous Custom Elements_ vs _Customized Built-in
Elements_. The most popular way to make elements is to use the _Autonomous Custom Element_ style, by making up your own
tag and extending `HTMLElement`. However, each style comes with different trade-offs.

Choosing a type of component to build will depend on a lot of factors. _Autonomous Custom Elements_ give you a blank
canvas to work with. _Customized Built-ins_ **extend** the element you're customizing. Here are some considerations to
think about:

### Tag Name

Perhaps the most obvious difference between the two is that _Autonomous Custom Elements_ get to create an entirely new
tag name, and this means if you're querying for the element in the DOM, you'll need to reference that tag name, e.g.
`.querySelector('fancy-button')` will return the first `<fancy-button>`.

With _Customized Built-in_ elements, the tag name must match the element you're customizing. For example if you wanted
to customize a `<button>` element then your HTML will take the shape of `<button is="fancy-button>`. In order to query
this element you'd need to use an _attribute selector_, for example `.querySelector('button[is="fancy-button"]')`. This
also means existing code that queries for `button` elements will also find your _Customized Built-ins_. Calling
`.querySelectorAll('button')` will find all button elements, including ones which are _Customized Built-in elements_.
The way to find _non-Customized Built-ins_ is to use a selector like: `.querySelectorAll('button:not([is])')`.

This difference in tag name also effects how you'll select for these elements in CSS. There are additional CSS
considerations...

### CSS & Styling

Given _Autonomous Custom Elements_ have their own tag, they are unlikely to conflict with existing CSS. They can have
_classes_ added to them, and so can be styled by existing CSS but it is opt-in.

As _Customized Built-ins_ keep their tags (e.g. `<button is="fancy-button">`) any CSS that has rules like `button {}`
will apply. This means if you have some existing CSS that applies to _built-ins_, it'll also apply to the _Customized
built-ins_. This also includes the default _user agent CSS_.

All _built-ins_ have some _user-agent CSS_ supplied already, for example `div` elements have `display: block;`,
`<button>` elements are styled to look like your operating system's buttons. _Customized Built-ins_ will also get these
styles, so `<button is="fancy-button">` will look the same as `<button>` until you customize it further.

If you want to customize a _built-in_ by applying only new styles and not adding any new logic, it might be best to use
a CSS class instead. The main benefit of _Customized Built-ins_ is to extend or add new logic.

If you create an _Autonomous Custom Element_ (e.g. `<fancy-button>`) you'll need to style it from scratch as _Autonomous
Custom Elements_ have no default CSS. You will probably want to add some CSS to these elements - even if it's just
`display: block`.

One other thing to think about with regard to styling is _encapsulated styles_ within the _ShadowDOM_...

### ShadowDOM

_Autonomous Custom Elements_ can make use of the [_ShadowDOM_][shadowdom]. Only a limited set of _built-ins_ can use the
_ShadowDOM_. If you want to alter any nested elements, it's a great idea to use _ShadowDOM_, and so you probably won't
want to customize a _built-in_. Here's a list of _built-ins_ that you can customize with _ShadowDOM_:

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

_ShadowDOM_ can be really useful for providing encapsulated markup and styles. Styles within _ShadowDOM_ don't effect
the rest of the page, and so it can be a really useful place to add styles to your elements. If this is a high priority,
you might find using an _Autonomous Custom Element_ to be a better choice than the limited set of built-ins which can
use _ShadowDOM_.

_ShadowDOM_ also provides elements with the ability to choose how nested elements render. An ability that many
_built-ins_ already have...

### Nesting & Semantics

Many _built-in_ elements will only allow certain tags to nest inside ([you can read more about _Content Categories_ on
MDN][content-categories]). For example a `<button>` tag only allows _[phrasing content]_ tags like `<b>`, `<strong>`,
`<span>` and so on. Some elements, for example the `<details>` element will have specific associations with other
elements. A `<summary>` tag can only exist as the _first child_ to a `<details>` element, and if it doesn't exist, it
will be created by the `<details>` tag.

_Customized Built-ins_ match the semantics of the _built-in_ they're customizing, and that cannot be changed. So for
example a `<button is="fancy-button">` will only allow nested _[phrasing content][phrasing-content]_ tags just like a
`<button>`.

_Autonomous Custom Elements_ allow any nested tag by default. This can be customized with _ShadowDOM_, but the default
behavior is to allow any nested element. An element like `<fancy-button>` could include any _[flow
content][flow-content]_ tags. It might be weird to see a `<fancy-button>` with an `<iframe>` nested inside.

### Behavior & API

_Autonomous Custom Elements_ must extend from `HTMLElement`. They'll get all the methods and properties inherited from
that, for example it will include functions like `.querySelector()`, `.addEventListener()`, or `.focus()`. They will
include properties like `.hidden`, `.inert`, `.lang`, or `.dir`. They will also trigger the regular events that all
elements do, for example `click`, `mousemove`, `animationend`.

_Customized Built-ins_ will have even more on top. They inherit the class related to their tag, and so elements
customizing `<button>` need to extend `HTMLButtonElement`, customizing `<video>` means extending `HTMLVideoElement`.
These all extend from `HTMLElement` themselves so you'll still get everything `HTMLElement` does, but with even more.

Extending from `HTMLButtonElement`, for example, means your class will inherit the button's properties, like `.type`,
`.disabled`, `.forms`, `.name`, `.value`, and so on. On one hand this would be a lot of code to replicate yourself with
an _Autonomous Custom Element_, but on the other hand your element adopting all of these might not be desirable.

When extending from a _Customized Built-in_, overriding the already existing methods and properties can have undesirable
consequences. It might be tempting to add new `.type` values to `<button>` for example, but in doing so you might run
into issues with code that isn't expecting to see the newly added logic.

### Accessibility

_Customized Built-ins_ have very good accessibility information built right into them. Most have an _implicit role_
which means that assistive technologies know how to interpret them. For example using a _screen reader_, it is possible
to navigate through all of the headings in a webpage, and the purpose of form controls is explained as each one is
focused (e.g. buttons are read out not only by their label but also referred to as "buttons").

_Autonomous Custom Elements_, on the other hand, do not have any accessibility information built into them. Assistive
technologies such as _screen readers_ will read the contents of the element as if it were plain text; treating it the
same as a `<div>` or `<span>`. It's possible to customize how assistive technology like _screen readers_ handle your
element by using the [Accessible Rich Internet Applications (or ARIA)][aria] APIs, such as the `role=` attribute.

Accessibility can be hard to get right. Many assistive tools behave differently, and much like browsers, support is not
universal and consistent. It's always worth getting comfortable with these tools, and testing your web applications
using a variety of them. A lot of work has gone into making the _built-ins_ as accessible as possible by default, and so
it can be a good idea to rely on those defaults.

### Summary

This has all been a lot to go over. The truth is there's good reasons to pick customizing a _built-in_, but it should be
carefully considered. If your element is substantially different from any existing element, then using an _Autonomous
Custom Element_ is a good choice. To help drive your decision, here's a table summarizing the above information:

{% stub %}

[defining-a-component]: /learn/components/
[shadowdom]: /learn/components/shadowdom
[content-categories]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories
[phrasing-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content
[flow-content]: https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content
[aria]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
