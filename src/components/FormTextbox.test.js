// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import FormTextbox from './FormTextbox'


describe("<FormTextbox /> component tests", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<FormTextbox
				value="This is sample text"
				onChange={() => {}}
			/>
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})