// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import ErrorMessage from './ErrorMessage'


describe("<ErrorMessage /> component tests", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<ErrorMessage label="This is error message" />
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})
