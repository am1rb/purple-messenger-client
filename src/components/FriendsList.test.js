// @flow

import renderer from 'react-test-renderer'
import React from 'react'

import {MemoryRouter} from 'react-router-dom'

import FriendsList from './FriendsList'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'
import Friend from './Friend'


describe("<FriendsList /> component tests", () => {

	it("Should displays loading", () => {

		const {root} = renderer.create(
			<FriendsList
				list={[]}
				isLoading={true}
				isError={false}
			/>
		)

		expect(root.findAllByType(Loading).length).toBe(1)
		expect(root.findAllByType(Friend).length).toBe(0)
	})

	it("Should displays error", () => {

		const {root} = renderer.create(
			<FriendsList
				list={[]}
				isLoading={false}
				isError={true}
			/>
		)

		expect(root.findAllByType(ErrorMessage).length).toBe(1)
		expect(root.findAllByType(Friend).length).toBe(0)
	})

	it("Should load list correctly", () => {

		const friends = [
			{
				id: "johnId",
				fullname: "John Doe",
				is_typing: false,
				last_message: 'Hi',
			},
			{
				id: "saraId",
				fullname: "Sara Doe",
				is_typing: false,
				last_message: 'Bye',
			}
		]

		const {root} = renderer.create(
			<MemoryRouter>
				<FriendsList
					list={friends}
					isLoading={false}
					isError={false}
				/>
			</MemoryRouter>
		)

		expect(root.findAllByType(Loading).length).toBe(0)
		expect(root.findAllByType(Friend).length).toBe(2)
	})

	// display error

})