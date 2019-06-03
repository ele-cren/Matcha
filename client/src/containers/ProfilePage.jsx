import React from 'react'
import { getProfile } from '../requests/profile'
import Loader from '../components/Loader'
import Profile from '../components/Profile/Profile'
import MatchaNav from '../components/MatchaNav'
import { isObjectEmpty } from '../utilities/utilities'
import { connect } from 'react-redux'
import { updateLove } from '../actions/loveActions/loveActions'
import MatchModal from '../components/MatchModal'
import { getUser } from '../utilities/loveUtilities'
import { getView } from '../utilities/viewUtilities'
import { getLike } from '../utilities/likeUtilities'
import { socket } from '../containers/App'
import { getNotif } from '../utilities/notifications'
import { getLoveInfosFromProfile } from '../utilities/loveUtilities'
const Text = require('../../languageLocalisation/texts.json')

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      profile: {},
      matchModal: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.getDataProfile = this.getDataProfile.bind(this)
    this.getLoveInfos = this.getLoveInfos.bind(this)
    this.viewProfile = this.viewProfile.bind(this)
    this.updateLike = this.updateLike.bind(this)
    this.addScore = this.addScore.bind(this)
  }

  componentDidMount () {
    this.getDataProfile(this.props.match.params.userId)
  }

  toggleModal () {
    this.setState({
      matchModal: !this.state.matchModal
    })
  }

  updateLike (value = 1) {
    const userId = this.props.user.user.userId
    const userTarget = this.props.match.params.userId
    const userILike = getUser(this.props.love.usersAboutMe, userTarget)
    const userInfos = getLoveInfosFromProfile(this.props.profile) //Userinfos for notification
    const notif = getNotif(value === 1 ? 2 : 4, userTarget, userId, userInfos) // Notification for like or dislike
    socket.emit('add notification', notif)
    socket.emit(value === 1 ? 'like user' : 'dislike user', userId, userTarget, this.props.profile)
    const meAboutUsers = getLike(this.props.love.meAboutUsers, userTarget, this.state.profile, value)
    this.addScore(value === 1 ?  20 : -20)
    this.props.updateLove({
      meAboutUsers: meAboutUsers,
      usersAboutMe: this.props.love.usersAboutMe
    })
    if (value === 1 && userILike && userILike.like) {
      const notif = getNotif(3, userTarget, userId, userInfos) // Notification for match
      socket.emit('add notification', notif)
      this.toggleModal()
    }
    if (value === 0 && userILike && userILike.like) {
      const notif = getNotif(5, userTarget, userId, userInfos) // Notification for unmatch
      socket.emit('add notification', notif)
    }
  }

  viewProfile () {
    const userId = this.props.user.user.userId
    const userTarget = this.props.match.params.userId
    const user = getUser(this.props.love.meAboutUsers, userTarget)
    if ((user && !user.view) || !user) {
      this.addScore(10)
      const notif = getNotif(1, userTarget, userId, getLoveInfosFromProfile(this.props.profile))
      socket.emit('add notification', notif)
      socket.emit('view user', userId, userTarget, this.props.profile)
      const meAboutUsers = getView(this.props.love.meAboutUsers, userTarget, this.state.profile)
      this.props.updateLove({
        meAboutUsers: meAboutUsers,
        usersAboutMe: this.props.love.usersAboutMe
      })
    }
  }

  addScore (score) {
    const newProfile = Object.assign({}, this.state.profile)
    newProfile.informations.score += score
    this.setState({
      profile: newProfile
    })
  }

  getLoveInfos () {
    let userAboutMe = {}
    let meAboutUser = {}
    this.props.love.usersAboutMe.map(x => {
      if (x.userId === this.props.match.params.userId) {
        userAboutMe = Object.assign({}, x)
      }
    })
    this.props.love.meAboutUsers.map(x => {
      if (x.userId === this.props.match.params.userId) {
        meAboutUser = Object.assign({}, x)
      }
    })
    return {
      meAboutUser: meAboutUser,
      userAboutMe: userAboutMe
    }
  }

  getDataProfile (userId) {
    const request = getProfile(userId)
    request.onload = () => {
      const profile = {
        mainInformations: request.response.mainInformations,
        informations: request.response.informations,
        pictures: request.response.pictures,
        tags: request.response.tags
      }
      this.setState({
        profile: profile,
        isFetching: false
      })
      this.viewProfile()
    }
  }
  
  render () {
    const myText = Text[this.props.language]
    const loveInfos = this.getLoveInfos()
    let profilePage = ''
    if (!isObjectEmpty(this.state.profile)) {
      profilePage = this.state.profile.informations !== undefined ? (
        <React.Fragment>
          <MatchModal
            picture={ this.state.profile.pictures[0].url }
            language={ this.props.language }
            name={ this.state.profile.mainInformations.first_name + ' ' + this.state.profile.mainInformations.last_name }
            modal={ this.state.matchModal } toggle={ this.toggleModal }
            gender={ this.state.profile.informations.gender } />
          <MatchaNav color={ this.state.profile.informations.gender === 1 ? "indigo darken-4" : "pink darken-4" } />
          <Profile
            profile={ this.state.profile }
            loveInfos={ { userAboutMe: loveInfos.userAboutMe, meAboutUser: loveInfos.meAboutUser } }
            updateLike={ this.updateLike }
            language={ this.props.language }
            blocked={ this.props.blocked }
            isMyProfile={ false } />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MatchaNav color="brown lighten-3" />
          <h2 className="text-center mt-4">{ myText["profile_notexist"] }</h2>
        </React.Fragment>
      )
    }
    return this.state.isFetching ? <Loader /> : profilePage
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    love: state.love,
    profile: state.profile,
    language: state.language,
    blocked: state.blocked
  }
}

const mapDispatchToProps = {
  updateLove: updateLove
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
