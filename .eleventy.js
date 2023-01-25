const css = require("eleventy-postcss-extension")
const markdown = require("markdown-it")
const headers = require("markdown-it-github-headings")
const js = require("@jamshop/eleventy-plugin-esbuild")
const glob = require("glob")
const path = require("node:path")
const fs = require("node:fs/promises")
const rss = require("@11ty/eleventy-plugin-rss")
const dedent = require("dedent")
const { build } = require("esbuild")

const buildJS = (config = {}) => {
  return build({
    minify: process.NODE_ENV === "development" ? false : true,
    bundle: true,
    splitting: true,
    write: true,
    format: "esm",
    metafile: true,
    outdir: "_site/script",
    plugins: [
      {
        name: "css",
        setup: (plugin) => {
          plugin.onResolve({ filter: /^.*\.css$/ }, ({ path, importer, resolveDir, kind }) => {
            return {
              path,
              namespace: "css",
              pluginData: { importer, resolveDir, kind },
            }
          })
          plugin.onLoad({ filter: /^.*\.css$/, namespace: "css" }, async (ctx) => {
            const { default: stringToTemplateLiteral } = await import("string-to-template-literal")
            let contents = await fs.readFile(path.resolve(ctx.pluginData.resolveDir, ctx.path), "utf8")

            contents = `const c = new CSSStyleSheet(); c.replaceSync(${stringToTemplateLiteral(
              contents
            )}); export default c;`

            return { contents, resolveDir: ctx.pluginData.resolveDir }
          })
        },
      },
    ],
    ...config,
  })
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(rss)
  eleventyConfig.addPlugin(css)

  const entryPoints = glob.sync("script/*.[tj]s")
  eleventyConfig.addWatchTarget("script/*.[tj]s")

  buildJS({ entryPoints })

  eleventyConfig.on("beforeWatch", (changedFiles) => {
    // Run me before --watch or --serve re-runs
    if (changedFiles.some((watchPath) => watchPath.endsWith(".css") || entryPoints.includes(watchPath))) {
      buildJS({ entryPoints })
    }
  })

  eleventyConfig.addFilter("iso8601", rss.dateToRfc3339)
  eleventyConfig.addFilter("date_to_rfc3339", rss.dateToRfc3339)
  eleventyConfig.addFilter("date_to_rfc822", rss.dateToRfc822)
  eleventyConfig.addFilter("html_to_absolute_urls", rss.convertHtmlToAbsoluteUrls)
  eleventyConfig.addFilter("domain", (str) => new URL(str).hostname)

  const md = markdown({
    html: true,
    linkify: true,
    highlight: (str, lang) => {
      return `<pre><code-interactive lang="${lang}">${md.utils.escapeHtml(str)}</code-interactive></pre>`
    },
  })
    .use(headers, { prefixHeadingIds: false })
    .disable("code")

  eleventyConfig.setLibrary("md", md)

  eleventyConfig.addPassthroughCopy("images")
  eleventyConfig.addPassthroughCopy("browserconfig.xml")
  eleventyConfig.addPassthroughCopy("site.webmanifest")
  eleventyConfig.addPassthroughCopy("key.gpg")

  eleventyConfig.addGlobalData("discord", "https://discord.gg/CqhDNXepDV")
  eleventyConfig.addGlobalData("baseurl", "https://webcomponents.guide")
  eleventyConfig.addGlobalData("repository", "https://github.com/WebComponentsGuide/webcomponents.guide")
  eleventyConfig.addGlobalData("mastodon", "https://fosstodon.org/@webcomponentsguide")

  const customGroups = require("./_data/groups.json")

  for (const [type, groups] of Object.entries(customGroups)) {
    for (const group of groups) {
      eleventyConfig.addCollection(group, (api) => {
        return api
          .getFilteredByGlob(`${type}/**/*.md`)
          .filter((item) => item.data.group === group)
          .sort((a, b) => a.data.order - b.data.order)
      })
    }
  }

  eleventyConfig.addCollection("tutorials", (api) => {
    return api.getFilteredByGlob("tutorials/*-tutorial/index.md").sort((a, b) => a.data.order - b.data.order)
  })

  const icon = (icon) =>
    `<svg width="24" height="24" class="icon icon-${icon}"><use xlink:href="/images/icons.svg#${icon}"></use></svg>`
  const callout = (content, style = "info") =>
    dedent`
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
  const picture = (name) =>
    `<picture>
      <source srcset="/images/${name}.avif" type="image/avif">
      <source srcset="/images/${name}.webp" type="image/webp">
      <img src="/images/${name}.jpg">
    </picture>
  `

  eleventyConfig.addShortcode("icon", icon)
  eleventyConfig.addShortcode("picture", picture)
  eleventyConfig.addFilter("picture", picture)
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
    const out = `${content}
<script type="module" defer>
  document.addEventListener('readystatechange', () => {\n${js.join("\n")}\n})
</script>
<h6>Result</h6>
<div class="surface">
${html}
</div>
    `
    return out
  })
}
