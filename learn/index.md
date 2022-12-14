---
order: 1
group: Getting Started
title: Introduction
---

### What are Web Components?

Web Components are a native way for web developers to build user interfaces. They're built right into your browser so you don't have to download any framework to get started!

Web Components allow you to extend the vocabulary of your HTML, defining behaviors that go beyond the built in tags. You might be familar with existing HTML tags such as `<button>` or `<details>`. Web Components allow you to define entirely new tags, such as `<big-button>` or `<details-menu>`. These definitions can be driven by JavaScript, allowing advanced behaviours and interactions. Here's a minimal example:

{% tip %}
Custom Element tag names are required to include a dash in it's name. It's a low-tech way to allow browsers and users to tell if a tag name is a custom or native element.
{% endtip %}

```js
class CounterButton extends HTMLElement {
  value = 0

  connectedCallback() {
    this.addEventListener('click', () => {
      this.value += 1
      this.update()
    })
    this.update()
  }

  update() {
    this.textContent = `Count is ${ count }`
  }
}

customElements.define('counter-button', CounterButton)
```
```html
<counter-button></counter-button>
```


Web Components build on top of existing web standards such as [[Events]], [[DOM]] and [[CSS]].

To learn more and implement your own Web Component check out Your first Web Component
