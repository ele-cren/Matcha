import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { Redirect } from 'react-router-dom'
import Loader from '../components/Loader'
import MatchaNav from '../components/MatchaNav'
import { isObjectEmpty } from '../utilities/utilities'
import { updateLastActive } from '../requests/userUpdates'
import Profile from '../components/Profile/Profile'
import { getLovers } from '../requests/profile'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true,
      isLoadingNeeded: false,
      isFetchingLovers: false,
      loversInfos: {}
    }
    this.getLovers = this.getLovers.bind(this)
  }

  componentDidMount () {
    updateLastActive()
    this.getLovers()
    if (!this.props.profile.fetching) {
      this.setState({
        isPageLoading: false
      })
    } else {
      this.setState({
        isLoadingNeeded: true
      })
      setTimeout(() => {
        this.setState({
          isPageLoading: false
        })
      }, 700)
    }
  }

  getLovers () {
    this.setState({
      isFetchingLovers: true
    })
    const request = getLovers(this.props.user.userId)
    request.onload = () => {
      console.log(request.response.lovers)
      this.setState({
        loversInfos: request.response.lovers,
        isFetchingLovers: false
      })
    }
  }

  render () {
    let profilePage = (
      <React.Fragment>
        <MatchaNav color={ this.props.profile.informations.gender === 1 ? "indigo darken-4" : "pink darken-4" } />
        <Profile profile={ this.props.profile } isMyProfile={ true }/>
      </React.Fragment>
    )
    profilePage = (isObjectEmpty(this.props.profile.informations) ||
                    !this.props.profile.informations.bio || 
                    !this.props.profile.informations.gender || !this.props.profile.informations.orientation ||
                    this.props.profile.pictures.length === 0) ? <Redirect to='/profile/update' /> : profilePage
    return (this.state.isPageLoading || (this.props.profile.fetching && this.state.isLoadingNeeded)) ? <Loader /> : profilePage
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    errors: state.errors
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
