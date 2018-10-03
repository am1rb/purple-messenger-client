// @flow

import React from 'react'

import styles from './ChatMessageStatus.css'

type Props = {
	status: string,
};

export default class ChatMessageStatus extends React.PureComponent<Props>
{
	render()
	{
		return (
			<span className={styles.status}>
				{this.props.status==='pending' && <i className="far fa-clock"></i>}
				{this.props.status!=='pending' && <i className="fa fa-check"></i>}
				{this.props.status!=='pending' && this.props.status==='received' && <i className="fa fa-check"></i>}
			</span>
		)
	}
}