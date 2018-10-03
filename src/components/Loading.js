// @flow

import React from 'react'

import styles from './Loading.css'

type Props = {};


export default class Loading extends React.PureComponent<Props>
{
	render()
	{
		return (
			<div className={styles.loading}>
				loading...
			</div>
		)
	}
}