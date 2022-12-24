---
title: Events
order: 3
---

Web browsers (and server side engines like [NodeJS][node] and [Deno][deno]) include
an Event API which has become a foundational concept in JavaScript, and is particularly important when we talk about Web
Components. The two classes that drive all of these events are the `Event` class, and the `EventTarget` class.

[node]: https://nodejs.org/en/
[deno]: https://deno.land/

### What are events?

Events are a way to allow two different pieces of code to communicate with eachother, without having to import or
otherwise know about their APIs. Using events, your code can notify the application when a change has happened that
other parts of the application can listen to, and do something about.

For example, when you click or tap on a web page a special `click` event is created. Different parts of the code can
listen for the `click` event and act on it. Rather than the code keep asking "has the user clicked yet?", the code
_subscribe_ to be notified when the user clicks instead.

Web Browsers today have hundreds of events built in, and will dispatch events for all sorts of actions, like when a
document loads or unloads, when a user types a key or moves their mouse, or when new data is loaded. These events
provide a safe, scalable, and uniform way for developers to write interactive apps.

### What does the `Event` class do?

### What does the `EventTarget` target class do?

{% stub %}
