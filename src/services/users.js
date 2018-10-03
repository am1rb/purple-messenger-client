import axios from 'axios'

import {buildAPIPath, encodeData} from '../functions'

export default {
	login: (username, password) => {

		const formData = encodeData({
			username: username,
			password: password,
		})

		return axios.post(buildAPIPath('/users/login/'), formData)
	}
}