// @flow

import React from 'react'
import {shallow} from '../enzyme'

import {ChatView} from './Chat'
import socket, {serverSocket, cleanup} from '../socket'

import type {ServerSendMessage} from '../api-types'


jest.mock('../socket')


describe("<Chat /> component tests", () => {

	const userId = 'userId'
	const friendId = 'friendId'
	
	const match = {params: {friend_id: friendId}}


	it("Should opens chat works correctly", () => {

		cleanup()

		serverSocket.on('chat_open', chatFriendId => {
			expect(chatFriendId).toBe(friendId)
		})

		const component = shallow(
			<ChatView
				history={[]}
				match={match}
				userId={userId}
			/>
		)

	})

	it("Should sends message to server correctly", () => {

		cleanup()

		const component = shallow(
			<ChatView
				history={[]}
				match={match}
				userId={userId}
			/>
		)

		const messageText = 'This is test message'

		serverSocket.on('chat_send_message', (message:ServerSendMessage) => {
			expect(message.temp_message_id).toBeDefined()
			expect(message.message).toBe(messageText)
		})

		component.instance().sendMessage(messageText)

		expect(component.state('messages')).toHaveLength(1)

	})

	it("Should redirects to home if ESC pressed", () => {

		// cleanup()

		// const map = {};
		// window.addEventListener = jest.genMockFn().mockImpl((event, callback) => {
		//   map[event] = callback;
		// });

		// const history = []

		// const component = shallow(
		// 	<ChatView
		// 		history={[]}
		// 		match={match}
		// 		userId={userId}
		// 	/>
		// )

		// component.simulate('keydown', {key: 'Escape'})

		// console.log(history.length)

	})

	it("Should display is friend typing", () => {

		cleanup()

		const component = shallow(
			<ChatView
				history={[]}
				match={match}
				userId={userId}
			/>
		)

		const onStartTypeCallbackMock = jest.fn()
		serverSocket.emit('chat_start_type', null, onStartTypeCallbackMock)

		expect(onStartTypeCallbackMock).toBeCalled()
		expect(component.state('isFriendTyping')).toBe(true)

		const onStopTypeCallbackMock = jest.fn()
		serverSocket.emit('chat_stop_type', null, onStopTypeCallbackMock)

		expect(onStopTypeCallbackMock).toBeCalled()
		expect(component.state('isFriendTyping')).toBe(false)

	})

	it("Should mark the message as sent and received correctly", () => {

		cleanup()

		const component = shallow(
			<ChatView
				history={[]}
				match={match}
				userId={userId}
			/>
		)

		const messageText = 'This is test message'

		let tempMessageId:string = ''

		serverSocket.on('chat_send_message', (message:ServerSendMessage) => {
			tempMessageId = message.temp_message_id
		})

		component.instance().sendMessage(messageText)

		// check sent at
		const sentAtDate = 'message sent date'
		const realMessageId = 'realMessageId'
		serverSocket.emit('chat_send_message_ack', {
			'temp_message_id': tempMessageId,
			'message_id': realMessageId,
			'sent_at': sentAtDate,
		})

		expect(component.state('messages')[0].sent_at).toBe(sentAtDate)
		//

		// check received at
		const receivedAtDate = 'message received date'
		const receivedCallbackMock = jest.fn()
		serverSocket.emit('chat_receive_message', {
			message_id: realMessageId,
			received_at: receivedAtDate,
		}, receivedCallbackMock)

		expect(component.state('messages')[0].received_at).toBe(receivedAtDate)
		expect(receivedCallbackMock).toBeCalled()
		//

	})

})
