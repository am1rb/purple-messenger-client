// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import Modal from './Modal'

describe("<Modal /> component tests", () => {

	it("Should open modal correctly", () => {

		const content = 'Modal content'

		const component = renderer.create(
			<Modal isOpen={true}>
				{content}
			</Modal>
		)

		const json:any = component.toJSON()
		expect(json.children[0]).toBe(content)

	})

	it("Should close modal correctly", () => {

		const content = 'Modal content'

		const component = renderer.create(
			<Modal isOpen={false}>
				{content}
			</Modal>
		)
	
		expect(component.toJSON()).toBe(null)
	})

})
