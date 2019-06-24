import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import styles from './Chat_styles'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact'
import ReactTooltip from 'react-tooltip'
import { getLocaleDate, formatDate } from '../../utilities/utilities'

class ChatModal extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let profileMainPic = ''
    for (const pic of this.props.profile.pictures) {
      if (pic.main) {
        profileMainPic = pic.url
        break
      }
    }
    const messages = this.props.messages.map((x, i) => {
      const date = formatDate(getLocaleDate(x.message_date), this.props.language)
      const message = (
        <React.Fragment>
          <div style={ styles.message } data-tip data-for={'msg' + i }>
            { x.message }
          </div>
          <ReactTooltip id={ 'msg' + i } effect='solid' place="top">
            <span>{ date }</span>
          </ReactTooltip>
        </React.Fragment>
      )
      return (
        <div key={ i } style={ x.sent ? styles.messagesSent : styles.messagesReceived }>
          <img style={ styles.picture } src={ x.sent ? profileMainPic : this.props.user.userInfos.mainPicture }
                className="rounded-circle" />
          { message }
        </div>
      )
    })
    let fullName = this.props.user.userInfos ? this.props.user.userInfos.mainInformations.first_name
                      + ' ' + this.props.user.userInfos.mainInformations.last_name : ''
    fullName = fullName.length > 30 ? this.props.user.userInfos ? this.props.user.userInfos.mainInformations.first_name + ' '
                    + this.props.user.userInfos.mainInformations.last_name.charAt(0) + '.' : '' : fullName
    return (
      <MDBModal size="md" isOpen={ this.props.toggled } toggle={ this.props.toggle }>
        <MDBModalHeader className="text-center" titleClass="w-100" toggle={ this.props.toggle }>
          { fullName }
        </MDBModalHeader>
        <MDBModalBody style={ styles.modalBody } >
          { messages }
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
    profile: state.profile,
    language: state.language
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ChatModal))
