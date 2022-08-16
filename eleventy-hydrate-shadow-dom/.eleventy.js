const EngineCSS = require('eleventy-postcss-extension/EngineCSS.js')
const {readFile} = require('node:fs/promises')
const cheerio = require('cheerio')
const postcssrc = require('postcss-load-config')
const cssCompile = new EngineCSS()
cssCompile.loaded = false
async function readCSS(path) {
  if (!cssCompile.loaded) {
    const {plugins, options} = await postcssrc()
    cssCompile.setPlugins(plugins)
    cssCompile.setOptions(options)
    cssCompile.loaded = true
  }
  let css = await readFile(path, 'utf-8')
  return await cssCompile.processCSS(css, {inputPath: path})
}
module.exports = eleventyConfig => {
  const shadows = new Map()
  const styles = new Map()
  eleventyConfig.addTransform("hydrate-shadow-dom", async function (content) {
    if (!this.outputPath.endsWith(".html")) return content

    const $ = cheerio.load(content)
    for(const el of $('*')) {
      if (!el.name.includes('-')) continue
      try {
        if (!shadows.has(el.name)) {
          shadows.set(el.name, await readFile(`_includes/components/${el.name}.html`, 'utf-8'))
        }
      } catch {
        shadows.set(el.name, '')
      }
      try {
        if (!styles.has(el.name)) {
          styles.set(el.name, await readCSS(`_includes/components/${el.name}.css`))
        }
      } catch {
        styles.set(el.name, '')
      }
      const existing = $('template[shadowroot]', el)
      const shadow = shadows.get(el.name)
      const style = styles.get(el.name)
      if ((shadow || style) && !existing.length) {
        $(el).prepend(`<template shadowroot="open"><style>${style}</style>${shadow}</template>`)
      }
    }
    shadows.clear()
    styles.clear()
    return $.root().html()
  })
}
