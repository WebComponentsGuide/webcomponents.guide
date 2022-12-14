const css = require('eleventy-postcss-extension')
const highlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(css)
  eleventyConfig.addPlugin(highlight)

  eleventyConfig.addPassthroughCopy('images')
  eleventyConfig.addPassthroughCopy('browserconfig.xml')
  eleventyConfig.addPassthroughCopy('site.webmanifest')

  for(const group of require('./_data/groups.json')) {
    eleventyConfig.addCollection(group, (api) => {
      return api.getFilteredByGlob('learn/**/*.md')
        .filter(item => item.data.group === group)
        .sort((a, b) => a.data.order - b.data.order)
    })
  }

  eleventyConfig.addPairedShortcode("tip", (content, style = 'info') => `<div class="callout ${style}">
${content}

<svg class="icon"><use xlink:href="/images/icons.svg#${style}"></use></svg>
  </div>`);
}
