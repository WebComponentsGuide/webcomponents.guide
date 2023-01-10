---
order: 3
group: Getting Started
title: Setting Up Your Environment
---

## Web Browser

_Web Components_ are a native web technology, so the most important tool will be your web browser. Pick a browser you're
comfortable using, but it's a good idea to make sure you pick one with a good set of developer tools built in. A good
set of devtools makes it much easier to debug your application. A lot of developers use [Google's Chrome
browser][chrome]. [Mozilla Firefox][firefox] is another great option. There's also Mozilla [Firefox Developer
edition][firefox-dev] which has extra features, like an Integrated Development Environment. [Microsoft Edge][edge] is
another great browser, built on the same technologies as Google Chrome. If you're on [macOS][macos] then
[Safari][safari] can be a good choice.

To test your applications, it can be useful to install all four browsers. Running your application in a variety of
browsers can uncover cross browser bugs, or missing features. Getting comfortable with using the devtools in each is a
good idea.

### Web Browser Devtools

A good set of browser developer tools which will enable you to inspect your web applications under the hood and see how
it all operates. They can be quite intimidating at first, but there are some great resources out there to learn how to
make the most of them.

If you're using Google Chrome, check out the [Chrome Developers documentation on the Chrome Devtools][chrome-devtools].
It's a great resource for learning exactly how the developer tools inside Google Chrome work. Mozilla has a similar
[guide on Firefox Developer Tools][firefox-devtools]. Microsoft have a smaller but still useful [guide on the Edge
developer tools][edge-devtools]. Apple's Safari has a useful [five minute walk through of their Web
Inspector][safari-devtools].

Here's a handy guide on how to quickly access the developer tools, depending on your browser and OS:

| OS            | Browser                      | Keyboard shortcut             | Menu                                                 |
| :------------ | :--------------------------- | :---------------------------- | :--------------------------------------------------- |
| Windows/Linux | {% icon "chrome" %} Chrome   | {% shortcut "Ctrl Shift I" %} | {% menu "more" "More Tools" "Developer Tools" %}     |
| macOS         | {% icon "chrome" %} Chrome   | {% shortcut "Cmd Opt I" %}    | {% menu "more" "More Tools" "Developer Tools" %}     |
| Windows/Linux | {% icon "edge" %} Edge       | {% shortcut "Ctrl Shift I" %} | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| macOS         | {% icon "edge" %} Edge       | {% shortcut "Cmd Opt I" %}    | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| Windows/Linux | {% icon "firefox" %} Firefox | {% shortcut "Ctrl Shift I" %} | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| macOS         | {% icon "firefox" %} Firefox | {% shortcut "Cmd Shift I" %}  | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| macOS         | {% icon "safari" %} Safari   | {% shortcut "Cmd Shift I" %}  | {% menu "Develop" "Show Web Inspector" %}            |

While the built-in web developer tools offer excellent features that make it easy to work with Web Components, to add
some extra functionality you can make use of some excellent browser extensions which add even more tools to help develop
Web Components:

- [Web Component DevTools by Matsuuu][matsuu]

## Development Environment

To get started writing web components you'll need a development environment. While you can use any text editor to
develop, using an Integrated Development Environment (IDE) will give you lots of features that can make for a much
better developer experience. One of the most popular IDEs today is [VS Code][vscode], and with good reason. It comes
with excellent support for writing HTML, JavaScript and CSS out of the box as well as some great plugins that you can
install. It can hook directly into web browsers like Chrome or Firefox using the allowing you to debug your applications
without leaving your editor. All of these features make it ideal for writing Web Components and websites that use them.

{% stub %}

[chrome]: https://www.google.com/chrome/
[firefox]: https://www.mozilla.org/en-GB/firefox/new/
[firefox-dev]: https://www.mozilla.org/en-GB/firefox/developer/
[edge]: https://www.microsoft.com/en-us/edge?form=MA13FJ
[macos]: https://support.apple.com/en-gb/macos
[safari]: https://www.apple.com/uk/safari/
[chrome-devtools]: https://developer.chrome.com/docs/devtools/
[firefox-devtools]: https://firefox-dev.tools/
[edge-devtools]: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview
[safari-devtools]: https://developer.apple.com/videos/play/tech-talks/401/
[matsuu]: https://matsuuu.github.io/web-component-devtools/
[vscode]: https://code.visualstudio.com/.
