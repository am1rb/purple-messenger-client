import React from 'react'
import renderer from 'react-test-renderer'


import ChatInfo from './ChatInfo'
import IsTyping from './IsTyping'


describe("<ChatInfo /> component tests", () => {

	it("Should display is typing status correctly", () => {

		{
			const {root} = renderer.create(<ChatInfo isTyping={true} />)
			expect(root.findAllByType(IsTyping).length).toBe(1)
		}

		{
			const {root} = renderer.create(<ChatInfo isTyping={false} />)
			expect(root.findAllByType(IsTyping).length).toBe(0)
		}

	})

})