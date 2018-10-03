import {combineReducers} from 'redux'

import {
	UPDATE_LOGIN,
	OPEN_ADD_FRIEND_MODAL, CLOSE_ADD_FRIEND_MODAL,
} from './actions'

type CurrentUserState = {
	isLoggedIn: boolean,
	id: 		string,
	token: 		string,
	first_name: string,
	last_name:  string,
	email: 		string,
};

function currentUser(state, action)
{
	if(!state)
	{
		state = {
			isLoggedIn: localStorage.getItem('token') ? true : false,
			id: 		localStorage.getItem('id'),
			token: 		localStorage.getItem('token'),
			first_name: localStorage.getItem('first_name'),
			last_name:  localStorage.getItem('last_name'),
			email: 		localStorage.getItem('email'),
		}
	}

	switch(action.type)
	{
		case UPDATE_LOGIN:

			localStorage.setItem('first_name', action.user.first_name)
			localStorage.setItem('last_name', action.user.last_name)
			localStorage.setItem('email', action.user.email)
			localStorage.setItem('id', action.user.id)
			localStorage.setItem('token', action.user.token)

			return Object.assign({}, state, {
				isLoggedIn: true,
				id:         action.user.id,
				token:      action.user.token,
				first_name: action.user.first_name,
				last_name:  action.user.last_name,
				email: 		action.user.email,
			})
		default:
	}

	return state
}

type ModalState = {
	isAddFriendOpen: boolean,
	isAcceptFriendOpen: boolean,
};

function modals(state, action)
{
	if(!state)
	{
		state = {
			isAddFriendOpen: false,
			isAcceptFriendOpen: false,
		}
	}


	switch(action.type)
	{
		case OPEN_ADD_FRIEND_MODAL:
			return Object.assign({}, state, {
				isAddFriendOpen: true,
			})

		case CLOSE_ADD_FRIEND_MODAL:
			return Object.assign({}, state, {
				isAddFriendOpen: false,
			})

		default:
	}


	return state
}

export type State = {
	currentUser?: CurrentUserState,
	modals?: ModalState,
};

export default combineReducers({
	currentUser,
	modals
})