module.exports = {
  layout: "learn.html",
  tags: ["learn"],
  eleventyComputed: {
    nextGroup(data) {
      const i = data.groups.indexOf(data.group)
      return i >= 0 ? data.groups[i + 1] : null
    },
    prevGroup(data) {
      const i = data.groups.indexOf(data.group)
      return i >= 0 ? data.groups[i - 1] : null
    }
  }
}
