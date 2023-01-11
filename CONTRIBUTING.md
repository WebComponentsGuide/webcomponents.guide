# Contributing

Contributions are always welcome! Before contributing, please read the
[code of conduct](https://github.com/WebComponentsGuide/webcomponents.guide/blob/main/CODE_OF_CONDUCT.md).

## Where to start

- If you've found typos or mistakes in the documentation, please go right ahead and raise a PR!.
- If you're looking for issues to resolve, a good place to start is the
  [help wanted label](https://github.com/WebComponentsGuide/webcomponents.guide/labels/help%20wanted) and/or
  [good first issue label](https://github.com/WebComponentsGuide/webcomponents.guide/labels/good%20first%20issue).
- If you're contributing to larger pieces, like an idea or new section, tutorial, or blog post, then please raise an
  issue first! This way we can discuss an action plan and figure out a high level overview of what we should write.

### Setup

You can run the code locally by cloning the repository, and running `npm install` followed by `npm start`:

```sh
$ git clone git@github.com:WebComponentsGuide/webcomponents.guide
$ cd webcomponents.guide
$ npm install
$ npm start
```

You can now visit <http://localhost:8080/> to see the local copy of the website. As you edit files the website will
automatically rebuild, and you can see the changes reflected in your browser.

### Running checks/tests

When making contributions, please make sure to run `npm run check`, to make sure your contributions are correctly
formatted and spelled. You can also run `npm run format` to automatically format all files.
