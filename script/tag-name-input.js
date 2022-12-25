import { validTagName, reservedTags, PCENChar, builtInTagMap } from 'eslint-plugin-custom-elements/lib/tag-names.js' 

const validChar = new RegExp(`^${PCENChar}$`)

customElements.define('tag-name-input', class extends HTMLInputElement {

  connectedCallback() {
    this.addEventListener('input', this)
    this.handleEvent()
  }

  handleEvent() {
    const {value} = this
    this.setCustomValidity('')
    let hint = ''
    if (value) {
      if (/[A-Z]/.test(value)) {
        this.setCustomValidity(`${value} is not valid, it cannot contain capital letters`)
      } else if (reservedTags.has(value)) {
        this.setCustomValidity(`${value} is not valid, it's a reserved tag`)
      } if (!(value.includes('-'))) {
        this.setCustomValidity(`${value} is not valid, it must include a dash (-)`)
      } else if (value.startsWith('-')) {
        this.setCustomValidity(`${value} is not valid, it must not start with a dash (-)`)
      } else if (!(/^[a-z]/.test(value))) {
        this.setCustomValidity(`${value} is not valid, it must start with a letter (a-z)`)
      } else if (!validTagName(value)) {
        const chars = new Set()
        for (const char of value) {
          if (!(validChar.test(char))) chars.add(char)
        }
        this.setCustomValidity(`${value} is not a valid tag name, cannot contain ${[...chars].join(', ')}`)
      }
      
      const parts = value.split(/-/g)
      for (const part in parts) {
        if (part in builtInTagMap) {
          hint = `${value} is similar to the built-in ${builtInTagMap[part]}`
        }
      }

    }
    this.reportValidity()
    const errorEl = this.parentElement.querySelector('.error span')
    errorEl.textContent = this.validationMessage
    const hintEl = this.parentElement.querySelector('.hint span')
    hintEl.textContent = hint
  }

}, { extends: 'input' })
