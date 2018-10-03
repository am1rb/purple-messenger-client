// @flow

import React from 'react'

import FormButton from './FormButton'

type Props = {
	type?: string,
	label?: string,
	autoFocus?: boolean,
};

export default class FormSubmit extends React.PureComponent<Props>
{
	render()
	{
		const {type, ...props} = this.props

		return (
			<FormButton
				type="submit"
				{...props}
			/>
		)
	}
}
