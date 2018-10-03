// @flow

import React from 'react'
import {connect} from 'react-redux'

import Layout from '../layouts/Index'
import LoginForm from '../forms/Login'

import {updateLogin} from '../actions'
import socket from '../socket'

import type {Dispatch} from 'redux'
import type {Action} from '../actions'
import type {User} from '../api-types'

import styles from './Login.css'


type Props = {
	onSuccessLogin:Function,
	history: string[],
};


export class LoginView extends React.PureComponent<Props>
{

	onSuccessLogin:Function;
	onAuthenticateSuccess:Function;

	constructor(props:Props)
	{
		super(props)

		this.onSuccessLogin = this.onSuccessLogin.bind(this)
		this.onAuthenticateSuccess = this.onAuthenticateSuccess.bind(this)
	}

	componentDidMount()
	{
		socket.on('authenticate:success', this.onAuthenticateSuccess)
	}

	componentWillUnmount()
	{
		socket.off('authenticate:success', this.onAuthenticateSuccess)
	}

	onAuthenticateSuccess(user:User)
	{
		this.props.onSuccessLogin(user)
		this.props.history.push('/')
	}

	onSuccessLogin(user:User)
	{
		socket.emit('authenticate', user.token)
	}

	render()
	{
		return (
			<Layout>
				<div className={styles.top}></div>
				<LoginForm
					className={styles.form}
					onSuccess={this.onSuccessLogin}
				/>
			</Layout>
		)
	}
}

export const mapDispatchToProps = (dispatch:Dispatch<Action>) => {
	return {
		onSuccessLogin: (user:User) => {
			dispatch(updateLogin(user))
		}
	}
}

export default connect(
	null,
	mapDispatchToProps,
)(LoginView)