import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { Redirect } from 'react-router-dom'
import Loader from '../components/Loader'
import MatchaNav from '../components/MatchaNav'
import { isObjectEmpty } from '../utilities/utilities'
import { updateLastActive } from '../actions/userActions/userUpdates'
import Profile from '../components/Profile/Profile'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true,
      isLoadingNeeded: false
    }
  }

  componentDidMount () {
    updateLastActive()
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

  render () {
    let profilePage = (
      <React.Fragment>
        <MatchaNav gender= { this.props.profile.informations.gender }/>
        <Profile profile={ this.props.profile } />
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
    profile: state.profile,
    errors: state.errors
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
