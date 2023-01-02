---
order: 1
title: Introduction
excerpt: Build out an embeddable Mastodon post using just the url
---

{% stub %}

In this tutorial, we will walk through the process of creating a custom element that can be used to easily display
Mastodon posts on any website or application.

Our aim will be to create a `<toot-embed>` element will allow users to share and display posts (sometimes called
"toots") from the Mastodon social network, and will include features such as the ability to show or hide the user handle
and avatar image, as well as the option to customize the appearance of the toot.

Here's a example of a Mastodon toot embed. We'll be making something similar.

<iframe src="https://fosstodon.org/@koddsson/109535622423696807/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://fosstodon.org/embed.js" async="async"></script>

We will start by setting up the project files and dependencies, and then move on to defining the Mastodon toot embed
element class, extending the HTMLElement class, and registering the element with the browser. We will also cover adding
properties and methods to the element, using a shadow DOM for improved styling and separation of concerns, and adding
interactivity to the element.

Finally, we will look at integrating the Mastodon toot embed element with a real-world project, including tips for
building and using the element in a production environment.

Throughout this tutorial, we will explore the various features and capabilities of Web Components, and how they can be
used to build reusable and modular components for the web.

So let's get started!
