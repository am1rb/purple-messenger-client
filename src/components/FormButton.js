// @flow

import React from 'react'

type Props = {
	children?: any,
	label?: string,
	type: string,
};

type DefaultProps = {
	type: string,
};

export default class FormButton extends React.PureComponent<Props>
{
	static defaultProps:DefaultProps = {
		type: 'button'
	}

	render()
	{
		const {children, label, type, ...props} = this.props
		
		return (
			<button type={type} {...props}>
				{label||children}
			</button>
		)
	}
}