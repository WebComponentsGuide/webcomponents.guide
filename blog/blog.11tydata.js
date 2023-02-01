const { AssetCache } = require("@11ty/eleventy-fetch")
module.exports = {
  layout: "blog.html",
  permalink: "/blog/{{ page.fileSlug }}/",
  tags: ["blog"],
  eleventyComputed: {
    async mentions(data) {
      const fetch = (await import("node-fetch")).default
      const url = `${data.baseurl}/blog/${data.page.fileSlug}/`
      const apiUrl = `https://webmention.io/api/mentions.jf2?target=${url}&per-page=1000`
      console.log("Fetching web mentions", apiUrl)
      let asset = new AssetCache(apiUrl)
      if (asset.isCacheValid("1h")) {
        console.log("Returning now data from cache")
        return await asset.getCachedValue()
      }
      const res = await fetch(apiUrl)
      const json = await res.json()
      const { children } = json
      await asset.save(children, "json")
      return children
    },
    async likes(data) {
      const mentions = (await data.mentions) || []
      return mentions.filter((mention) => mention["wm-property"] === "like-of")
    },
    async reposts(data) {
      const mentions = (await data.mentions) || []
      return mentions.filter((mention) => mention["wm-property"] === "repost-of")
    },
    async replies(data) {
      const mentions = (await data.mentions) || []
      return mentions.filter((mention) => mention["wm-property"] === "in-reply-to")
    },
    async announcePost(data) {
      const mentions = (await data.mentions) || []
      for (const mention of mentions) {
        if (mention.url.startsWith(data.mastodon)) {
          const url = new URL(mention.url)
          url.hash = ""
          return url.toString()
        }
      }
      return ""
    },
  },
}
