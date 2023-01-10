---
title: Introducing Web Components Guide
authors: [Keith Cirkel]
draft: false
imageslug: blog-introducing-web-components-guide
excerpt: >
  Hello, world! Announcing the launch of a new way to learn how to create Web Components.
---

The Web is a special place. It's a giant ecosystem that organically grows day by day. Rather than being designed behind
closed doors by a single corporation, the web is designed in the open by developers who _use_ the platform. It's one of
the very few areas in which we see many competing corporations work together to ensure a productive, interoperable set
of APIs that millions of other companies can leverage. No other platform comes close.

When I first picked up Microsoft Front Page '98 and started trying to build my own site, I was immediately hooked. Over
20 years later I'm still here, building on this wonderful platform we call the web. The sites I work on are very
different to the ones built in Front Page, but the fundamentals are still the same. In 1998, CSS was brand new, today
it's vastly more powerful but still retains the core identity it had back in 1998. Likewise 2008 saw the introduction of
HTML 5 which introduced a slew of exciting new tags to make more intricate documents. I remember the introduction of
HTML 5 and thinking "wouldn't it be great to define our own tags?". Luckily I wasn't alone in that thought. The next
decade of innovation on the web saw exactly that. Today Web Components allow engineers to define their own tags with
unique functionality.

Web Components started out as a collection of specs from Google. The initial release of the "Custom Elements API" in
2014 (referred to as "Custom Elements V0"). It predated modern JavaScript idioms like ES6 Classes. Google Chrome was the
only browser to ship the V0 spec, despite many experiments like Mozilla's [x-tag][x-tag] and Google's
[polymer][polymer]. By 2016 browser vendors agreed on and shipped a new specification (Custom Elements V1). This new
spec coincided with powerful new technologies such as ShadowDOM and HTML Templates. Luckily today this is a footnote in
the history of the web platform and Web Components. Web Components a proven set of technologies used by companies the
world over. There is one sticking point remaining though.

One of the best things about the web is the sheer number of learning materials available. Corporations like Mozilla,
Google and Microsoft collaborate on excellent resources like [MDN][mdn], or [web.dev][web-dev]. There exists an army of
content creators produce blogs, videos, books, and more. I _wish_ this amount of information was available to me when I
opened up Front Page for the first time. Learning how to develop for the web has never been better.

As great as these learning resources are, they cast a wide net. When speaking to developers that first learn of Web
Components, one question I am often asked is "how can I find out more?". "The documentation is all there", I say, "just
look it up on MDN". While MDN provides a great reference, it doesn't give you _the journey_. It can't give you _the
journey_, because it's job is to be a reference. [MDN still documents Custom Elements V0 APIs][mdn-ce-v0]. Despite the
various sign posts telling you not to use this, it remains, because MDN's job is to be a reference.

_The journey_ is a hallmark of every great framework. The plethora of front-end frameworks today have _the journey_.
From [Lit][lit] to [Vue][vue] to [Svelte][svelte] to [React][react] to [Remix][remix], every one starts out with the
basics, and eventually leads you to [drawing the rest of the owl][owl]. The story of Web Components lacks this. MDN
provides you with all the resources to know about the building blocks, but doesn't tell you how to put them together. On
how to draw the rest of the owl is left to you.

And building good owls - I mean UI - is _hard_. Building a component that's durable to the variety of situations it gets
placed in. Capable of accepting the wide inputs it needs, accessible for sighted users, users of screen readers,
braille, mobile, desktop, watch, fridge. That's not easy. Good documentation goes beyond "here's an API and here's how
it works". Good documentation demonstrates use cases, wards against pitfalls, defining best practices, and demonstrates
how to build a system that _scales_.

So that's why this site now exists. A team of Web Components advocates gathered together to start on _this journey_. Our
aim is to create a documentation site casting one very specific net. We want to level you up on Web Components, giving
you the skills to use this great platform technology to build rich, interoperable, user experiences.

Today's version of this site is an early iteration. The Beta label at the top indicates that. There's lots of empty
rooms. Not all the furnishings are here yet. We're working on it. But we wanted to show what we have early on to get
feedback and improve. We've shared early versions of the content we have so far with newcomers and seasoned experts
alike. Everyone has said they've learned something new. We couldn't wait any longer.

The content we have is split into three sections for now:

- **[Learn][learn]**: This will take you through _the journey_. Learn the basic building blocks and learn how to connect
  them to make useful user experiences.
- **[Tutorials][tutorials]**: This section will give you more substantial end-to-end guides on how to build one specific
  component, end to end. Each tutorial might not cover all topics. They will cover extended platform features or
  third-party libraries. They might make design decisions that aren't applicable to all web components. But we hope some
  will be exactly the kind of technique you're looking for. We hope this is an area where you can learn how experienced
  developers would build a robust component.
- **[Blog][blog]**: That's this section. Here we'll be sharing Web Component news, like advancements in browser support.
  We'll also share smaller guides and content that shows how Web Components are being used in the wild.

#### We need your help

Hopefully if you've read this far it's for one of two reasons. Either you want to learn more about Web Components, or
you're already a fan and want to see the technology grow. We need you.

If you're new to Web Components then _please read what we have_, and let us know your thoughts. [Start with the
introduction][learn] and if you see bugs, typos or get stuck on a section then [file an issue][issue]. We want to make
this the best place to learn about Web Components. If you're the one learning, then this place is for you - we want your
feedback.

If you're already a fan of Web Components then we _want to hear from you_. Using them in novel ways? We'd love to hear
about it and welcome you to write a [Tutorial][tutorials], or a [Blog][blog] entry. Built a new tool that works with Web
Components? Please share it with us as we'd love to include it. If you feel comfortable writing or refining content in
the [Learn][learn] section then your input would be invaluable to countless developers learning to build Web Components.

[x-tag]: http://x-tag.github.io/
[polymer]: https://polymer-library.polymer-project.org/
[mdn]: https://developer.mozilla.org/en-US/
[web-dev]: https://web.dev/
[mdn-ce-v0]: https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement
[lit]: https://lit.dev/docs/
[vue]: https://vuejs.org/guide/introduction.html
[svelte]: https://svelte.dev/tutorial/basics
[react]: https://reactjs.org/docs/getting-started.html
[remix]: https://remix.run/docs/en/v1
[owl]: https://knowyourmeme.com/memes/how-to-draw-an-owl
[learn]: /learn/
[tutorials]: /tutorials/
[blog]: /blog/
[issue]: https://github.com/WebComponentsGuide/webcomponents.guide/issues/new
