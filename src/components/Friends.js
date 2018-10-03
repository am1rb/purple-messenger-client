// @flow

import React from 'react'
import classNames from 'classnames'

import FriendsList from '../components/FriendsList'
import AddFriendButton from '../components/AddFriendButton'

import type {Friend, IsTyping} from '../api-types'

import socket from '../socket'

import styles from './Friends.css'

type Props = {
	className: string,
};

type DefaultProps = {
	className: string,
};


type State = {
	list: Friend[],
	isLoading: boolean,
	isError: boolean,
};


export default class Friends extends React.PureComponent<Props, State>
{

	onFriendStartType:Function;
	onFriendStopType:Function;
	onFriendListSuccess:Function;
	onFriendListError:Function;

	static defaultProps:DefaultProps = {
		className: '',
	}

	constructor(props:Props)
	{
		super(props)

		this.state = {
			list: [],
			isLoading: false,
			isError: false,
		}

		this.onFriendStartType = this.onFriendStartType.bind(this)
		this.onFriendStopType = this.onFriendStopType.bind(this)

		this.onFriendListSuccess = this.onFriendListSuccess.bind(this)
		this.onFriendListError = this.onFriendListError.bind(this)
	}

	componentDidMount()
	{
		socket.on('chat_start_type', this.onFriendStartType)
		socket.on('chat_stop_type', this.onFriendStopType)

		socket.on('friend_list:success', this.onFriendListSuccess)
		socket.on('friend_list:error', this.onFriendListError)

		this.loadFriends()
	}

	componentWillUnmount()
	{
		socket.off('chat_start_type', this.onFriendStartType)
		socket.off('chat_stop_type', this.onFriendStopType)
	}

	loadFriends(): void
	{
		this.setState({
			isLoading: true,
			isError: false,
		})
		socket.emit('friend_list')
	}

	onFriendStartType(message:IsTyping): void
	{
		var list = this.state.list;

		for(var i=list.length-1; i>=0; i--)
		{
			if(list[i].id===message.sender_id)
			{
				list[i].is_typing = true
				break
			}
		}

		this.setState({
			list: [...list]
		})
	}

	onFriendStopType(message:IsTyping): void
	{
		var list = this.state.list;

		for(var i=list.length-1; i>=0; i--)
		{
			if(list[i].id===message.sender_id)
			{
				list[i].is_typing = false
				break
			}
		}

		this.setState({
			list: [...list]
		})
	}

	onFriendListSuccess(list: Friend[]): void
	{
		this.setState({
			list: list,
			isLoading: false,
		})
	}

	onFriendListError(): void
	{
		this.setState({
			list: [],
			isLoading: false,
			isError: true,
		})
	}

	render()
	{

		const classes = classNames({
			[styles.holder]: styles.holder,
			[this.props.className]: this.props.className,
		})

		return (
			<div className={classes}>

				<AddFriendButton className={styles.add} />

				<FriendsList
					list={this.state.list}
					isLoading={this.state.isLoading}
					isError={this.state.isError}
				/>

			</div>
		)
	}
}
