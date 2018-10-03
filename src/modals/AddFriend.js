import React from 'react'
import {connect} from 'react-redux'

import Modal from '../components/Modal'
import AddFriendForm from '../forms/AddFriend'


class AddFriendView extends React.PureComponent
{
	render()
	{
		const {isOpen, ...props} = this.props

		return (
			<Modal isOpen={isOpen}>
				<AddFriendForm {...props} />
			</Modal>
		)
	}
}


const mapStateToProps = state => {
	return {
		isOpen: state.modals.isAddFriendOpen,
	}
}

export default connect(
	mapStateToProps
)(AddFriendView)