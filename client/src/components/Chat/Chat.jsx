import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact'
import styles from './Chat_styles'
import DisplayMatches from './DisplayMatches'
import ChatModal from './ChatModal'
import { socket } from '../../containers/App'
import { viewMessages } from '../../actions/messagesActions'

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
  }
  
  addMessage (message) {
    const newMessages = [...this.state.currentMessages, message]
    this.setState({ currentMessages: newMessages })
  }

  render () {
    const loader = (
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
    const matches = this.getMatches()
    const styleHidden = {
      visibility: 'hidden'
    }
    return (
      <React.Fragment>
        <ChatModal toggled={this.state.chatToggled } toggle={ this.toggleModal } user={ this.state.currentUser }
                  messages={ this.state.currentMessages } addMessage={ this.addMessage } />
        <div
          style={ this.state.menuToggled && this.state.messagerieToggled ? this.props.love.checked ? styles.menu : [styles.menu, { justifyContent: 'center', alignItems: 'center' }] : [styles.menu, styleHidden] }>
          { this.props.love.checked ? 
            <DisplayMatches matches={ matches } messages={ this.props.messages } openChat={ this.openChat }  />
            : loader }
        </div>
        <div style={ styles.togglesContainer }>
          <div
            style={ this.state.messagerieToggled ? styles.toggleMenu : [styles.toggleMenu, styleHidden] }
            onClick={ () => this.toggle('menuToggled') } >
            Messagerie
          </div>
          <div style={ styles.toggleMessagerie } onClick={ () => this.toggle('messagerieToggled') } >
            { this.state.messagerieToggled ? <MDBIcon icon="angle-right" /> : <MDBIcon icon="angle-left" /> }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    love: state.love,
    messages: state.messages,
    language: state.language,
    profile: state.profile
  }
}

const mapDispatchToProps = {
  viewMessages: viewMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Chat))
