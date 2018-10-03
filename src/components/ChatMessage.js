// @flow

import React from 'react'
import classNames from 'classnames'

import ChatMessageStatus from './ChatMessageStatus'

import styles from './ChatMessage.css'

type Props = {
	date: string,
	status: 'received' | 'pending' | 'sent',
	isFriend: boolean,
	message: string,
};


export default class ChatMessage extends React.PureComponent<Props>
{
	render()
	{
		const classes = classNames({
			[styles.message]: styles.message,
			[styles.message_me]: !this.props.isFriend,
			[styles.message_friend]: this.props.isFriend,
		})

		return (
			<div className={styles.holder}>
				<div className={classes}>
					<div className={styles.text}>
						{this.props.message}
					</div>
					<div className={styles.detail}>

						{!this.props.isFriend && <ChatMessageStatus status={this.props.status} />}

						<span className={styles.date}>
							{this.props.date}
						</span>

					</div>
				</div>
				<div className={styles.clr} />
			</div>
		)
	}
}