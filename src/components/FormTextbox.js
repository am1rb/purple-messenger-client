// @flow

import React from 'react'
import classNames from 'classnames'

// @flow

import FormBaseInput from './FormBaseInput'

import styles from './FormTextbox.css'

type Props = {
	value: string,
	onChange: Function,
};


export default class FormTextbox extends React.PureComponent<Props>
{
	render()
	{
		return (
			<FormBaseInput
				{...this.props}
				renderInput={(className, props) => {
					return (
						<textarea className={className} {...props} />
					)	
				}}
			/>
		)
	}
}