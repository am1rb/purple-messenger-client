import React from 'react'
import {connect} from 'react-redux'

import Modal from '../components/Modal'
import AcceptFriendForm from '../forms/AcceptFriend'


class AcceptFriendView extends React.PureComponent
{
	render()
	{
		const {isOpen, ...props} = this.props

		return (
			<Modal isOpen={isOpen}>
				<AcceptFriendForm {...props} />
			</Modal>
		)
	}
}


const mapStateToProps = state => {
	return {
		isOpen: state.modals.isAcceptFriendOpen,
	}
}

export default connect(
	mapStateToProps
)(AcceptFriendView)