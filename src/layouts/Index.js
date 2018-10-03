// @flow

import React from 'react'
import classNames from 'classnames'

import AddFriendModal from '../modals/AddFriend'
import AcceptFriendModal from '../modals/AcceptFriend'

import styles from './Index.css'

type Props = {
	className: string,
	children: any,
};

type DefaultProps = {
	className: string,
};

export default class Index extends React.PureComponent<Props>
{

	static defaultProps:DefaultProps = {
		className: '',
	}

	render()
	{
		const classes = classNames({
			[styles.container]: true,
			[this.props.className]: this.props.className,
		})
		
		return (
			<div>
				<div className={classes}>
					{this.props.children}
				</div>
				
				<AddFriendModal />
				<AcceptFriendModal />
			</div>
		)
	}
}