// @flow

import React from 'react'

import Form from '../components/Form'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'

import users from '../services/users'

import {handleResponseError} from '../functions'

// import styles from './Login.css'

type Props = {
	onSuccess: Function,
	onError?: Function,
	className: string,
};

type DefaultProps = {
	className: string,
}

type State = {
	username: string,
	password: string,
	isSaving: boolean,
	errors: any,
};

export default class Login extends React.PureComponent<Props, State>
{

	onSubmit:Function;

	static defaultProps:DefaultProps = {
		className: '',
	}

	constructor(props:Props)
	{
		super(props)

		this.state = {
			username: '',
			password: '',

			isSaving: false,
			errors: {},
		}

		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit()
	{
		this.setState({
			isSaving: true,
		})

		users.login(this.state.username, this.state.password)
			.then(response => {
				this.props.onSuccess && this.props.onSuccess(response.data)
				this.setState({
					isSaving: false,
				})
			})
			.catch(handleResponseError({
				'400': response => {
					this.setState({
						errors: response.data
					})

					this.setState({
						isSaving: false,
					})
				}
			}, error => {
				this.props.onError && this.props.onError(error)

				this.setState({
					isSaving: false,
				})
			}))
			// .finally(() => {
			// 	this.setState({
			// 		isSaving: false,
			// 	})				
			// })
	}

	render()
	{
		return (
			<Form onSubmit={this.onSubmit} className={this.props.className}>
				<FormInput
					label="آی‌دی:"
					value={this.state.username}
					onChange={e => {this.setState({'username': e.target.value})}}
				/>
				<FormInput
					label="رمزعبور:"
					type="password"
					value={this.state.password}
					onChange={e => {this.setState({'password': e.target.value})}}
				/>
				<FormSubmit
					label="ورود"
					disabled={this.state.isSaving}
				/>
			</Form>
		)
	}
}