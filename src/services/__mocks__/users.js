export default {
	login: async (username, password) => {
		if(username!=='demo' || password!=='demo')
		{
			throw new Error("Invalid username or password")
		}
		return {data: {}}
	}
}