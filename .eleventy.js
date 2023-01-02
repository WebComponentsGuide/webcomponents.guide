const css = require("eleventy-postcss-extension")
const markdown = require("markdown-it")
const headers = require("markdown-it-github-headings")
const js = require("@jamshop/eleventy-plugin-esbuild")
const glob = require("glob")
const path = require("node:path")
const highlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const dedent = require("dedent")

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(css)
  eleventyConfig.addPlugin(js, {
    entryPoints: Object.fromEntries(glob.sync("script/*.[tj]s").map((e) => [path.basename(e, path.extname(e)), e])),
    output: "_site/script",
  })
  eleventyConfig.addPlugin(highlight)

  eleventyConfig.setLibrary(
    "md",
    markdown({
      html: true,
      linkify: true,
    })
      .use(headers, { prefixHeadingIds: false })
      .disable("code")
  )

  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("browserconfig.xml")
  eleventyConfig.addPassthroughCopy("site.webmanifest")

  eleventyConfig.addGlobalData("repository", "https://github.com/WebComponentsGuide/webcomponents.guide")

  const customGroups = require("./_data/groups.json")

  for (const group of customGroups.learn) {
    eleventyConfig.addCollection(group, (api) => {
      return api
        .getFilteredByGlob("learn/**/*.md")
        .filter((item) => item.data.group === group)
        .sort((a, b) => a.data.order - b.data.order)
    })
  }

  eleventyConfig.addCollection("tutorials", (api) => {
    return api.getFilteredByGlob("tutorials/*-tutorial/index.md").sort((a, b) => a.data.order - b.data.order)
  })

  const icon = (icon) =>
    `<svg width="24" height="24" class="icon icon-${icon}"><use xlink:href="/images/icons.svg#${icon}"></use></svg>`
  const callout = (content, style = "info") => dedent`
    <div class="callout ${style}">
    ${content}
    ${icon(style)}
    </div>`
  const keymap = {
    Cmd: icon("command"),
    Opt: icon("option"),
    Shift: icon("shift"),
  }
  const shortcut = (str) =>
    str
      .split(/ /g)
      .map((key) => `<kbd>${keymap[key] || key}</kbd>`)
      .join("+")
  const menumap = {
    more: icon("more"),
    "more-v": icon("more-v"),
    menu: icon("menu"),
  }
  const menu = (first, ...rest) => [menumap[first] || `<strong>${first}</strong>`, ...rest].join(icon("chevron-right"))

  eleventyConfig.addShortcode("icon", icon)
  eleventyConfig.addShortcode("shortcut", shortcut)
  eleventyConfig.addShortcode("menu", menu)
  eleventyConfig.addShortcode("stub", function () {
    return callout(
      dedent`
        <p>
        This section is incomplete!
        You can help out by
        <a href="https://github.com/WebComponentsGuide/webcomponents.guide/blob/main/${this.page.inputPath}">
        contributing documentation here
        </a>!</p>
      `,
      "github"
    )
  })

  eleventyConfig.addPairedShortcode("tip", callout)
  eleventyConfig.addPairedShortcode("demo", (content) => {
    let js = []
    let html = []
    let mode = ""
    for (const line of content.split(/\n/g)) {
      if (line.trim().startsWith("```js")) {
        mode = "js"
        continue
      } else if (line.trim().startsWith("```html")) {
        mode = "html"
        continue
      } else if (line.trim() === "```") {
        mode = ""
        continue
      }
      if (mode === "js") {
        js.push(line)
      } else if (mode === "html") {
        html.push(line)
      }
    }
    return dedent`
    ${content}

    <script type="module" defer>
      document.addEventListener('readystatechange', () => {
        ${js.join("\n")}
      })
    </script>
    <h6>Result</h6>
    <div class="surface">
    ${html}
    </div>
    `
  })
}
