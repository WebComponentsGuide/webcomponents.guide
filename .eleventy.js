const css = require('eleventy-postcss-extension')
const hydrateShadowDOM = require('./eleventy-hydrate-shadow-dom')
module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(css)
  eleventyConfig.addPlugin(hydrateShadowDOM)
  eleventyConfig.addPassthroughCopy('images')
}
