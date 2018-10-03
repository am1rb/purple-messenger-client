import React from 'react'

import Form from '../components/Form'
import FormInput from '../components/FormInput'
import FormSubmit from '../components/FormSubmit'


export default class Register extends React.PureComponent
{
	render()
	{
		return (
			<Form>
				
				<FormInput
					label="نام:"
				/>

				<FormInput
					label="نام خانوادگی:"
				/>

				<FormInput
					label="نام کاربری:"
				/>

				<FormInput
					label="رمزعبور:"
					type="password"
				/>

				<FormInput
					label="ایمیل:"
					type="email"
				/>

				<FormSubmit
					label="ثبت‌نام"
				/>

			</Form>
		)
	}
}