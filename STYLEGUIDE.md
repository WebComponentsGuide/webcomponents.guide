# Style Guide

Our aim is to teach developers how to build great Web Components. An important part of that is writing great
documentation, that's not only correct but easy to ingest. Good prose allows people to learn quickly and easily.

## Audience

Write content for people who:

- Are developers. Do not shy away from general developer terms like "linting" or "array".

- Already know some JavaScript, but maybe are not familiar with some of the newer features (especially class related
  features, many of which are new). Assume the reader is comfortable writing ES6 code. Any language features newer than
  ES6 should be accompanied by links or explanations.

- May or may not have used front-end libraries and frameworks before. While it might be safe to assume they have, it's
  safer to avoid analogies to other frameworks. Assume the reader is comfortable with HTML.

- Comfortable reading and seeing code. If you're introducing a concept and it becomes difficult to explain without
  multiple paragraphs, consider using a code example to explain an idea. Just make sure not to introduce a lot of new
  code at once. Each code blocks should only introduce one or two new concepts related to the section.

- Are not front-end experts, but need or want to learn this technology to complete a task or improve their
  understanding. Avoid assuming knowledge about front end concepts like the Events, or UI paradigms.

- Are not accessibility experts. Accessibility is very important to cover, but do not assume the reader is confident
  with using assistive tools, or has a robust understanding of assistive technologies.

While we want to reach an audience that is perhaps new to development, we want to avoid our content leaning toward
introducing readers to JavaScript & HTML in general. Keep focused on Web Components and related technologies. If you're
covering language features, explain them within the context of Web Components, rather than a general explanation of how
the feature works.

### Language & Locale

Write content in US English, but with a view to readers who may not speak English as their first language. Avoid overuse
of English cultural references. Avoid long words.

Make use of the `npm run check` command which can lint for issues around readability & spelling.

## Medium

Write content knowing that people are reading this on the web. Read [the Nielsen Norman article on How Users Read on the
Web][how-users-read-web]. Some important takeaways:

- Many people scan a page. Make sure a page is easy to scan. Headings and bullet points are helpful here.

- Web users are busy. Stick to facts. Avoid overly verbose sentences.

- Avoid "marketese". Avoid making bold claims about a feature. Again, stick to facts.

- Break a page into meaningful subheadings. This helps readers find content useful for them.

- Introduce one idea per paragraph, and try to introduce it in the first few words. This allows readers to skip ideas
  they know.

The web is interactive - we should embrace that and leverage it. Interactive demos are often better learning tools than
lots of words. Colorful diagrams, animations, interactive forms are all welcome. Avoid "flashy" animations though. Any
interactive demos, diagrams or animations should move the reader toward learning.

## Voice

All writing has a voice. Ours should be concise, somewhat casual and friendly, but factual:

- Write in the [active voice][active-voice]. Describe things as if they are happening, rather than have happened.

