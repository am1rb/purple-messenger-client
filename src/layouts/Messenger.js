// @flow

import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'

import Layout from '../layouts/Index'
import Friends from '../components/Friends'
import type {State} from '../reducers'

import styles from './Messenger.css'

type Props = {
	isLoggedin: boolean,
	className: string,
	history: any[],
	children: any,
};

type DefaultProps = {
	className: string,
};


export class MessengerView extends React.PureComponent<Props>
{

	static defaultProps:DefaultProps = {
		className: '',
	}

	componentDidMount()
	{
		if(!this.props.isLoggedin)
		{
			this.props.history.push('/login/')
		}
	}

	render()
	{
		const classes = classNames({
			[styles.content]: styles.content,
			[this.props.className]: this.props.className
		})

		return (
			<Layout className={styles.holder}>
				<Friends className={styles.friends} />

				<div className={classes}>
					{this.props.children}
				</div>
			</Layout>
		)
	}
}

export const mapStateToProps = (state:State) => {
	return {
		isLoggedin: state.currentUser.isLoggedIn
	}
}

export default connect(
	mapStateToProps
)(MessengerView)