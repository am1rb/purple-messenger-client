// @flow

import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'

import Layout from '../layouts/Messenger'
import ChatMessages from '../components/ChatMessages'
import ChatInputBox from '../components/ChatInputBox'
import ChatInfo from '../components/ChatInfo'

import type {
	Message, SendMessageAck, ReceiveMessage,
	IsTyping, ServerSendMessage
} from '../api-types'

import socket from '../socket'

import styles from './Chat.css'

type Props = {
	history: string[],
	userId: string,
	match: any,
	className: string,
};

type DefaultProps = {
	className: string,
};

type State = {
	messages: Message[],
	tempMessageId:number,
	isFriendTyping: boolean,
};


export class ChatView extends React.PureComponent<Props, State>
{

	sendMessage:Function;
	onKeyPress:Function;
	onSocketConnect:Function;
	onActionSendMessage:Function;
	onActionSendMessageAck:Function;
	onActionReceiveMessage:Function;
	onActionTypeStart:Function;
	onActionTypeStop:Function;
	waitingMessagesList:string[];
	messagesListRef:any;

	static defaultProps:DefaultProps = {
		className: ''
	}

	constructor(props:Props)
	{
		super(props)

		this.state = {
			messages: [],
			tempMessageId: 1,
			isFriendTyping: false,
		}

		this.sendMessage = this.sendMessage.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onSocketConnect = this.onSocketConnect.bind(this)

		this.onActionSendMessage = this.onActionSendMessage.bind(this)
		this.onActionSendMessageAck = this.onActionSendMessageAck.bind(this)
		this.onActionReceiveMessage = this.onActionReceiveMessage.bind(this)
		this.onActionTypeStart = this.onActionTypeStart.bind(this)
		this.onActionTypeStop = this.onActionTypeStop.bind(this)

		this.waitingMessagesList = []
	}



	componentDidMount()
	{
		document.addEventListener('keydown', this.onKeyPress, false);

		this.onSocketConnect()

		socket.on('connect', this.onSocketConnect)
		socket.on('chat_start_type', this.onActionTypeStart)
		socket.on('chat_stop_type', this.onActionTypeStop)
		socket.on('chat_send_message', this.onActionSendMessage)
		socket.on('chat_send_message_ack', this.onActionSendMessageAck)
		socket.on('chat_receive_message', this.onActionReceiveMessage)
	}

	componentWillUnmount()
	{
		document.removeEventListener('keydown', this.onKeyPress);

		socket.emit('chat_close')

		socket.off('connect', this.onSocketConnect)
		socket.off('chat_start_type', this.onActionTypeStart)
		socket.off('chat_stop_type', this.onActionTypeStop)
		socket.off('chat_send_message', this.onActionSendMessage)
		socket.off('chat_send_message_ack', this.onActionSendMessageAck)
		socket.off('chat_receive_message', this.onActionReceiveMessage)
	}

	onKeyPress(e:SyntheticKeyboardEvent<*>)
	{
		if(e.key === "Escape")
		{
			this.props.history.push('/')
		}
	}


	sendMessage(message:string)
	{
		var messages:Message[] = this.state.messages
		const tempMessageId = this.state.tempMessageId+""+Date.now()

		const localMessage:Message = {
			message_id: null,
			temp_message_id: tempMessageId,
			type: 'text',
			sender_id: this.props.userId,
			receiver_id: this.props.match.params.friend_id,
			message: message,
			sent_at: (new Date()).toString(),
			received_at: null,
		}

		messages.push(localMessage)

		const serverMessage:ServerSendMessage = {
			type: 'text',
			message: message,
			temp_message_id: tempMessageId,
		}

		socket.emit('chat_send_message', serverMessage)

		this.setState({
			messages: [...messages],
			tempMessageId: this.state.tempMessageId+1
		})

		this.messagesListRef && this.messagesListRef.scrollToBottom(true)

	}

	onSocketConnect()
	{
		socket.emit('chat_open', this.props.match.params.friend_id)
	}

	addMessageToWaitingList(message_id:string)
	{
		this.waitingMessagesList.push(message_id)
	}

	removeMessageFromWaitingList(message_id:string)
	{
		const index = this.waitingMessagesList.indexOf(message_id)
		if( index!==-1 )
		{
			this.waitingMessagesList.splice(index, 1)
		}
	}

	isMessageInWaitingList(message_id:string)
	{
		return this.waitingMessagesList.indexOf(message_id)!==-1
	}

	onActionSendMessageAck(message:SendMessageAck)
	{
		var messages = this.state.messages

		for(var i=messages.length-1; i>=0; i--)
		{
			if(messages[i].temp_message_id && messages[i].temp_message_id===message.temp_message_id)
			{
				messages[i].message_id = message.message_id
				messages[i].sent_at = message.sent_at

				delete messages[i].temp_message_id

				this.addMessageToWaitingList(message.message_id)

				break
			}
		}

		this.setState({
			messages: [...messages],
		})

	}

	onActionSendMessage(message:Message, ack:Function)
	{

		var messages = this.state.messages
		
		var needsUpdate = false

		if(message.receiver_id===this.props.userId)
		{
			messages.push(message)
			needsUpdate = true

			socket.emit('chat_receive_message', message.message_id)
		}
		else if(!this.isMessageInWaitingList(message.message_id))
		{
			messages.push(message)
			needsUpdate = true

			this.removeMessageFromWaitingList(message.message_id)
		}

		if(needsUpdate)
		{
			this.setState({
				messages: [...messages],
			})

			this.messagesListRef.scrollToBottom()
		}

		ack()
	}

	onActionReceiveMessage(message:ReceiveMessage, ack:Function)
	{
		var messages = this.state.messages

		for(var i=messages.length-1; i>=0; i--)
		{
			if(messages[i].message_id===message.message_id)
			{
				
				messages[i].received_at = message.received_at

				break
			}
		}
		
		this.setState({
			messages: [...messages],
		})

		ack()
	}

	onActionTypeStart(message:IsTyping, ack:Function)
	{
		ack()

		this.setState({
			isFriendTyping: true
		})
	}

	onActionTypeStop(message:IsTyping, ack:Function)
	{
		ack()

		this.setState({
			isFriendTyping: false
		})
	}


	render()
	{
		const classes = classNames({
			[styles.holder]: styles.holder,
			[this.props.className]: this.props.className,
		})

		return (
			<Layout className={classes} history={this.props.history}>
				
				<ChatInfo
					isTyping={this.state.isFriendTyping}
				/>

				<ChatMessages
					onListMount={(r) => {this.messagesListRef = r}}
					className={styles.messages}
					list={this.state.messages}
				/>

				<ChatInputBox
					className={styles.input}
					onMessageReady={this.sendMessage}
					onTypeStart={() => socket.emit('chat_start_type')}
					onTypeStop={() => socket.emit('chat_stop_type')}
				/>

			</Layout>
		)
	}
}


const mapStateToProps = state => {
	return {
		token: state.currentUser.token,
		userId: state.currentUser.id,
	}
}

export default connect(
	mapStateToProps
)(ChatView)