import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact'
import styles from './Chat_styles'
import DisplayMatches from './DisplayMatches'
import ChatModal from './ChatModal'
import { socket } from '../../containers/App'
import { viewMessages, receiveMessage } from '../../actions/messagesActions'
const Text = require('../../../languageLocalisation/texts.json')

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuToggled: false,
      messagerieToggled: true,
      currentMessages: [],
      currentUser: {},
      chatToggled: false
    }
    this.getMatches = this.getMatches.bind(this)
    this.dropdownRef = React.createRef()
    this.toggle = this.toggle.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.openChat = this.openChat.bind(this)
    this.addMessage = this.addMessage.bind(this)
    this.checkReceive = this.checkReceive.bind(this)
  }

  componentDidMount () {
    socket.on('message sent', this.checkReceive)
  }


  checkReceive (message) {
    if (message.to_user === this.props.profile.informations.user_id) {
      if (this.state.chatToggled) {
        socket.emit('view messages', message.from_user, this.props.profile.informations.user_id)
        message.view = 1
        setTimeout(() => {
          const element = document.getElementById("chatModalBody")
          if (element) {
            element.scrollTop = element.scrollHeight
          }
        }, 100)
      }
      this.props.receiveMessage(message)
      this.addMessage(message)
    }
  }

  getMatches () {
    let matches = []
    for (const meAbout of this.props.love.meAboutUsers) {
      if (meAbout.like) {
        for (const usersAbout of this.props.love.usersAboutMe) {
          if (meAbout.userId === usersAbout.userId && usersAbout.like) {
            matches = [...matches, usersAbout]
          }
        }
      }
    }
    return matches
  }

  toggleModal () {
    this.setState({ chatToggled: !this.state.chatToggled })
  }

  toggle (key) {
    this.setState({ [key]: !this.state[key] })
  }

  openChat (user, messages) {
    socket.emit('view messages', user.userId, this.props.profile.informations.user_id)
    const newMessages = Object.assign({}, this.props.messages)
    newMessages.messagesIReceived = newMessages.messagesIReceived.map(x => {
      x.view = 1
      return x
    })
    this.props.viewMessages(newMessages)
    this.setState({
      currentUser: user,
      currentMessages: messages
    }, this.toggleModal)
    setTimeout(() => {
      const element = document.getElementById("chatModalBody")
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    }, 200)
  }
  
  addMessage (message) {
    const newMessages = [...this.state.currentMessages, message]
    this.setState({ currentMessages: newMessages })
  }

  render () {
    const myText = Text[this.props.language]
    const loader = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
    const matches = this.getMatches()
    const styleHidden = {
      visibility: 'hidden'
    }
    return this.props.user.user.userId ? (
      <React.Fragment>
        <ChatModal toggled={this.state.chatToggled } toggle={ this.toggleModal } user={ this.state.currentUser }
                  messages={ this.state.currentMessages } addMessage={ this.addMessage } />
        <div
          style={ this.state.menuToggled && this.state.messagerieToggled ? this.props.love.checked ? styles.menu : [styles.menu, { justifyContent: 'center', alignItems: 'center' }] : [styles.menu, styleHidden] }>
          { this.props.love.checked ? 
            <DisplayMatches language={ this.props.language } matches={ matches } messages={ this.props.messages }
            openChat={ this.openChat }  /> : loader }
        </div>
        <div style={ styles.togglesContainer }>
          <div
            style={ this.state.messagerieToggled ? styles.toggleMenu : [styles.toggleMenu, styleHidden] }
            onClick={ () => this.toggle('menuToggled') } >
            { myText["mailbox"] }
          </div>
          <div style={ styles.toggleMessagerie } onClick={ () => this.toggle('messagerieToggled') } >
            { this.state.messagerieToggled ? <MDBIcon icon="angle-right" /> : <MDBIcon icon="angle-left" /> }
          </div>
        </div>
      </React.Fragment>
    ) : ''
  }
}

const mapStateToProps = state => {
  return {
    love: state.love,
    messages: state.messages,
    language: state.language,
    profile: state.profile,
    user: state.user
  }
}

const mapDispatchToProps = {
  viewMessages: viewMessages,
  receiveMessage: receiveMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Chat))
