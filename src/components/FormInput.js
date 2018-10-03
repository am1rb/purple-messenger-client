import React from 'react'

import FormBaseInput from './FormBaseInput'


export default class FormInput extends React.PureComponent
{
	render()
	{
		const {type, ...props} = this.props

		return (
			<FormBaseInput
				{...props}
				type={type||'text'}
				renderInput={(className, renderProps) => {
					return (
						<input className={className} { ...renderProps} />
					)
				}}
			/>
		)
	}
}