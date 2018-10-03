// @flow

import React from 'react'
import {shallow} from '../enzyme'
import {openAddFriendModal} from '../actions'

import {AddFriendButtonView, mapDispatchToProps} from './AddFriendButton'


describe("<AddFriendButton /> component tests", () => {

	it("Should AddFriendButtonView works correctly", () => {

		const onClickMock = jest.fn()

		const component = shallow(
			<AddFriendButtonView
				onClick={onClickMock}
			/>
		)

		component.find('button').simulate('click')

		expect(onClickMock).toBeCalled()
	})

	it("Should mapDispatchToProps works correctly", () => {

		const dispatchMock = jest.fn()

		const props = mapDispatchToProps(dispatchMock)

		props.onClick()

		expect(dispatchMock).toBeCalledWith(openAddFriendModal())
	})

})