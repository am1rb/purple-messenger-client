import React from 'react'

import Form from '../components/Form'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'
import FormButton from '../components/FormButton'

import styles from './AddFriend.css'


export default class AddFriend extends React.PureComponent
{
	constructor(props)
	{
		super(props)

		this.state = {
			username: '',
		}
	}

	render()
	{
		return (
			<Form className={styles.form}>
				<h2>
					Add New Friend
				</h2>

				<FormInput
					label="Username:"
					isBlock
					value={this.props.value}
					onChange={e => {
						this.setState({
							username: e.target.value
						})
					}}
					autoFocus
				/>

				<div>
					<FormSubmit label="Send Request" />
					<FormButton label="Cancel" />
				</div>
			</Form>
		)
	}
}