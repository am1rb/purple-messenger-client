// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import FormInput from './FormInput'


describe("<FormInput /> component tests", () => {

	it("Should be text input as default", () => {

		const {root} = renderer.create(
			<FormInput />
		)

		expect(root.findByType('input').props.type).toBe('text')

	})

	it("Should supports custom types", () => {

		const {root} = renderer.create(
			<FormInput type="password" />
		)

		expect(root.findByType('input').props.type).toBe('password')

	})

})