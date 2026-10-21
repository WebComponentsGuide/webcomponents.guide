---
order: 1
title: Introduction
excerpt: Build out an embeddable Mastodon post using just the url
---

{% stub %}

In this tutorial, we will walk through the process of creating a Web Component that can be used to display Mastodon
posts on any website or application.

Mastodon is a decentralized and open-source social network that allows users to share short posts, called "toots", and
interact with other users on the network. It is similar to Twitter, but with a focus on privacy, freedom of speech, and
community building.

Our aim will be to create a <toot-embed> element that will allow users to share and display Mastodon posts on other
websites or applications.

Here's an example of a Mastodon toot embed. We'll be making something similar.

<iframe src="https://fosstodon.org/@webcomponentsguide/109660552894549193/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://fosstodon.org/embed.js" async="async"></script>

We will start by setting up the project files and dependencies, and then move on to defining the Mastodon toot embed
element class, extending the HTMLElement class, and registering the element with the browser. We will also cover adding
properties and methods to the element and using a shadow DOM for improved styling.

Throughout this tutorial, we will explore the various features and capabilities of Web Components, and how they can be
used to build reusable and modular components for the web.

So let's get started!
