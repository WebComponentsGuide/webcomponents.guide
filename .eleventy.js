const css = require('eleventy-postcss-extension')
const EngineCSS = require('eleventy-postcss-extension/EngineCSS.js')
const {readFile} = require('node:fs/promises')
const cheerio = require('cheerio')
const postcssrc = require('postcss-load-config')
const cssCompile = new EngineCSS()
cssCompile.loaded = false

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(css)

  const shadows = new Map()
  const styles = new Map()
  eleventyConfig.addExtension("html", {
    compile: async function (inputContent, inputPath) {

      if (!cssCompile.loaded) {
        const {plugins, options} = await postcssrc()
        cssCompile.setPlugins(plugins)
        cssCompile.setOptions(options)
        cssCompile.loaded = true
      }

      return async function (data) {
        const $ = cheerio.load(await this.defaultRenderer(data))
        const seen = new Set()
        for(const el of $('*')) {
          if (!el.name.includes('-') || seen.has(el)) continue
          seen.add(el)
          try {
            if (!shadows.has(el.name)) {
              shadows.set(el.name, await readFile(`_includes/components/${el.name}.html`, 'utf-8'))
            }
          } catch {
            shadows.set(el.name, '')
          }
          try {
            if (!styles.has(el.name)) {
              const path = `_includes/components/${el.name}.css`
              let css = await readFile(path, 'utf-8')
              styles.set(el.name, await cssCompile.processCSS(css, {inputPath: path}))
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
        return $.root().html()
      }
    }
  })
}
