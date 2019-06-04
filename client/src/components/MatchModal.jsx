import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon } from 'mdbreact'
const Text = require('../../languageLocalisation/texts.json')

class MatchModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const myText = Text[this.props.language]
    const color = this.props.gender === 1 ? '#1a237e' : '#880e4f'
    const buttonColor = this.props.gender === 1 ? 'indigo' : 'unique'
    return (
      <MDBContainer>
        <MDBModal size="sm" cascading className="modal-avatar" isOpen={ this.props.modal } toggle={ () => this.props.toggle() }>
          <MDBModalHeader className="mx-auto">
            <img src={ this.props.picture } alt="avatar" className="rounded-circle img-responsive" />
          </MDBModalHeader>
          <MDBModalBody className="text-center mb-1">
            <h5>{ this.props.name }</h5>
            <MDBIcon className="mt-2" icon="heart" style={ { color: color, fontSize: '50px' }} />
            <div style={ { fontSize: '30px', fontWeight: 'bold' } }>{ myText["notification_match"] }</div>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn color={ buttonColor } onClick={ () => this.props.toggle() }>{ myText["close_button"] }</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default MatchModal
