// @flow

import React from 'react'

import {Link} from 'react-router-dom'
import classNames from 'classnames'

import IsTyping from './IsTyping'

import styles from './Friend.css'
import defaultImage from '../assets/default-user.png'


type Props = {
	id: string,
	fullName: string,
	isTyping: boolean,
	lastMessage: string,
};

export default class Friend extends React.PureComponent<Props>
{
	render()
	{
		return (
			<Link to={"/friend/"+this.props.id+"/"} className={styles.friend}>
				<img src={defaultImage} className={styles.friendImage} alt={this.props.fullName} />
				<div className={styles.friendInfo}>
					<div className={styles.friendName}>
						{this.props.fullName}
					</div>
					<div className={styles.message}>
						{this.props.isTyping ? <IsTyping /> : this.props.lastMessage}
					</div>
				</div>
			</Link>
		)
	}
}