// @flow

import React from 'react'
import classNames from 'classnames'

import styles from './Form.css'

type Props = {
	className: string,
	onSubmit: Function,
	children: any,
};
type DefaultProps = {
	className: string,
};

export default class Form extends React.PureComponent<Props>
{
	static defaultProps:DefaultProps = {
		className: '',
	}

	onSubmit:Function;

	constructor(props:Props)
	{
		super(props)

		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onSubmit(e:SyntheticEvent<*>)
	{
		if(e && e.preventDefault)
		{
			e.preventDefault(); // prevent the form submission.
		}
		this.props.onSubmit && this.props.onSubmit(e)
	}

	render()
	{
		const {children, className, onSubmit, ...props} = this.props

		const classes = classNames({
			[className]: className,
			[styles.body]: true,
		})
		
		return (
			<form onSubmit={this.onSubmit} className={classes} {...props}>
				{children}
			</form>
		)
	}
}