import renderer from 'react-test-renderer'
import React from 'react'
import { MemoryRouter } from 'react-router'

import IsTyping from './IsTyping'
import Friend from './Friend'



describe("<Friend /> component tests", () => {

	it("Should has typing mode", () => {
		
		const {root} = renderer.create(
			<MemoryRouter>
				<Friend
					isTyping={true}
				/>
			</MemoryRouter>
		)

		expect(root.findAllByType(IsTyping).length).toBe(1)
	})

	it("Should not regress", () => {
		
		const friend = renderer.create(
			<MemoryRouter>
				<Friend
					id="testId"
					fullName="Amir"
					lastMessage="This is last message"
					isTyping={false}
				/>
			</MemoryRouter>
		)

		expect(friend.toJSON()).toMatchSnapshot();
	})

})