// @flow

import React from 'react'
import {shallow} from '../enzyme'

import Friends from './Friends'
import type {Friend, IsTyping} from '../api-types'

import socket, {serverSocket, cleanup} from '../socket'

jest.mock('../socket')


describe("<Friends /> component tests", () => {

	const friendsList:Friend[] = [
		{
			id: 'Id1',
			fullname: 'Alex',
			is_typing: false,
			last_message: 'Hi',
		},
		{
			id: 'Id2',
			fullname: 'Sara',
			is_typing: false,
			last_message: 'Goodbye',
		},
		{
			id: 'Id3',
			fullname: 'John',
			is_typing: false,
			last_message: 'Are you ok?',
		},
	]

	it("Should load friends correctly", () => {

		cleanup()

		serverSocket.on('friend_list', () => {
			serverSocket.emit('friend_list:success', friendsList)
		})

		const component = shallow(
			<Friends />
		)

		expect(component.state('list')).toBe(friendsList)
	})

	it("Should display loading", () => {

		cleanup()

		const component = shallow(
			<Friends />
		)

		expect(component.state('isLoading')).toBe(true)
		expect(component.state('isError')).toBe(false)
	})

	it("Should display error message if friends loading failed", () => {

		cleanup()

		serverSocket.on('friend_list', () => {
			serverSocket.emit('friend_list:error')
		})

		const component = shallow(
			<Friends />
		)

		expect(component.state('isLoading')).toBe(false)
		expect(component.state('isError')).toBe(true)
		expect(component.state('list')).toEqual([])

	})

	it("Should display the chat typing flag correctly", () => {

		cleanup()

		serverSocket.on('friend_list', () => {
			serverSocket.emit('friend_list:success', friendsList)
		})

		const component = shallow(
			<Friends />
		)

		const sender_id:string = friendsList[1].id

		const startTyping:IsTyping = {sender_id}
		serverSocket.emit('chat_start_type', startTyping)
		expect(component.state('list')[1].is_typing).toBe(true)

		const stopTyping:IsTyping = {sender_id}
		serverSocket.emit('chat_stop_type', stopTyping)
		expect(component.state('list')[1].is_typing).toBe(false)		

	})

})