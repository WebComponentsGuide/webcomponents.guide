---
order: 3
title: Fetching the data
---

{% stub %}

Now we can start fetching the data from the mastodon servers!

## Setting up the attribute setter and getter

We'll be using the src attribute to store the URL for the toot. Let's set up getters and setters for src.

```js
class TootEmbedElement extends HTMLElement {
  // ...
  static define(tagName = "toot-embed") {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    this.textContent = "Hello World!"
  }
  // ...

  get src() {
    const src = this.getAttribute("src")
    if (!src) return ""

    return src
  }

  set src(value) {
    this.setAttribute("src", value)
  }
}

TootEmbedElement.define()
```

## Parsing the URL

To make sure that the URL is valid, we pass it through the URL constructor before returning the attribute value.

```js
class TootEmbedElement extends HTMLElement {
  // ...

  get src() {
    const src = this.getAttribute("src")
    if (!src) return ""

    // Check if the URL is valid
    return new URL(src, window.location.origin).toString()
  }
}

TootEmbedElement.define()
```

## Fetching the data

Now we can use the fetch method to make a network request and display the data that we receive.

```js
class TootEmbedElement extends HTMLElement {
  // ...

  async load() {
    const response = await fetch(this.src)
    this.textContent = JSON.stringify(await response.json())
  }
}

TootEmbedElement.define()
```

Finally inside the connectedCallback method we use the load method to retrieve and display data from the src attribute

```
class TootEmbedElement extends HTMLElement {
  // ...
  connectedCallback() {
    this.load()
  }
}

TootEmbedElement.define()
```

Now you should be getting data! You should be seeing something like this in your browser:

A browser screenshot showing the toot-embed component at it's current stage. The example page reads: "Here's an example
toot: " followed by a dump of JSON data for a random Mastodon toot.

Yuk! Just a bunch of data spilled all over. We're gonna have to make this look prettier. In the next section, we'll go
over how to template this data into a better looking component.
