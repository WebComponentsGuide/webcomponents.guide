module.exports = {
  layout: "learn.html",
  tags: ["tutorial"],
  eleventyComputed: {
    nextTitle(data) {
      const groups = data.groups["toot-embed-tutorial"]
      const i = groups.indexOf(data.group)
      return i >= 0 ? groups[i + 1] : null
    },
    prevTitle(data) {
      const groups = data.groups["toot-embed-tutorial"]
      const i = groups.indexOf(data.group)
      return i >= 0 ? groups[i - 1] : null
    },
  },
}
