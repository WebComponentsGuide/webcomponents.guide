---
order: 3
group: Getting Started
title: Setting Up Your Environment
---

## Web Browser

Web Components are a native web technology, so the most important tool will be your web browser. Pick a browser you're
comfortable using, but it's a good idea to make sure you pick one with a good set of developer tools built in. A good
set of devtools makes it much easier to debug your application. A lot of developers use [Google's Chrome
browser][chrome], which has powerful built in devtools. [Mozilla Firefox][firefox] is another great option with equally
good devtools. There's also Mozilla [Firefox Developer edition][firefox-dev] which has extra features, like an
Integrated Development Environment. [Microsoft Edge][edge] is another great browser, built on the same technologies as
Google Chrome. If you're on [MacOS][macos] then [Safari][safari] can be a good choice, but it's not quite as capable as
the other browsers. Safari's devtools aren't quite as capable as the others, and it lacks support for some Web Component
features.

To test your applications, it can be useful to install all four browsers. Running your application in a variety of
browsers can uncover cross browser bugs, or missing features. Getting comfortable with using the devtools in each is a
good idea.

It's a great idea to keep your browsers up to date as often as possible. Browsers tend to update automatically, unless
your computer has a policy disabling updates. If you can't easily keep your browser up to date then try using an
extended support release (for example [Firefox ESR][firefox-esr] or [Chrome's Extended Stable][chrome-esr]). If you're
using Safari then your Safari version is tied to your operating system version. Try to keep up to date with the latest
versions of macOS and iOS to keep your Safari version up to date.

If you're using an older browser - such as Microsoft Edge 18 or below, or Internet Explorer - then it's an excellent
time to upgrade! New browsers like [Microsoft Edge latest][edge] are way more capable and much faster than these older
browsers! Older browsers like Internet Explorer, or forked versions of Firefox like [SeaMonkey][seamonkey] don't have
support for Web Components. If you want to use or support them you'll need to add ["polyfills"][polyfills] to get them
to work. See the [support and polyfills][polyfills] section for more on that.

[chrome]: https://www.google.com/chrome/
[firefox]: https://www.mozilla.org/en-GB/firefox/new/
[firefox-dev]: https://www.mozilla.org/en-GB/firefox/developer/
[edge]: https://www.microsoft.com/en-us/edge?form=MA13FJ
[macos]: https://support.apple.com/en-gb/macos
[safari]: https://www.apple.com/uk/safari/
[firefox-esr]: https://www.mozilla.org/en-GB/firefox/enterprise/
[chrome-esr]: https://support.google.com/chrome/a/answer/9027636?hl=en
[seamonkey]: https://www.seamonkey-project.org/
[polyfills]: /learn/support-and-polyfills

### Web Browser Devtools

A good set of browser developer tools which will enable you to inspect your web applications under the hood and see how
it all operates. They can be quite intimidating at first, but there are some great resources out there to learn how to
make the most of them.

If you're using Google Chrome, check out the [Chrome Developers documentation on the Chrome Devtools][chrome-devtools].
It's a great resource for learning exactly how the developer tools inside Google Chrome work. Mozilla has a similar
[guide on Firefox Developer Tools][firefox-devtools]. Microsoft have a smaller but still useful [guide on the Edge
developer tools][edge-devtools]. Apple's Safari has a useful [five minute walkthrough of their Web
Inspector][safari-devtools].

Here's a handy guide on how to quickly access the developer tools, depending on your browser and OS:

[chrome-devtools]: https://developer.chrome.com/docs/devtools/
[firefox-devtools]: https://firefox-dev.tools/
[edge-devtools]: https://learn.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/overview
[safari-devtools]: https://developer.apple.com/videos/play/tech-talks/401/

| OS            | Browser                      | Keyboard shortcut             | Menu                                                 |
| :------------ | :--------------------------- | :---------------------------- | :--------------------------------------------------- |
| Windows/Linux | {% icon "chrome" %} Chrome   | {% shortcut "Ctrl Shift I" %} | {% menu "more" "More Tools" "Developer Tools" %}     |
| macOS         | {% icon "chrome" %} Chrome   | {% shortcut "Cmd Opt I" %}    | {% menu "more" "More Tools" "Developer Tools" %}     |
| Windows/Linux | {% icon "edge" %} Edge       | {% shortcut "Ctrl Shift I" %} | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| macOS         | {% icon "edge" %} Edge       | {% shortcut "Cmd Opt I" %}    | {% menu "more-v" "More Tools" "Developer Tools" %}   |
| Windows/Linux | {% icon "firefox" %} Firefox | {% shortcut "Ctrl Shift I" %} | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| macOS         | {% icon "firefox" %} Firefox | {% shortcut "Cmd Shift I" %}  | {% menu "menu" "More Tools" "Web Developer Tools" %} |
| macOS         | {% icon "safari" %} Safari   | {% shortcut "Cmd Shift I" %}  | {% menu "Develop" "Show Web Inspector" %}            |

## Development Environment

To get starting writing web components you'll need a development environment. While you can use any text editor to
develop, using an Integrated Development Environment (IDE) will give you lots of features that can make for a much
better developer experience. One of the most popular IDEs today is [VS Code][vscode], and with good reason! It comes
with exelent support for writing HTML, JavaScript and CSS out of the box as well as some great plugins that you can
install. It can hook directly into web browsers like Chrome or Firefox using the allowing you to debug your applications
without leaving your editor. All of these features makes it ideal for writing Web Components and websites that use them.

Some recommended extensions for developing components within VS Code are:

-

[vscode]: https://code.visualstudio.com/.

{% stub %}
