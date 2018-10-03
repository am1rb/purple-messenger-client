// @flow

type UpdateLoginAction = {
	type: string,
	user: any,
};

type SimpleAction = {
	type: string,
};

export const UPDATE_LOGIN = 'update-login';


export function updateLogin(user:any): UpdateLoginAction
{
	return {type: UPDATE_LOGIN, user}
}

export const OPEN_ADD_FRIEND_MODAL = 'open-add-friend-modal'
export const CLOSE_ADD_FRIEND_MODAL = 'close-add-friend-modal'

export function openAddFriendModal(): SimpleAction
{
	return {type: OPEN_ADD_FRIEND_MODAL}
}

export function closeAddFriendModal(): SimpleAction
{
	return {type: CLOSE_ADD_FRIEND_MODAL}
}


export type Action =
  | UpdateLoginAction
  | SimpleAction