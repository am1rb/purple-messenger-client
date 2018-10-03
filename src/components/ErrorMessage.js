// @flow

import React from 'react'

import styles from './ErrorMessage.css'

type Props = {
	message?: string,
	children?: any,
};

export default class ErrorMessage extends React.PureComponent<Props>
{
	render()
	{
		return (
			<div className={styles.error}>
				{this.props.message||this.props.children}
			</div>
		)
	}
}