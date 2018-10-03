// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import Loading from './Loading'


describe("<Loading /> component tests", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<Loading />
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})