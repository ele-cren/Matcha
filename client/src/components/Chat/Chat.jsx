import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact'
import styles from './Chat_styles'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuToggled: false,
      messagerieToggled: true
    }
    this.getMatches = this.getMatches.bind(this)
    this.dropdownRef = React.createRef()
    this.toggle = this.toggle.bind(this)
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

  toggle (key) {
    this.setState({ [key]: !this.state[key] })
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
    const displayMatches = matches.map((x, i) => {
      let fullName = x.userInfos.mainInformations.first_name + ' ' + x.userInfos.mainInformations.last_name
      fullName = fullName.length > 30 ? x.userInfos.mainInformations.first_name
                  + ' ' + x.userInfos.mainInformations.last_name.charAt(0) + '.' : fullName
      let message = 'Bonjour à tous et à toutes et bienvenue'
      message = message.length > 20 ? message.substring(0, 20) + '...' : message
      return (
        <div key={ i } style={ styles.matchDisplay } >
          <img src={ x.userInfos.mainPicture } className="rounded-circle" style={ styles.picture } />
          <div style={ styles.messageInfosMatch }>
            <div style={ { fontSize: '12px' } }>
              { fullName }
            </div>
            <div style={ styles.lastMessage }>
              { message } <div style={ styles.countMsg }>5</div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <React.Fragment>
        <div
          style={ this.state.menuToggled && this.state.messagerieToggled ? this.props.love.checked ? styles.menu : [styles.menu, { justifyContent: 'center', alignItems: 'center' }] : [styles.menu, styleHidden] }>
          { this.props.love.checked ? displayMatches : loader }
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
    language: state.language
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Chat))
