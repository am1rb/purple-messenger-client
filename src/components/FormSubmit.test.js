import React from 'react'
import renderer from 'react-test-renderer'

import FormSubmit from './FormSubmit'


describe("<FormSubmit /> component tests", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<FormSubmit label="Button" />
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})