// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import ChatMessage from './ChatMessage'


describe("<ChatMessage /> component tests.", () => {

	it("Should not regress", () => {

		const component = renderer.create(
			<ChatMessage
				date={'Tue Oct 02 2018 20:47:36'}
				isFriend={true}
				message="This is test"
				status='pending'
			/>
		)

		expect(component.toJSON()).toMatchSnapshot()

	})

})