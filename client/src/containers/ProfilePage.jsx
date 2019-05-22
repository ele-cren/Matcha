import React from 'react'
import { getProfile } from '../requests/profile'
import Loader from '../components/Loader'
import Profile from '../components/Profile/Profile'
import MatchaNav from '../components/MatchaNav'
import { isObjectEmpty } from '../utilities/utilities'
import { connect } from 'react-redux'
import { updateLove } from '../actions/loveActions/loveActions'
import MatchModal from '../components/MatchModal'
import { getLoveInfosFromProfile } from '../utilities/utilities'
import { socket } from '../containers/App'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true,
      isFetching: true,
      profile: {}
    }
    this.getDataProfile = this.getDataProfile.bind(this)
    this.getLoveInfos = this.getLoveInfos.bind(this)
    this.emitView = this.emitView.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isPageLoading: false
      })
    }, 700)
    this.getDataProfile(this.props.match.params.userId)
  }

  viewProfile () {
    const userId = this.props.user.userId
    const userTarget = this.props.match.params.userId
    let alreadyViewed = false
    this.props.love.meAboutUsers.map(x => {
      if (x.userId === userTarget && x.view) {
        alreadyViewed = true
      }
    })
    if (!alreadyViewed) {
      this.emitView(userId, userTarget)
    }
  }

  emitView (userId, userTarget) {
    socket.emit('view user', userId, userTarget)
    let meAboutUsers = this.props.love.meAboutUsers
    let exists = false
    meAboutUsers.forEach(x => {
      if (x.userId === userTarget) {
        exists = true
      }
    })
    if (exists) {
      meAboutUsers = meAboutUsers.map(x => {
        if (x.userId === userTarget) {
          x.view = 1
        }
        return x
      })
    } else {
      const loveInfos = getLoveInfosFromProfile(this.state.profile)
      const newUser = {
        userId: userTarget,
        view: 1,
        like: 0,
        userInfos: loveInfos
      }
      meAboutUsers = [...meAboutUsers, newUser]
    }
    this.props.updateLove({
      usersAboutMe: this.props.love.usersAboutMe,
      meAboutUsers: meAboutUsers
    })
  }

  getLoveInfos () {
    let userAboutMe = {}
    let meAboutUser = {}
    this.props.love.usersAboutMe.map(x => {
      if (x.user_id === this.props.match.params.userId) {
        userAboutMe = Object.assign({}, x)
      }
    })
    this.props.love.meAboutUsers.map(x => {
      if (x.user_id === this.props.match.params.userId) {
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
    const loveInfos = this.getLoveInfos()
    let profilePage = ''
    if (!isObjectEmpty(this.state.profile)) {
      profilePage = this.state.profile.informations !== undefined ? (
        <React.Fragment>
          { /* <MatchModal
            picture={ this.state.profile.pictures[0].url }
            name={ this.state.profile.mainInformations.first_name + ' ' + this.state.profile.mainInformations.last_name }
            modal={ this.state.modal } toggle={ this.toggleModal }
          gender={ this.state.profile.informations.gender } /> */ }
          <MatchaNav color={ this.state.profile.informations.gender === 1 ? "indigo darken-4" : "pink darken-4" } />
          <Profile
            profile={ this.state.profile }
            loveInfos={ { userAboutMe: loveInfos.userAboutMe, meAboutUser: loveInfos.meAboutUser } }
            isMyProfile={ false } />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MatchaNav color="brown lighten-3" />
          <h2 className="text-center mt-4">This profile does not exist</h2>
        </React.Fragment>
      )
    }
    return this.state.isPageLoading || this.state.isFetching ? <Loader /> : profilePage
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    love: state.love
  }
}

const mapDispatchToProps = {
  updateLove: updateLove
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
