import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import styles from './Chat_styles'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon } from 'mdbreact'
import ReactTooltip from 'react-tooltip'
import { getLocaleDate, formatDate, getUtcDate } from '../../utilities/utilities'
import { getNotif } from '../../utilities/notifications'
import { sendMessage } from '../../actions/messagesActions'
import { socket } from '../../containers/App'
import { getLoveInfosFromProfile } from '../../utilities/loveUtilities'

class ChatModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      added: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    setInterval(() => {
      if (this.state.added) {
        this.setState({ added: false })
        const element = document.getElementById("chatModalBody")
        if (element) {
          element.scrollTop = element.scrollHeight
        }
      }
    }, 100)
  }
  
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  sendMessage (e) {
    e.preventDefault()
    if (this.state.message) {
      const utcDate = getUtcDate()
      const newMessage = {
        from_user: this.props.profile.informations.user_id,
        to_user: this.props.user.userId,
        view: 0,
        message: this.state.message,
        message_date: utcDate
      }
      socket.emit('message sent', newMessage)
      const notif = getNotif(6, this.props.user.userId, this.props.profile.informations.user_id,
                              getLoveInfosFromProfile(this.props.profile))
      socket.emit('add notification', notif)
      this.props.sendMessage(newMessage)
      newMessage.sent = 1
      this.props.addMessage(newMessage)
      this.setState({ message: '', added: true })
    }
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
          <img style={ styles.picture } src={ x.sent ? profileMainPic : this.props.user.userInfos ? this.props.user.userInfos.mainPicture : '' }
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
        <MDBModalBody id="chatModalBody" style={ styles.modalBody } >
          { messages }
        </MDBModalBody>
        <MDBModalFooter>
          <form style={ styles.form } onSubmit={ this.sendMessage }>
            <input onChange={ this.handleChange } name="message" value={ this.state.message }
                  style={ styles.input } type="text" placeholder="Type your message..." />
            <button style={ styles.sendBtn } type="submit" onClick={ this.sendMessage }>
              <MDBIcon style={ styles.icon } size="lg" className="mb-2 ml-2" icon="paper-plane" />
            </button>
          </form>
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
  sendMessage: sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ChatModal))
