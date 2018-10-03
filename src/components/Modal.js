// @flow

import React from 'react'

import styles from './Modal.css'

type Props = {
	isOpen: boolean,
	children: any[] | string,
};


export default class Modal extends React.PureComponent<Props>
{
	render()
	{
		return (
			this.props.isOpen && <div className={styles.modal}>
				{this.props.children}
			</div>
		)
	}
}
