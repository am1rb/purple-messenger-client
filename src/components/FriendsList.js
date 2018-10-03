// @flow

import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'

import Friend from './Friend'
import Loading from './Loading'
import ErrorMessage from './ErrorMessage'

import defaultImage from '../assets/default-user.png'
import styles from './FriendsList.css'

import type {Friend as APIFriend} from '../api-types'


type Props = {
	list: APIFriend[],
	isLoading: boolean,
	isError: boolean,
};


export default class FriendsList extends React.PureComponent<Props>
{
	render()
	{
		return (
			<div className={styles.list}>

				{this.props.isLoading && <Loading />}
				{this.props.isError && <ErrorMessage label="nothing" />}

				{!this.props.isLoading && this.props.list.map(friend => {

					return (
						<Friend
							key={friend.id}
							id={friend.id}
							fullName={friend.fullname}
							isTyping={friend.is_typing}
							lastMessage={friend.last_message}
						/> 
					)

				})}
			</div>
		)
	}
}
