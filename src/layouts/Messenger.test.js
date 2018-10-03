// @flow

import React from 'react'
import {shallow} from '../enzyme'

import {MessengerView, mapStateToProps} from './Messenger'
import type {State} from '../reducers'


describe("<Messenger /> component tests", () => {

	it("Should redirect to login page", () => {

		const history = [];

		const component = shallow(
			<MessengerView isLoggedin={false} history={history}>
				Sample content
			</MessengerView>
		)

		expect(history.length).toBe(1)
	})

	it("Should not redirect to login page", () => {

		const history = [];


		const component = shallow(
			<MessengerView isLoggedin={true} history={history}>
				Sample content
			</MessengerView>
		)

		expect(history.length).toBe(0)
	})

	it("Should not regress", () => {

		const state = {
			currentUser: {
				isLoggedIn: true,
			}
		}

		expect(mapStateToProps(state).isLoggedin).toBe(true)
	})

})
