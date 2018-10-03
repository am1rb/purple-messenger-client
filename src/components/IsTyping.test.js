// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import IsTyping from './IsTyping'


describe("<IsTyping /> component tests", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<IsTyping />
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})