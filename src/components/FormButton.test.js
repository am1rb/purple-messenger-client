// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import FormButton from './FormButton'


describe("<FormButton /> component tests", () => {

	it("Should has label", () => {

		const label ="Click!"

		const component = renderer.create(
			<FormButton label={label} />
		)

		expect(component.root.findByType('button').props.children).toBe(label)
	})

	it("Should has children", () => {

		const children ="children!"

		const component = renderer.create(
			<FormButton>
				{children}				
			</FormButton>
		)

		expect(component.root.findByType('button').props.children).toBe(children)
	})

	it("Should label has a higher priority than children", () => {

		const label ="label!"
		const children ="label!"

		const component = renderer.create(
			<FormButton label={label}>
				{children}
			</FormButton>
		)

		expect(component.root.findByType('button').props.children).toBe(label)
	})

})