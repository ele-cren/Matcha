import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
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
            matches = [...matches, usersAbout.userId]
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
    const matches = this.getMatches()
    return (
      <React.Fragment>
        <div
          style={ [styles.menu, this.state.menuToggled && this.state.messagerieToggled ?
                  { visibility: 'visible' } : { visibility: 'hidden' }] }>
        </div>
        <div style={ styles.togglesContainer }>
          <div
            style={ [styles.toggleMenu, this.state.messagerieToggled ? { visibility: 'visible' } : { visibility: 'hidden' }] }
            onClick={ () => this.toggle('menuToggled') } >
            Messagerie
          </div>
          <div style={ styles.toggleMessagerie } onClick={ () => this.toggle('messagerieToggled') } >></div>
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
