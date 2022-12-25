---
title: Naming your components
order: 3
---

## Tips on naming elements

Custom Element tag names must have at least one dash (`-`) in them, and so you probably want to name your element with
two distinct words like `theme-picker`.

### Avoid splitting compound words

It can be tricky to think of two words for every element, so it might be tempting to add a dash inside a compound word,
for example `tool-tip` or `over-lay`. Adding dashes to compound words like this can look a little confusing so it might
be beneficial to spend the effort and think of another word to add to these, for example `tooltip-popover` or
`overlay-dialog`.

If your Autonomous Custom Element borrows concepts from other built-ins then you could make up a name that uses the
built-in, for example `fancy-button`, `color-input`, `radial-meter`.

### Make the name concise, but clear

A lot of built-ins use shortened names like `<img>`, `<abbr>`, `<ol>`. It might be tempting to use contracted names in
your element but it should be carefully considered. These shortened names can be confusing for newcomers and it can be
unclear what they do until you familiarise yourself with them. Good components have names which make their intent really
clear!

Conversely using difficult to spell words can cause errors and typos more often. It's best to avoid difficult to spell
element names like `<abbreviated-text>` or `<widget-accessory>`. Some general rules that make words difficult to spell:
words longer than 10 characters, words with double letters (abbreviated, occasion, accommodate), words using different
letters with the same sound (necessary, accessory), words with "silent" constanants (knack, assign, doubt). In these
cases it might be better to replace a hard to spell word with a simpler word, e.g. `<abbreviated-text>` could be come
`<short-text>`, `<approximate-date>` could be `<rounded-date>`. Alternatively you could replace one hard to spell word
with two easier to spell words that mean the same thing, for example `<establish-account>` could be `<set-up-account>`.

Tag names don't have to use a single dash! Names like `<auto-complete-input>` or `<ajax-form-provider>` are valid, and
can sometimes be clearer! However just like long methods or class names they can be overly verbose which makes them
tiresome to read and type. It's good to avoid generic "filler" words that don't add to the meaning, like `wrapper`,
`provider`, `effect`, or `element`.

Some design systems will prefix their Web Components with a branding. For example all of [Adobe Spectrum's][spectrum]
Web Components are prefixed `<sp-`, [Shoelace Components][shoelace] are prefixed `<sl-`. This can be useful, as you can
easily tell apart a component from a design system to a generic off-the-shelf component. On the other hand, this makes
every component name longer.

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

As a general rule you can think about answering to the following question: What **action** does your element to do the
**thing**?

So for example, an element that lists users might be a `<user-list>`. For an element that formats text you could use
`<text-format>`.

While figuring out the action you might come up with a verb like `<file-drop>`, `<number-guess>`, or
`<currency-convert>`, it can be clearer to use two nouns instead. It helps reinforce that the component is declarative.
Many verbs can be converted to nouns, for example `<file-dropper>`, `<number-guesser>`, or `<currency-conversion>`.

### Class Names should match, but maybe use a suffix or prefix

If you are defining the class with a name so you can use it in code, it's a good idea to match the element name to the
class. JavaScript's convention is to use [camel case][camelcase] for variable names, with class names additionally
capitalising the first letter (sometimes called "Pascal Case"). Taking your element name and converting it to this
casing is a good way to name the class, so `<text-format>` would be `class TextFormat`.

It's also a good idea to add a suffix or prefix to your element class name. One reason for this is it helps to figure
out what the class does within the greater context of your JavaScript code. Adding `-element` to a tag name is redundant
because all tags are elements, but adding `Element` to a class is not because not all classes are elements. Another
reason for this is that it avoids conflicts with other class constructors, for example if you had a `<number-format>`
element, `class NumberFormat` would be very similar to the already existing `Intl.NumberFormat` class. Instead naming
your element class `class NumberFormatElement` avoids the conflict.

All of the built-ins use `HTML` as a prefix and `Element` as a suffix. For example `<span>`'s class is
`HTMLSpanElement`. Adding a prefix or suffix means you're in good company! If you have a design system where you're
prefixing your element tag names, using the prefix in the class name is a good idea, so if you had a "Fancy" design
system with `<fcy-button>` and `<fcy-accordion>` then naming classes like `FancyButtonElement` and
`FancyAccordionElement` is a good pattern.

[camelcase]: https://en.wikipedia.org/wiki/Camel_case
