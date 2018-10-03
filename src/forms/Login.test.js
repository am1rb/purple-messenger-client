// @flow

import React from 'react'
import {mount} from '../enzyme'

import Login from './Login'

jest.mock('../services/users')


describe("<Login /> component tests", () => {

	it("Should has success login", done => {

		const component = mount(
			<Login
				onSuccess={done}
			/>
		)

		component.find('input[type="text"]').simulate('change', {target: {value: 'demo'}})
		component.find('input[type="password"]').simulate('change', {target: {value: 'demo'}})
		component.find('button').simulate('submit')

	})

	it("Should has failed login", done => {

		const component = mount(
			<Login
				onSuccess={() => {}}
				onError={done}
			/>
		)

		component.find('input[type="text"]').simulate('change', {target: {value: 'wrong username'}})
		component.find('input[type="password"]').simulate('change', {target: {value: 'wrong password'}})
		component.find('button').simulate('submit')

	})

})
