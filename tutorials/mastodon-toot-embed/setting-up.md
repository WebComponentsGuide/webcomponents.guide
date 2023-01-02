---
order: 2
title: Setting Up Your Environment
---

Let's begin by setting up the project files and dependencies.

First, create a new project folder and navigate to it in your terminal:

```sh
$ mkdir toot-embed-element
$ cd toot-embed-element/
```

Now your terminal is ready inside the directory, you can initialize a new npm project by running the following command:

```sh
$ npm init -y
```

This will create a package.json file in your project folder. We will also want to add an `index.html` file which we can
use to test out the component in our browser, and a `src` directory with our `toot-embed-element.js` file:

```sh
$ mkdir src
$ touch src/toot-embed-element.js
$ touch index.html
```

We can use the `tree` command to check all files are there:

```sh
$ tree
├── package.json
├── index.html
└── src
  └── toot-embed-element.js
```

Let's start out our `toot-embed-element.js` file by setting up the Custom Element Class:

```js
class TootEmbedElement extends HTMLElement {
  static define(tagName = "toot-embed") {
    customElements.define(tagName, this)
  }
}

TootEmbedElement.define()
```

This boilerplate code defines a basic custom element class that extends the HTMLElement class, and includes a `define()`
static method which will add the element to the Custom Elements Registry. Take a look at the [Defining a
Component][defining] guide for more on this.

[defining]: /learn/components/

In your `index.html` file, include a script tag to import your `toot-embed-element.js` file, and a link tag to import
any CSS styles that you want to apply to your element. For example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>&lt;toot-embed&gt; demo</title>
    <script defer src="/src/toot-embed-element.js"></script>
  </head>
  <body>
    <p>Here's a example toot:</p>
    <p>
      <toot-embed src="https://fosstodon.org/@koddsson/109462441325942229"></toot-embed>
    </p>
  </body>
</html>
```

With these steps, we now have the basics of our element to display posts from the Mastodon social network on any website
or application. The Web Component doesn't do anything yet. We need to implement the actual functionality and render the
contents on the page.
