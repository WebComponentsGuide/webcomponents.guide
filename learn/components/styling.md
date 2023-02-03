---
title: Styling
order: 6
---

Web Components have powerful styling capabilities which make them portable and extensible. Styles declared within the
Shadow DOM serve as a Web Component's default styling. They work similarly to writing a user-agent stylesheet.

## Shadow Encapsulation: Scoped Styles

Shadow DOM offers a boundary line between styles outside the tree, and styles inside the tree. Styles cannot cross this
boundary unintentionally. This is different to regular CSS where a selector can affect every element on a page.

```html
<style>
  p {
    color: deeppink;
  }
</style>

<p>This text is deeppink and not teal because it is outside of the shadow root.</p>

<fancy-p>
  <template shadowroot="open">
    <style>
      p {
        color: teal;
      }
    </style>
    <p>This text is teal and not deeppink because it is inside of the shadow root.</p>
  </template>
</fancy-p>
```

The `<p>` element within the shadow tree is not affected by the styles declared outside of the shadow tree.

## Inheritance

Custom elements abide by the same rules of inheritance as other HTML elements. CSS properties whose default value is
`inherit` will inherit from their parent element, for example `font-size`, `font-family`, and `color`. This `inherit`
property crosses the Shadow DOM boundary. [CSS custom properties][css-custom-properties] default to `inherit`, so
they'll cross Shadow DOM boundaries too. Top-level elements within a shadow tree inherit properties from the custom
element itself (also known as the shadow host).

```html
<style>
  article {
    color: deeppink;
  }
</style>

<article>
  <h1>This text is deeppink.</h1>
  <article-meta>
    <template shadowroot="open">
      <style>
        span {
          font-style: italic;
        }
      </style>
      <span>By Some Person</span>
    </template>
  </article-meta>
</article>
```

The `<article-meta>` custom element inherits its `color` from the `<article>` element where it's set to `deeppink`. The
`<span>` element within the shadow tree inherits its `color` from the `<article-meta>` custom element which means the
value will also be `deeppink`.

## Styling elements outside of a shadow tree

In order to be portable, Web Components can add default styles for the element itself (also known as the shadow host).
They can also style slotted elements with some default styles.

### Writing default styles for the shadow host with `:host` and `:host()`

You can use host selectors to style an element from within the shadow tree. The `:host` pseudo-class always applies
styles to the custom element, aka the _shadow host_:

```html
<fancy-p>
  <template shadowroot="open">
    <style>
      :host {
        display: inline-block;
      }
    </style>
  </template>
</fancy-p>
```

You can also add conditional styles to the _shadow host_ using `:host()` _selector function_. This can be used to style
the host so long as it matches the given selector. For example, it can be used to select for hosts that have a given
attribute. While `:host` may apply to `<fancy-p>` component, `:host([extra])` would apply only to `<fancy-p extra>`
elements:

```css
:host([extra]) {
  font-style: italic;
  font-weight: bold;
}
```

```html
<fancy-p>I not am extra</fancy-p> <fancy-p extra>I am extra</fancy-p>
```

#### Chaining selectors after `:host`

While the `:host` selector refers to the shadow host element which is outside of the shadow tree, if you chain selectors
it will select elements within the shadow tree.

```html
<fancy-p>
  <template shadowroot="open">
    <style>
      :host > p {
        color: deeppink;
      }
    </style>
    <p>I am deeppink.</p>
  </template>
  <p>I am not deeppink.</p>
</fancy-p>
```

### Writing default styles for slotted elements with `::slotted()`

The `::slotted()` pseudo-element selector allows you to write default styles for slotted elements that match the given
selector. Specifying a selector can be useful for styling specific elements in particular ways.

```html
<fancy-elements>
  <template shadowroot="open">
    <style>
      ::slotted(button) {
        color: deeppink;
      }

      ::slotted(p) {
        color: teal;
      }
    </style>
    <slot></slot>
  </template>
  <button>I am a slotted button</button>
  <p>I am a slotted paragraph.</p>
</fancy-elements>
```

If you want to target elements in specific slots you can pass an attribute selector which matches the slot:

```html
<fancy-article>
  <template shadowroot="open">
    <style>
      ::slotted([slot="title"]) {
        font-size: 2rem;
      }
      ::slotted([slot="subtitle"]) {
        font-size: 1.25rem;
      }
      /* The following will target elements going into the unnamed slot */
      ::slotted(:not([slot])) {
        color: deeppink;
      }
    </style>
    <article>
      <hgroup>
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </hgroup>
      <slot></slot>
    </article>
  </template>
  <h1 slot="title">I am the title</h1>
  <p slot="subtitle">I am the subtitle</p>
  <p>I am content.</p>
</fancy-article>
```

You cannot chain selectors with `::slotted()`, so the following will not work:

```css
::slotted(h1) span {
  color: deeppink;
}
```

## Parts: styling a shadow tree from the outside

The CSS Shadow Part API allows elements within a shadow tree to be styled from outside of it. This allows Web Components
to be very extensible.

```css
fancy-article::part(header) {
  display: grid;
  gap: 0.25rem;
  padding: 0.5rem;
  border-block-end: 0.125rem solid deeppink;
}

fancy-article::part(content) {
  display: grid;
  justify-content: start;
  gap: 0.5rem;
}
```

```html
<fancy-article>
  <template shadowroot="open">
    <article part="article">
      <hgroup part="header">
        <slot name="title"></slot>
        <slot name="subtitle"></slot>
      </hgroup>
      <div part="content">
        <slot name="content"></slot>
      </div>
    </article>
  </template>
  <h1 slot="title">Hello, World!</h1>
  <p slot="subtitle">I am a subtitle...</p>
  <p>I am content</p>
</fancy-article>
```

Similar to `::slotted()`, you cannot chain selectors after `::part()` to select children or siblings. The following will
not work:

```css
fancy-article::part(header) slot {
  display: block;
}
```

## How to include default styles for a Web Component

You can load a stylesheet for a Web Component with a variety of methods. Some may be familiar, but others are newer.

### Using `<style>`

You can include a `<style>` tag within your Shadow Tree, and it'll only apply to the Shadow Tree itself - it won't
affect the rest of the page:

```html
<style>
  :host {
    color: deeppink;
  }
</style>
```

### Using `<link rel="stylesheet">`

Using a `<link rel="stylesheet">` element in the shadow tree will allow you to write styles in an external stylesheet.

```html
<link rel="stylesheet" href="/fancy-article-element.css" />
```

If you do this, the stylesheet will be loaded after the script is loaded. This will likely cause a _flash of unstyled
content_ (FOUC). To circumvent this, you can preload the stylesheet like this:

```html
<link rel="preload" href="/fancy-article-element.css" as="style" />
```

### Using Constructable Stylesheets

_Constructable Stylesheets_ are stylesheets which are programmatically created in JavaScript. You can create a new
stylesheet using the `CSSStyleSheet` constructor and set styles with the `.replaceSync()` method:

```js
const stylesheet = new CSSStyleSheet()

stylesheet.replaceSync(`
  :host {
    color: deeppink;
  }
`)

class FancyArticleElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).adoptedStyleSheets = [stylesheet]
  }
}
```

### Using CSS Module scripts

CSS Module scripts allow developers to import stylesheets as if they were a module script. To do so, use an import
assertion where the `type` is `css` and then you can add the imported stylesheet to the `adoptedStyleSheets` array for
the element's shadow root.

```js
import stylesheet from "./fancy-article-element.css" assert { type: "css" }

class FancyArticleElement extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).adoptedStyleSheets = [stylesheet]
  }
}
```

[css-custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
