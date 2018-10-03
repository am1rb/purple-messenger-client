// @flow

import React from 'react'
import classNames from 'classnames'
import {debounce} from 'throttle-debounce';

import Form from './Form'
import FormTextbox from './FormTextbox'
import FormSubmit from './FormSubmit'

import styles from './ChatInputBox.css'

type Props = {
	className: string,
	onTypeStop?: Function,
	onTypeStart?: Function,
	onMessageReady: Function,
	detectTypeTime: number,
};

type State = {
	message: string,
};

type DefaultProps = {
	detectTypeTime: number,
	className: string,
};


export default class ChatInputBox extends React.PureComponent<Props, State>
{

	static defaultProps:DefaultProps = {
		detectTypeTime: 1500,
		className: '',
	}

	onSubmit: Function;
	onKeyDown: Function;
	onKeyUp: Function;
	onTypeStart: Function;
	onTypeStop: Function;
	onTextChange: Function;
	isTyping: boolean;

	constructor(props:Props)
	{
		super(props)

		this.state = {
			message: '',
		}

		this.isTyping = false

		this.onSubmit = this.onSubmit.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onKeyUp = this.onKeyUp.bind(this)
		this.onTextChange = this.onTextChange.bind(this)


		this.onTypeStart = debounce(this.props.detectTypeTime, true, () => {
			this.isTyping = true
			this.props.onTypeStart && this.props.onTypeStart()
		});

		this.onTypeStop = debounce(this.props.detectTypeTime, () => {
			if(this.isTyping)
			{
				this.props.onTypeStop && this.props.onTypeStop()
				this.isTyping = false
			}
		});
	}


	onSubmit(): void
	{
		if(!this.state.message)
		{
			return
		}

		this.props.onMessageReady(this.state.message.trim())

		this.props.onTypeStop && this.props.onTypeStop()
		this.isTyping = false

		this.setState({message: ''})
	}

	onKeyDown(e:SyntheticKeyboardEvent<*>): void
	{
		if(e.keyCode === 13)
		{
			if(!e.shiftKey)
			{

				if(this.state.message)
				{
					this.onSubmit()
				}

				e.nativeEvent.preventDefault && e.nativeEvent.preventDefault()
			}

			return
		}
		else if(e.keyCode === 27)
		{
			return
		}

	}

	onKeyUp(): void
	{
		if(this.state.message)
		{
			this.onTypeStart.call()
			this.onTypeStop.call()
		}
	}

	onTextChange(value:string): void
	{
		this.setState({
			message: value,
		})
	}

	render()
	{
		const classes = classNames({
			[styles.holder]: styles.holder,
			[this.props.className]: this.props.className,
		})

		return (
			<Form className={classes} onSubmit={this.onSubmit}>

				<FormTextbox
					holderClassName={styles.input}
					onKeyDown={this.onKeyDown}
					onKeyUp={this.onKeyUp}
					value={this.state.message}
					onChange={(e) => {
						this.onTextChange(e.target.value)
					}}
					autoFocus
				/>

				<FormSubmit className={styles.button} disabled={!this.state.message}>
					<i className="fa fa-arrow-left"></i>
				</FormSubmit>

			</Form>
		)
	}
}

