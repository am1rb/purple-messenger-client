// @flow

import React from 'react'
import classNames from 'classnames'

import styles from './FormBaseInput.css'

type Props = {
	className: string,
	labelClassName: string,
	holderClassName: string,
	isBlock: boolean,
	label?: string,
	renderInput: Function,
};

type DefaultProps = {
	className: string,
	labelClassName: string,
	holderClassName: string,
	isBlock: boolean,
};

export default class FormBaseInput extends React.PureComponent<Props>
{

	static defaultProps:DefaultProps = {
		className: '',
		labelClassName: '',
		holderClassName: '',
		isBlock: false,
	}

	render()
	{
		const {
			label, isBlock,
			holderClassName, labelClassName, className,
			renderInput,		
			...props
		} = this.props


		const classNameClasses = classNames({
			[styles.input]: true,
			[className]: className,
		})

		if(!label)
		{
			return renderInput(classNameClasses, props)
		}

		const holderClassNameClasses = classNames({
			[styles.holder]: true,
			[styles.holder_block]: isBlock,
			[holderClassName]: holderClassName,
		})
		
		const labelClassNameClasses = classNames({
			[styles.label]: true,
			[labelClassName]: labelClassName,
		})

		return (
			<label className={holderClassNameClasses}>
				<span className={labelClassNameClasses}>{label}</span>
				{renderInput(classNameClasses, props)}
			</label>
		)
	}
}