- Value the readers time. Be incisive. Each sentence should produce value in moving the reader toward learning. Keep
  sentences under 20 words. Try to keep paragraphs under 5 sentences. An individual page should take less than 10
  minutes to read (that's roughly 200 lines of markdown). Break up longer pages into multiple sections.

- Content should be serious, but does not need to be stuffy or pompous. Write as if you're explaining a concept as a
  mentor, or speaking at a conference, not as if you're lecturing in front of a podium.

- Write in a casual tone, but avoid overly conversational phrases. Feel free to use contractions like "it's" or
  "you're", but try to avoid being too casual. Avoid phrases like "check this out".

- Each section should ideally stand by itself. It won't need introductions or transitions between sections or pages.
  Avoid trying to encourage the reader to read on. Don't greet the reader with "hello" or "welcome" or "in this section
  we'll...". If a sentence starts with "Let's" then it's a good sign it should be reworded or removed.

- Try to write without strong emotions, as it can reduce the confidence the reader has in us - the author. Suggesting
  things will be "fun" or "painful" can make text sound like marketing. Don't make use of exclamation points, as they
  imply a statement is surprising.

- Avoid caveats or hedging statements, they reduce confidence. Avoid words like "generally", "sometimes". Don't use
  phrases like "you might be able to" or "it can be".

- Outside of the Blog, avoid speaking personally. Avoid referring to "we" or "I". Similarly steer away from overuse of
  the word "you", especially if it can come across presumptive. E.g. "you might not know" or "you've already...".

## Structure

Each page should cover a discrete topic - but topics can span multiple pages when they get complex.

### Introductory paragraphs

Following the [inverted pyramid][inverted-pyramid], write most important need-to-know content in the first few
paragraphs, directly under the main headline of the page. Try to impart a conclusion within the first few paragraphs,
and use the rest of the page to expand on the details or nuance of that conclusion.

Imagine the reader can only read the first paragraph. What information would they take away? Could they reach a
conclusion that would be the same if they read the whole page?

The first paragraph may introduce a new concept. Try to introduce it with a motivation; why is it important for Web
Components? Avoid "filler" intros which are there to lead a reader to the rest of the page.

#### A good introductory paragraph

> Web Components can be defined either a _Autonomous Custom Elements_ or as _Customized Built-in Elements_. The most
> popular way to make elements is to use the Autonomous Custom Element style, by making up your own tag and extending
> HTMLElement. Each style comes with different trade-offs.

- This introduces the core concepts the page will expand upon; the two types of Web Component. These are also introduced
  in the first sentence.
- It gives the reader a quick conclusion up front; "the most popular way to make elements is". The reader could stop
  reading here, and still have learned something.
- It avoids unnecessary sentences, it does not have preamble.
- Each sentence is one fact.

#### Bad introductory paragraphs

> In this section we'll talk about the different types of Web Components you can define. One way is with _Autonomous
> Custom Elements_. Another is _Customized Built-in Elements_. It's up to you which one to chose, each has different
> trade-offs.

- The first sentence is an unnecessary introduction. It does not add any new information - as the reader can infer what
  the page is about from the title.
- Two sentences are devoted to defining the two types of components, but they rely on each other for context. Take each
  sentence out of the paragraph and it doesn't have any meaning.
- The reader is not left with any decisive information, instead now have a choice and no information on how to make that
  decision.

> Web Components can either be an _Autonomous Custom Element_ or a _Customized Built-in Element_. Picking one or the
> other will have trade-offs around CSS & Styling, ShadowDOM, Nesting & Semantics, Behavior & API, Accessibility, and
> more. Read on for more detail...

- While the first sentence leads right in to the topic, the second sentence overwhelms the reader in trying to summarize
  all the talking points in the page.
- The reader still has no take-away conclusion of which style to chose.
- Readers will likely get a sense that this decision is complex and maybe a wrong choice is dangerous.
- The last sentence is unnecessary; it's implied that the rest of the page will offer more detail. Our aim is to get the
  reader to a conclusion quickly, not to entice them to read an article.

### Headings

Headings should be used to break up the page into individual talking points. Not only does this anchor a reader to what
a section is for, but it's also really useful for linking readers to specific content.

- Each page has an `H1`, so headings within a page should start at `H2` (`##`). If a topic needs breaking down much
  beyond `H3` (`###`) that could be a sign that it needs to be across multiple pages.

- Headers should be unique within a page, as this means each one can be linked to.

- Don't rely too heavily on the context of a higher level heading, but avoid repetition among headers. Avoid generic
  headings like "Introduction" or "More detail".

- Avoid more than 5 consecutive paragraphs between headings. This is an indicator that multiple concepts are being
  discussed. Break it down.

- Avoid more than one block of code per heading; if you need more than one code example to explain a concept then
  consider breaking down the concept, or refactoring the code.

- Headings should not end in punctuation. Question in headings are best avoided - headings should be answers. Similarly,
  avoid titles starting "How to" or "Here's how".

- Avoid code blocks in headings. These are tricky to read and can result in the links being messy.

Some examples of good and bad headings:

- ❌ How to declare a template
- ✓ Declare a template in HTML

- ❌ Naming elements
- ✓ Make element names concise, but clear

- ❌ What methods are available on EventTarget?
- ✓ Available methods on EventTarget

- ❌ See also
- ✓ Further reading on Web Browsers

### Code

Code examples are a very useful tool to explain concepts, but they should be treated with care.

- Make sure each code example has a paragraph explaining what the code does or how it behaves. Code examples should not
  be in place of prose, they should reinforce the prose. Think of them like figures.

- Make sure all code examples run! Good code examples can be copied and pasted into the browsers devtools and produce an
  output that helps the reader understand the concept.

- Use comments, `console.log`, or `console.assert` to explain code, but use them sparingly. Keep comments short, only
  explaining the very next block of code. If a comment is more than a couple of lines then move it outside into a
  paragraph. Code comments or `console` statements are useful for highlighting the specific concept a section is talking
  about.

- Keep code samples less than 50 lines of code. Break up pages with more than 200 lines of code, or otherwise reduce the
  code within them.

- Make sure code examples are well motivated. Avoid overly contrived code, including [metasyntactic
  variables][metasyntactic-variables]. Write code that you'd feel comfortable introducing into a code base.

### Call outs

Keeping focused on a topic is important, but it can result in losing useful but tangential points. Using callouts (or
asides) is a great way to keep this content, and make it more useful.

Consider using callouts sparingly. Excessive use of callouts as they can be noisy. Keep them to under 5 per page. Keep
callouts to one paragraph long. Do not add code examples to a callout. If you can use an image, animation, or
interactive demo instead of a callout, do that instead.

To use a callout, put a paragraph between `{% tip "type" %}` and `{% endtip %}`. Three main types of callouts are used
on the site:

- Informational (`"info"`): This can be used to add additional context that would otherwise deviate from the main
  talking point. Useful for describing for tips and tricks, asides, etymology or definition of terms.

- Warning (`"warn"`): This can be used to describe pitfalls or constraints around an API. Useful for describing gotchas,
  that wouldn't result in an error but might be surprising for a reader.

- Danger (`"danger"`): This can be used to describe error scenarios or things that won't work. Useful for describing
  when an API throws a validation error.

### Concepts vs APIs

Concepts should either be proper nouns like Web Components, acronyms like HTML, or phrases like _private state_.
Italicize phrases to highlight that they are concepts to the reader. Always use title case for proper nouns (so never
"web components", always "Web Components"). Italicizing concepts also helps to highlight when a paragraph is talking
about too many concepts at one time. Concepts should be consistently named across the page.

APIs are concrete versions of concepts. For example Shadow DOM is a concept, `ShadowRoot` is a concrete class. Always
quote APIs in back ticks. Take care to avoid mixing concepts and APIs especially when they are closely related -
`ShadowRoot` is synonymous with _Shadow DOM_.

APIs should be treated like verbs, for example refer to code acting on a `ShadowRoot`, while concepts should be treated
like nouns. Don't prepend articles to concepts, for example it's "Shadow DOM" not "the Shadow DOM".

Take care with acronyms. Only use acronyms when you have high confidence the target audience will already know the
acronym. HTML, DOM, API - these are all acceptable acronyms for the target audience. Avoid making acronyms of new
concepts, for example always use Declarative Shadow DOM. As a general rule, if you need to explain an acronym within
your prose, then don't use it.

Concepts are useful for capturing a group of APIs, or a technique. For example a Declarative ShadowDOM refers to a
`template` with a `shadowroot=` _attribute_ inside of HTML. A concept needs to be set up before its use on a page, but
once it has been explained, you can continue to refer to it without having to recover the APIs it's comprised of.

## Ending notes, summaries

Pages can end abruptly when a section has ended. They do not need to summarize or conclude the topic.

Do not try to write prose transitioning to the next page, as not only is this unnecessary but it can also make moving
pages around more difficult.

Summaries can be useful for reinforcing complex information throughout the document, but use them sparingly. A summary
should stand a lone as useful content, and not try to clarify unclear content.

[how-users-read-web]: https://www.nngroup.com/articles/how-users-read-on-the-web/
[active-voice]: https://en.wikipedia.org/wiki/Active_voice
[inverted-pyramid]: https://www.nngroup.com/articles/inverted-pyramid/
[metasyntactic-variables]: https://en.wikipedia.org/wiki/Metasyntactic_variable
