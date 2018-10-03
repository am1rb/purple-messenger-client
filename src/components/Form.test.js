// @flow

import React from 'react'
import {shallow} from '../enzyme'

import Form from './Form'


describe("<Form /> component tests", () => {

	it("Should call onSubmit correctly", () => {

		const onSubmitMock = jest.fn()

		const component = shallow(
			<Form onSubmit={onSubmitMock}>
				input
			</Form>
		)

		component.find('form').simulate('submit', {})

		expect(onSubmitMock).toBeCalled()

	})

})

