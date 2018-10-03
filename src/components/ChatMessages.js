// @flow

import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import ChatMessage from './ChatMessage'

import type {State} from '../reducers'
import type {Message} from '../api-types'

import styles from './ChatMessages.css'


type Props = {
	onListMount?:Function,
	className: string,
	list: Message[],
	userId: string,
};

type DefaultProps = {
	className: string,
};


export class ChatMessagesView extends React.PureComponent<Props>
{

	static defaultProps:DefaultProps = {
		className: '',
	}

	isNearToBottom:Function;
	scrollToBottom:Function;

	constructor(props:Props)
	{
		super(props)

		this.isNearToBottom = this.isNearToBottom.bind(this)
		this.scrollToBottom = this.scrollToBottom.bind(this)
	}

	isNearToBottom(): boolean
	{
		return true
	}

	scrollToBottom(force:boolean=false): void
	{
		const scrollBottom = this.refs.holder.scrollHeight - (this.refs.holder.offsetHeight + this.refs.holder.scrollTop)

		window.requestAnimationFrame(() => {

			if(force || scrollBottom<100)
			{
				this.refs.holder.scrollTo(0, this.refs.holder.scrollHeight);
			}

		});
	}

	componentDidMount()
	{
		this.props.onListMount && this.props.onListMount(this)
	}

	render()
	{
		const classes = classNames({
			[styles.holder]: styles.holder,
			[this.props.className]: this.props.className,
		})

		return (
			<div className={classes} ref='holder'>
				{this.props.list.map(message => {

					var status = '';

					if(!message.message_id)
					{
						status = 'pending'
					}
					else if(!message.received_at)
					{
						status = 'sent'
					}
					else
					{
						status = 'received'
					}

					return (
						<ChatMessage
							key={message.message_id || message.temp_message_id}
							message={message.message}
							date={message.sent_at}
							isFriend={message.sender_id!==this.props.userId}
							status={status}
						/>
					)
				})}
			</div>
		)
	}	
}


export const mapStateToProps = (state:State) => {
	return {
		userId: state.currentUser.id,
	}
}

export default connect(
	mapStateToProps
)(ChatMessagesView)