import {validTagName, reservedTags, PCENChar } from 'eslint-plugin-custom-elements/lib/tag-names.js' 

const validChar = new RegExp(`^${PCENChar}$`)

customElements.define('tag-name-input', class extends HTMLInputElement {

  connectedCallback() {
    this.addEventListener('input', this)
    this.handleEvent()
  }

  handleEvent() {
    const {value} = this
    this.setCustomValidity('')
    if (value) {
      if (!(/[A-Z]/.test(value))) {
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
        const chars = []
        for (const char of value) {
          if (!(validChar.test(char))) chars.push(char)
        }
        this.setCustomValidity(`${value} is not a valid tag name, cannot contain ${chars.join(', ')}!`)
      }
    }
    this.reportValidity()
    this.parentElement.querySelector('.error').textContent = this.validationMessage || 'Valid custom element name!'
  }

}, { extends: 'input' })
