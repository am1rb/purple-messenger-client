// @flow

import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import socket from '../socket'
import {openAddFriendModal} from '../actions'

import type {Dispatch} from 'redux'
import type {Action} from '../actions'

import styles from './AddFriendButton.css'

type Props = {
	onClick: Function,
	className: string,
};

type DefaultProps = {
	className: string,
};


export class AddFriendButtonView extends React.PureComponent<Props>
{

	static defaultProps:DefaultProps = {
		className: '',
	}

	render()
	{
		const classes = classNames({
			[styles.button]: styles.button,
			[this.props.className]: this.props.className,
		})

		const iconClasses = classNames({
			'far': true,
			'fa-plus-square': true,
			[styles.icon]: styles.icon,
		})

		return (
			<button className={classes} onClick={this.props.onClick}>
				<i className={iconClasses}></i>
				Add Friend
			</button>
		)
	}
}

export const mapDispatchToProps = (dispatch:Dispatch<Action>) => {
	return {
		onClick: function()
		{
			dispatch(openAddFriendModal())
		}
	}
}

export default connect(
	null,
	mapDispatchToProps
)(AddFriendButtonView)

