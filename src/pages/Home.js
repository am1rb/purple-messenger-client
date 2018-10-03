import React from 'react'
import classNames from 'classnames'

import Layout from '../layouts/Messenger'

import styles from './Home.css'

// 

export default class Home extends React.PureComponent
{
	render()
	{
		const classes = classNames({
			[styles.holder]: true,
			[this.props.className]: this.props.className,
		})

		return (
			<Layout className={classes} history={this.props.history}>
				please select a chat
			</Layout>
		)
	}
}