import React from 'react'
import { connect } from 'react-redux'
import { socket } from '../containers/App'
import { updateLove } from '../actions/loveActions/loveActions'
import { saveSearched, saveSuggested } from '../actions/searchActions'
import { getUtcDate } from '../utilities/utilities'

class Updater extends React.Component {
  constructor (props) {
    super(props)
    this.updateConnect = this.updateConnect.bind(this)
    this.updateDisconnect = this.updateDisconnect.bind(this)
  }

  componentDidMount () {
    socket.on('user connected', this.updateConnect)
    socket.on('user disconnected', this.updateDisconnect)
  }

  updateConnect (userId) {
    const newLove = Object.assign({}, this.props.love)
    const lastSuggested = [].concat(this.props.search.lastSuggested)
    const lastSearched = [].concat(this.props.search.lastSearched)
    for (const meAbout of newLove.meAboutUsers) {
      if (meAbout.userId === userId) {
        meAbout.userInfos.mainInformations.online = 1
      }
    }
    for (const usersAbout of newLove.usersAboutMe) {
      if (usersAbout.userId === userId) {
        usersAbout.userInfos.mainInformations.online = 1
      }
    }
    for (const lastSug of lastSuggested) {
      if (userId === lastSug.informations.user_id) {
        lastSug.informations.online = 1
      }
    }
    for (const lastSear of lastSearched) {
      if (userId === lastSear.informations.user_id) {
        lastSear.informations.online = 1
      }
    }
    this.props.updateLove({
      meAboutUsers: newLove.meAboutUsers,
      usersAboutMe: newLove.usersAboutMe
    })
    this.props.saveSearched(lastSearched)
    this.props.saveSuggested(lastSuggested)
  }

  updateDisconnect (userId) {
    console.log('disco')
    const date = getUtcDate()
    const newLove = Object.assign({}, this.props.love)
    const lastSuggested = [].concat(this.props.search.lastSuggested)
    const lastSearched = [].concat(this.props.search.lastSearched)
    for (const meAbout of newLove.meAboutUsers) {
      if (meAbout.userId === userId) {
        meAbout.userInfos.mainInformations.online = 0
        meAbout.userInfos.mainInformations.last_disconnect = date
      }
    }
    for (const usersAbout of newLove.usersAboutMe) {
      if (usersAbout.userId === userId) {
        usersAbout.userInfos.mainInformations.online = 0
        usersAbout.userInfos.mainInformations.last_disconnect = date
      }
    }
    for (const lastSug of lastSuggested) {
      if (userId === lastSug.informations.user_id) {
        lastSug.informations.online = 0
        lastSug.mainInformations.last_disconnect = date
      }
    }
    for (const lastSear of lastSearched) {
      if (userId === lastSear.informations.user_id) {
        lastSear.informations.online = 0
        lastSear.mainInformations.last_disconnect = date
      }
    }
    this.props.updateLove({
      meAboutUsers: newLove.meAboutUsers,
      usersAboutMe: newLove.usersAboutMe
    })
    this.props.saveSearched(lastSearched)
    this.props.saveSuggested(lastSuggested)
  }

  render () {
    return ''
  }
}

const mapStateToProps = state => {
  return {
    love: state.love,
    search: state.search
  }
}

const mapDispatchToProps = {
  updateLove: updateLove,
  saveSearched: saveSearched,
  saveSuggested: saveSuggested
}

export default connect(mapStateToProps, mapDispatchToProps)(Updater)
