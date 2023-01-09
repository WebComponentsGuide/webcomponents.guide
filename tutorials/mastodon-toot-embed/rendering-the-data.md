---
order: 4
title: Rendering the data
---

{% stub %}

Now that we have successfully fetched the data from the Mastodon servers, it's time to render it in a more presentable
format. Instead of simply outputting the raw JSON data as we did in the previous chapter, we can use the attachShadow()
method to attach a shadow DOM to our element and insert the data into a template.

First, let's modify our TootEmbedElement class to use the attachShadow() method and insert the data into a template:

```js
class TootEmbedElement extends HTMLElement {
  // ...
  static define(tagName = "toot-embed") {
    customElements.define(tagName, this)
  }
  // ...

  connectedCallback() {
    this.load()
  }

  // ...
  get src() {
    const src = this.getAttribute("src")
    if (!src) return ""

    return new URL(src, window.location.origin).toString()
  }

  set src(value) {
    this.setAttribute("src", value)
  }
  // ...

  async load() {
    const response = await fetch(this.src)
    const tootData = await response.json()

    this.attachShadow({ mode: "open" }).innerHTML = `
      <div class="toot-header">
        <img src="${tootData.account.avatar}">
        <h3>${tootData.account.display_name}</h3>
      </div>
      <div class="toot-content">
        ${tootData.content}
      </div>
    `
  }
}

TootEmbedElement.define()
```

Now, when the element is connected to the DOM and the load() method is called, the data is inserted into the template
and displayed in the element.

You should now see the Mastodon toot data displayed in a more structured and presentable format:

![A browser screenshot showing the toot-embed component at it's current stage. The example page reads: "Here's an example toot: " followed by a display of the Mastodon toot data including the avatar image, display name, and toot content.](/images/tutorials/mastodon-toot-embed/fig3.png)

It's still not very good to look at! The image is way to big and the whole layout is a bit off. Let's add some
rudimentary styles to the component in a `<style>` tag to make it a bit better.

```js
class TootEmbedElement extends HTMLElement {
  // ...
  static define(tagName = "toot-embed") {
    customElements.define(tagName, this)
  }
  // ...

  connectedCallback() {
    this.load()
  }

  // ...
  get src() {
    const src = this.getAttribute("src")
    if (!src) return ""

    return new URL(src, window.location.origin).toString()
  }

  set src(value) {
    this.setAttribute("src", value)
  }
  // ...

  async load() {
    const response = await fetch(this.src)
    const tootData = await response.json()

    this.attachShadow({ mode: "open" }).innerHTML = `
      <style>
        .toot-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .toot-header img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 8px;
        }

        .toot-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
      </style>
      <div class="toot-header">
        <img src="${tootData.account.avatar}">
        <h3>${tootData.account.display_name}</h3>
      </div>
      <div class="toot-content">
        ${tootData.content}
      </div>
    `
  }
}

TootEmbedElement.define()
```

![A browser screenshot showing the toot-embed component at it's current stage. The example page reads: "Here's an example toot: " followed by a display of the Mastodon toot data including the avatar image, display name, and toot content. The component has been given some rudamentary layouting.](/images/tutorials/mastodon-toot-embed/fig4.png)

In the next chapter, we will add styling to the component to make it look even better.
