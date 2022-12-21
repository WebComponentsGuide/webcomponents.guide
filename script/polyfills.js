import "container-query-polyfill"
import "@oddbird/popover-polyfill"

/* Declarative ShadowDOM polyfill */
function attachShadowRoots(root) {
  root.querySelectorAll("template[shadowroot]").forEach((template) => {
    const mode = template.getAttribute("shadowroot")
    const shadowRoot = template.parentNode.attachShadow({ mode })
    shadowRoot.appendChild(template.content)
    template.remove()
    attachShadowRoots(shadowRoot)
  })
}
attachShadowRoots(document)
