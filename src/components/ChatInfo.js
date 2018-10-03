// @flow

import React from 'react'

import IsTyping from './IsTyping'

import styles from './ChatInfo.css'

type Props = {
	isTyping: boolean,
};

export default class ChatInfo extends React.PureComponent<Props>
{
	render()
	{
		return (
			<div className={styles.holder}>
				{this.props.isTyping && <IsTyping />}
			</div>
		)
	}
}