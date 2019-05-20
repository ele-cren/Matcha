import React from 'react'
import { getProfile } from '../requests/profile'
import Loader from '../components/Loader'
import Profile from '../components/Profile/Profile'
import MatchaNav from '../components/MatchaNav'
import { isObjectEmpty } from '../utilities/utilities'
import { likeUser, getLoveInfos, dislikeUser } from '../requests/love'
import { connect } from 'react-redux'
import MatchModal from '../components/MatchModal'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true,
      isFetching: true,
      profile: {},
    }
    this.getDataProfile = this.getDataProfile.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        isPageLoading: false
      })
    }, 700)
    this.getDataProfile(this.props.match.params.userId)
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
    }
  }
  
  render () {
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
    user: state.user
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
