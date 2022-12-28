---
title: Styling
order: 5
---

## (Introduction)

- Web Components have powerful styling capabilities.
  - _Let’s start off positive, even if it’s going to get a little
    hairy._
- Shadow DOM encapsulation makes Web Component styles generally easier
  to author.
  - Elements within a shadow tree cannot be directly selected by styles
    declared outside of it. Conversely, elements outside of a shadow
    tree cannot be directly selected by styles declared within it.
  - Web Component authors need not worry about naming conflicts for CSS
    classes outside of a shadow tree.
  - Web Component authors can use less specific selectors without much
    worry as there are generally less elements used within a shadow
    tree.
- Encapsulation is not isolation. Styles set outside of a shadow tree
  can indirectly influence styles within a shadow tree.
  - _Use this to transition to the next section..._

## Shadow Hosts and CSS Inheritance

It is very important to understand the role of a **shadow host**.

### What is a Shadow Host

- A **shadow host** is an element with a **shadow tree** and it is not
  the **shadow root**. If your Web Component uses the Shadow DOM, the
  element itself is a shadow host.
  - The **shadow root** is a non-element node that cannot be selected
    or styled since it’s featureless.
- A **shadow host** is not a part of a **shadow tree**. It exists
  _outside_ of a shadow tree and therefore cannot be selected directly
  by styles declared within its shadow tree (i.e. referencing the tag
  name with a type selector will not select the host — only nested
  elements of that type). We can select it with the `:host`
  pseudo-class and its functional counterpart `:host()` — more on that
  later.
  - `:host` when combined with relative selectors will be based on the
    shadow root within the shadow tree and not in the light tree.
- Being a part of the DOM outside of a shadow tree, the host element
  can be subject to styles declared in that context.

### CSS Inheritance

- **A shadow host’s styles become the point of inheritance for all
  top-level elements within a shadow tree.**
  - For example, setting `font-family: sans-serif` for the `html`
    element in a document-level stylesheet can affect our Web
    Component since `font-family` is generally an inherited property
    for most elements, including an autonomous custom element by default.
  - Inheritance is one way that styles from an oustide DOM can enter
    into a shadow tree.

#### Custom Properties

- CSS Custom Properties inherit by default.
  - _Could be a subheading_
  - There is an upcoming feature to CSS which allows CSS authors to
    configure whether a custom property will inherit by default (see
    `@property`).

## The Order of Precedence

### Kinda like user-agent stylesheets...

  - Styles set inside of a shadow tree work similar to a user-agent
    stylesheet.
    - For example, inside a shadow tree you can set your custom
      element’s default styles using the `:host` pseudo-class. If there
      are styles declared for the element outside of the shadow tree,
      those will win. It might seem counter intuitive at first,
      especially when you compare the strength of the specificity.
  - **Specificity does not matter between DOM trees.**
    - `:host` technically has a specificity value of 0,1,0.
    - `fancy-button` has a specificity score of 0,0,1,
    - The latter wins even if you wrap it with `:where()` which
      decreases it to 0,0,0.

### Using `!important` to prevent outside styling

The only way to completely prevent shadow tree styles from being
overriden is to use `!important`.

```html
<style>
  fancy-button {
    font-size: 2rem; /* Wins */
    color: deeppink; /* Loses */
    font-family: serif !important; /* Loses */
  }
</style>
<fancy-button>
  <template shadowroot="open">
    <style>
      :host {
        font-size: 1rem; /* Loses */
        color: dodgerblue !important; /* Wins */
        font-family: sans-serif !important; /* Wins */
      }
    </style>
    <slot></slot>
    Shadow text
  </template>
  Slotted Text
</fancy-button>
```

## Slots

When an element becomes a shadow host, it renders its shadow tree
instead of its light tree. Slots can be used in a shadow tree to render
elements from the light tree. We can further style these elements using
the `::slotted()` pseudo-element function.

- The order of precedence applies the same to slotted elements.
- Only the slotted element is exposed for styling. You cannot use
  combinators to select relative elements.
- Pseudo-classes like `:first-child`, `:nth-of-type()` work, however,
  the order of the elements is based on the light tree and not where
  they’ve been slotted in the shadow tree.

## Parts

The CSS Shadow Parts API is a way to expose elements within a shadow
tree to be styled by outside CSS.

```html
<fancy-button>
  <template shadowroot="open">
    <button part="the-actual-button">
      <slot name="icon"></slot>
      <slot></slot>
    </button>
  </template>
  Fancy
</fancy-button>
```

The inner button element can be referenced by styles declared outside of
the shadow tree using the `::part()` pseudo-element function. The `part`
attribute is set the same way classes are set on an element. An element
can be multiple parts.

```css
fancy-button::part(the-actual-button) {
  color: wheat;
}
```

- Parts follow the order of precedence as well.
- Similar to slots, relative combinators cannot be used to select
  unexposed elements.
- Descedents of parts are still subject to inheritance. So parts
  effectively become more windows of influence for a shadow tree’s
  styles.

### Using `exportparts` to expose parts from a nested custom element

Use the `exportparts` attribute on the nested custom element to expose
its parts from the current shadow host for styling. The attribute takes
a comma separated list of part names. Names can be reassigned to prevent
conflict using a colon.

## How to declare styles in the Shadow DOM

### `<style>`

### `<link rel="stylesheet">`

- Maybe note that `<link rel="preload" href="/path-to-stylesheet"
  as="style">` can be used to avoid FOUC and to parallelize the network
  waterfall. You’d only want to use this if the component is used in the
  initial render.

### Constructed stylesheets

- Note that Safari does not support these.

## (Stuff about at-rules)

- `@keyframes`
  - Can a `::slotted()` element (technically in the light tree) use a
    keyframe declared in the a shadow tree?
    - iirc the results are mixed.
- `@font-face`


## (Putting it all together and best practices)
