// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import ChatMessageStatus from './ChatMessageStatus'


describe("<ChatMessageStatus /> component tests", () => {

	it("Should matches to pending snapshot", () => {
		const component = renderer.create(
			<ChatMessageStatus status="pending" />
		)
		expect(component.toJSON()).toMatchSnapshot()
	})

	it("Should  matches to received snapshot", () => {
		const component = renderer.create(
			<ChatMessageStatus status="received" />
		)
		expect(component.toJSON()).toMatchSnapshot()
	})

})

