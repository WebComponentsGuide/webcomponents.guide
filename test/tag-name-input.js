import {expect, fixture, html} from '@open-wc/testing'
import "../script/tag-name-input"

describe('tag-name-input', () => {
    let instance
    beforeEach(async () => {
        instance = await fixture(html`<input type="text" is="tag-name-input"/>`)
    })

    it('marks "foo-bar" as valid', () => {
        instance.value = 'foo-bar'
        expect(Object.values(instance.validity)).to.all.equal(true)
    })

})