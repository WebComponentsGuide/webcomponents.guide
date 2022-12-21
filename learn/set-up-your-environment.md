---
order: 3
group: Getting Started
title: Setting Up Your Environment
---

## Web Browser

Web Components are a web native platform technology, and so the most important part of your toolbelt will be your web
browser. Pick a browser you're comfortable using, but it's a good idea to make sure you pick one with a good set of
developer tools built in. A lot of developers use [Google's Chrome browser][chrome], which has incredibly powerful built
in developer tools that will make it easy for you to debug your applications. [Mozilla Firefox][firefox] is another
great option with an equally good set of developer tools and great support for Web Components. Mozilla also provide
[Firefox Developer edition][firefox-dev] which has additional features, such as an Integrated Development Environment.
[Microsoft Edge][edge] is another great browser which is built on the same technologies as Google Chrome. If you're on
[MacOS][macos] then [Safari][safari] can be a good choice, but it's not quite as capable as the other browsers when it
comes to developer tools and doesn't support quite as many web platform features as the other browsers.

It's a great idea to keep your browsers up to date as often as possible. The latest stable version of each browser is a
great choice, but if you can't easily access that, keeping it up to date with their extended support releases (for
example [Firefox ESR][firefox-esr] or [Chrome's Extended Stable][chrome-esr]) will enable you to get the most from your
browser. If you're using Safari then it's a really good idea to keep up to date with the major version which is released
yearly, but it might be okay to use a slightly older version, say, a major version number behind the latest.

If you're using an older browser - such as Microsoft Edge 18 or below, or Internet Explorer - then it's an excellent
time to upgrade! New browsers like [Microsoft Edge latest][edge] are way more capable and much faster than these older
browsers, and have much better support for Web Components!

[chrome]: https://www.google.com/chrome/
[firefox]: https://www.mozilla.org/en-GB/firefox/new/
[firefox-dev]: https://www.mozilla.org/en-GB/firefox/developer/
[edge]: https://www.microsoft.com/en-us/edge?form=MA13FJ
[macos]: https://support.apple.com/en-gb/macos
[safari]: https://www.apple.com/uk/safari/
[firefox-esr]: https://www.mozilla.org/en-GB/firefox/enterprise/
[chrome-esr]: https://support.google.com/chrome/a/answer/9027636?hl=en

### Web Browser Devtools

All of the most popular browsers come with an excellent set of developer tools which will enable you to inspect your web
applications under the hood and see how it all operates. They can be quite intimidating at first, but there are some
great resources out there to learn how to make the most of them.

If you're using Google Chrome, check out the [Chrome Developers documentation on the Chrome Devtools][chrome-devtools].
It's a great resource for learning exactly how the developer tools inside Google Chrome work. Mozilla has a similar
[guide on Firefox Developer Tools][firefox-devtools]. Microsoft have a smaller but still useful [guide on the Edge
developer tools][edge-devtools], and Safari has a useful [five minute walkthrough of their Web
Inspector][safari-devtools].

Here's a handy guide on how to quickly access the developer tools, depending on your browser and OS:

[chrome-devtools]: https://developer.chrome.com/docs/devtools/
[firefox-devtools]: https://firefox-dev.tools/
[edge-devtools]: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview
[safari-devtools]: https://developer.apple.com/videos/play/tech-talks/401/

| OS            | Browser         | Keyboard shortcut             | Menu                                                 |
| :------------ | :-------------- | :---------------------------- | :--------------------------------------------------- |
| Windows/Linux | Google Chrome   | {% shortcut "Ctrl Shift I" %} | {% menu "more" "More Tools" "Developer Tools" %}     |
| MacOS         | Google Chrome   | {% shortcut "Cmd Opt I" %}    | {% menu "more" "More Tools" "Developer Tools" %}     |
| Windows/Linux | Microsoft Edge  | {% shortcut "Ctrl Shift I" %} | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| MacOS         | Microsoft Edge  | {% shortcut "Cmd Opt I" %}    | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| Windows/Linux | Mozilla Firefox | {% shortcut "Ctrl Shift I" %} | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| MacOS         | Mozilla Firefox | {% shortcut "Cmd Shift I" %}  | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| MacOS         | Apple Safari    | {% shortcut "Cmd Shift I" %}  | {% menu "Develop" "Show Web Inspector" %}            |

## Development Environment

To get starting writing web components you'll need a development environment. While you can use any text editor to
develop, using an Integrated Development Environment (IDE) will give you lots of features that can make for a much
better developer experience. One of the most popular IDEs today is [VS Code][vscode], and with good reason! It comes
with exelent support for writing HTML, JavaScript and CSS out of the box as well as some great plugins that you can
install. It can hook directly into web browsers like Chrome or Firefox using the allowing you to debug your applications
without leaving your editor. All of these features makes it ideal for writing Web Components and websites that use them.

[vscode]: https://code.visualstudio.com/.

{% stub %}
