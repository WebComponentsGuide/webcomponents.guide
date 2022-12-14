---
order: 4
group: Getting Started
title: Your First Web Component
---

Make sure you [[set-up-your-environment]] before continuing if you want to follow along the guide.

### What are Web Components?

Web Components are a set of web platform APIs that enable re-usable
components to be crafted for your web pages and web apps. Web Components are
similar to other frontend frameworks you may have heard of, but the great thing
about Web Components is they're built right into the browser!

## Component basics
Talk about JS classes.
	Talk about TypeScript
Talk about HTML tags.
## Defining components
```javascript
class TodoItemElement extends HTMLElement {...}

window.customElements.define('todo-item', TodoItemElement)
```

## Best practises
Talk about setting the class on the global `window` object.
Talk about guarding against double definitions.
