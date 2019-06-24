import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import styles from './Chat_styles'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact'

class ChatModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const fullName = this.props.user.userInfos ? this.props.user.userInfos.mainInformations.first_name
                      + ' ' + this.props.user.userInfos.mainInformations.last_name : ''
    return (
      <MDBModal size="md" isOpen={ this.props.toggled } toggle={ this.props.toggle }>
        <MDBModalHeader className="text-center" titleClass="w-100" toggle={ this.props.toggle }>
          { fullName }
        </MDBModalHeader>
        <MDBModalBody style={ styles.modalBody } >
          Test Modal
        </MDBModalBody>
        <MDBModalFooter style={ styles.modalFooter }>
          <input style={ styles.input } type="text" placeholder="Type your message..." />
          <MDBIcon style={ styles.icon } size="lg" className="mb-2 ml-2" icon="paper-plane" />
        </MDBModalFooter>
      </MDBModal>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ChatModal))
