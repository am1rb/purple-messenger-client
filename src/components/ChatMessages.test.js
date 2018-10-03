// @flow

import React from 'react'
import renderer from 'react-test-renderer'

import {ChatMessagesView, mapStateToProps} from './ChatMessages'


describe("<ChatMessages /> component tests", () => {

	const myUserId:string = 'myUserId'
	const friendUserId:string = 'friendUserId'

	it("Should sent from friend", () => {

		const message = {
			message: 'Test message',
			message_id: 'messageId1',
			received_at: 'received date',
			sent_at: 'sent date',
			sender_id: friendUserId
		}

		const component = renderer.create(
			<ChatMessagesView
				list={[
					message,
				]}
				userId={myUserId}
			/>
		)

		expect(component.root.findAllByProps({isFriend: true}).length).toBe(1)

	})

	it("Should sent from me", () => {
		const message = {
			message: 'Test message',
			message_id: 'messageId1',
			received_at: 'received date',
			sent_at: 'sent date',
			sender_id: myUserId
		}

		const component = renderer.create(
			<ChatMessagesView
				list={[
					message,
				]}
				userId={myUserId}
			/>
		)

		expect(component.root.findAllByProps({isFriend: false}).length).toBe(1)
	})

	it("Should call onListMount", () => {

		const onListMountMock = jest.fn()

		const component = renderer.create(
			<ChatMessagesView
				list={[]}
				userId={myUserId}
				onListMount={onListMountMock}
			/>
		)

		expect(onListMountMock).toBeCalled()

	})

})