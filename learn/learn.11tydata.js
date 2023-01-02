module.exports = {
  layout: "learn.html",
  section: "learn",
  tags: ["learn"],
  eleventyComputed: {
    nextGroup(data) {
      const i = data.groups.learn.indexOf(data.group)
      return i >= 0 ? data.groups.learn[i + 1] : null
    },
    prevGroup(data) {
      const i = data.groups.learn.indexOf(data.group)
      return i >= 0 ? data.groups.learn[i - 1] : null
    },
  },
}
