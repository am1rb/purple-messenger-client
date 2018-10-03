// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import FormBaseInput from './FormBaseInput'


describe("<FormBaseInput /> component tests", () => {

	it("Should supports label", () => {

		const label = 'Test label'

		const {root} = renderer.create(
			<FormBaseInput
				label={label}
				renderInput={() => <div />}
			/>
		)

		expect(root.findByType('span').props.children).toBe(label)
	})

	it("Should works without label", () => {

		const {root} = renderer.create(
			<FormBaseInput
				renderInput={() => <div />}
			/>
		)

		expect(root.findAllByType('span').length).toBe(0)

	})

	// is block check

})