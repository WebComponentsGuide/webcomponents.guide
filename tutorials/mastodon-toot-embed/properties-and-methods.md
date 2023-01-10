---
order: 3
title: Fetching the data
---

{% stub %}

Now we can start fetching the data from the mastodon servers!

We need to make sure that we have a valid URL to get the data from. We'll be using the `src` attribute to store the URL
for the toot. Lets set up getters and setters for `src`.

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

  get src() {}
  set src(value) {}
}

TootEmbedElement.define()
```

We want to do two things. Persist the `src` value to a `src` attribute on the element _and_ make sure that the URL isn't
malformed.

To make sure that the URL isn't malformed, we pass it through the URL constructor before returning the attribute value.

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

    return new URL(src, window.location.origin).toString()
  }
}

TootEmbedElement.define()
```

And we can persist the value to an attribute using `setAttribute`:

```js
class TootEmbedElement extends HTMLElement {
  // ...
  static define(tagName = "toot-embed") {
    customElements.define(tagName, this)
  }

  connectedCallback() {
    this.textContent = "Hello World!"
  }

  get src() {
    const src = this.getAttribute("src")
    if (!src) return ""

    return new URL(src, window.location.origin).toString()
  }
  // ...

  set src(value) {
    this.setAttribute("src", value)
  }
}

TootEmbedElement.define()
```

Now getting the data from the mastodon servers is a matter of using `fetch` to make a network request and display the
data that we receive.

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
    this.textContent = JSON.stringify(await response.json())
  }
}

TootEmbedElement.define()
```

Now we should be getting data! You should be seeing something like this in your browser:

![A browser screenshot showing the toot-embed component at it's current stage. The example page reads: "Here's an example toot: " followed by a dump of JSON data for a random Mastodon toot.](/images/tutorials/mastodon-toot-embed/fig2.png)

Yuk! Just a bunch of data spilled all over. We're gonna have to make this look prettier. In the next section we'll go
over templating this data into a better looking component.
