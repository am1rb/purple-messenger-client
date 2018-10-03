// @flow

import React from 'react'
import {shallow, mount} from '../enzyme';

import ChatInputBox from './ChatInputBox'


describe("<ChatInputBox /> component tests", () => {

	it("Should not submit the form if message is empty", () => {

		const onMessageReadyMock = jest.fn()

		const component = mount(
			<ChatInputBox
				onMessageReady={onMessageReadyMock}
			/>
		)

		component.find('button[type="submit"]').simulate('submit')

		expect(onMessageReadyMock).not.toHaveBeenCalled()
	})

	describe("Submit the form if message is not empty", () => {
		const onMessageReadyMock = jest.fn()

		const component = mount(<ChatInputBox
			onMessageReady={onMessageReadyMock}
		/>)


		const textMessage = 'Test message'

		component.find('textarea').simulate('change', { target: { value: textMessage } })
		component.find('button[type="submit"]').simulate('submit')

		it("Should call onMessageReadyMock and pass the message as first argument", () => {
			expect(onMessageReadyMock).toHaveBeenCalledTimes(1)			
			expect(onMessageReadyMock).toBeCalledWith(textMessage)
		})

		it("Should call onMessageReadyMock only once", () => {
			component.find('button').simulate('submit')
			component.find('button').simulate('submit')
			expect(onMessageReadyMock).toHaveBeenCalledTimes(1)
		})
	})
	
	it("Should handle Enter and Shift+Enter correctly", () => {
		const onMessageReadyMock = jest.fn()

		const component = mount(<ChatInputBox
			onMessageReady={onMessageReadyMock}
		/>)

		component.find('textarea').simulate('change', {target: { value: 'Test message'}})

		component.find('textarea').simulate('keydown', {keyCode: 13, shiftKey: true})
		expect(onMessageReadyMock).not.toHaveBeenCalled()
		
		component.find('textarea').simulate('keydown', {keyCode: 13})
		expect(onMessageReadyMock).toHaveBeenCalledTimes(1)
	})

	it("Should handle onTypeStart and onTypeStop correctly", done => {

		const detectTypeTime = 1000
		const onTypeStopMock = jest.fn()
		const onTypeStartMock = jest.fn()

		const component = mount(<ChatInputBox
			onTypeStart={onTypeStartMock}
			onTypeStop={onTypeStopMock}
			onMessageReady={() => {}}
		/>)

		
		component.find('textarea').simulate('change', {target: {value: 'Test message'}})
		component.find('textarea').simulate('keyup')
		component.find('textarea').simulate('keyup')
		component.find('textarea').simulate('keyup')

		expect(onTypeStartMock).toHaveBeenCalledTimes(1)
		expect(onTypeStopMock).not.toHaveBeenCalled()

		setTimeout(() => {

			expect(onTypeStopMock).toHaveBeenCalledTimes(1)

			done()

		}, detectTypeTime+500)

	})

})