---
layout: main.html
---
# Your first Web Component
Make sure you [[set-up-your-environment]] before continuing if you want to follow along the guide.

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