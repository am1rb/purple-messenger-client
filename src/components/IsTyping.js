// @flow

import React from 'react'

import styles from './IsTyping.css'

type Props = {};


export default class IsTyping extends React.PureComponent<Props>
{
	render()
	{
		return (
			<span className={styles.label}>
				is typing...
			</span>
		)
	}
}