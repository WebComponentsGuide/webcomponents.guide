const dynamicElements = new Map()

const ready = new Promise((resolve) => {
  if (document.readyState !== "loading") {
    resolve()
  } else {
    document.addEventListener("readystatechange", () => resolve(), {
      once: true,
    })
  }
})

const timers = new WeakMap()
function scan(node) {
  cancelAnimationFrame(timers.get(node) || 0)
  timers.set(
    node,
    requestAnimationFrame(async () => {
      for (const [tagName, cb] of dynamicElements) {
        const child = node.matches(tagName) ? node : node.querySelector(tagName)
        if (!(customElements.get(tagName) || child?.matches(":defined"))) {
          const module = await cb()
          let ElementConstructor
          if (module[Symbol.toStringTag] === "Module" && module.default) {
            ElementConstructor = module.default
          } else if ("prototype" in module && module.prototype instanceof HTMLElement) {
            ElementConstructor = module
          } else {
            throw new Error(`invalid module for custom element ${tagName}`)
          }
          await ready
          if (typeof ElementConstructor.define === "function") {
            ElementConstructor.define(tagName)
          } else {
            customElements.define(tagName, ElementConstructor)
          }
        }
        dynamicElements.delete(tagName)
        timers.delete(node)
      }
    })
  )
}

let elementLoader
export function lazyDefine(tagName, callback) {
  if (dynamicElements.has(tagName)) {
    throw new Error(`cannot define already defined element ${tagName}`)
  }
  dynamicElements.set(tagName, callback)

  scan(document.body)

  if (!elementLoader) {
    elementLoader = new MutationObserver((mutations) => {
      if (!dynamicElements.size) return
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) scan(node)
        }
      }
    })
    elementLoader.observe(document, { subtree: true, childList: true })
  }
}

lazyDefine("code-interactive", () => import("./code-interactive.js"))
lazyDefine("relative-time", () => import("./relative-time.js"))
lazyDefine("tag-name-input", () => import("./tag-name-input.js"))
