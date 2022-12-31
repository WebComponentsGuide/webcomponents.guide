---
title: Event Phases: Capturing & Bubbling
order: 5
---

In the previous section we learned about [event basics][events-basics] like the `EventTarget` and `Event` classes.
We also learned about how to add and remove listeners, how to extend those classes, and some options that both
classes provide.

In this section we'll learn about another big part to do with event systems, and how they are tied together in the
DOM tree to make one complete system that propagates across _multiple_ `EventTarget`s to create a more complete
system which tracks events through the entire DOM tree.

{% stub %}

[events-basics]: /learn/javascript/events
[events-detail]: /learn/javascript/events-in-more-detail
