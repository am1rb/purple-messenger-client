// @flow

import React from 'react'
import {shallow} from '../enzyme'

import {LoginView, mapDispatchToProps} from './Login'
import socket, {serverSocket, cleanup} from '../socket'

import {updateLogin} from '../actions'


jest.mock('../socket')


describe("<Login /> component tests", () => {

	it("Should redirect after success login", () => {


		cleanup()

		// serverSocket.on('authenticate', () => {
		// 	console.log('need to auth')
		// })

		const history = []
		const onSuccessLoginMock = jest.fn()

		const component = shallow(
			<LoginView
				history={history}
				onSuccessLogin={onSuccessLoginMock}
			/>
		)

		const user = {id: 'userId'}

		serverSocket.emit('authenticate:success', user)

		expect(onSuccessLoginMock).toBeCalledWith(user)
	})

	it("Should call correct action", () => {

		const onDispatchMock = jest.fn()
		const user = {id: 'userId'}

		mapDispatchToProps(onDispatchMock).onSuccessLogin(user)

		expect(onDispatchMock).toBeCalledWith(updateLogin(user))
	})

})