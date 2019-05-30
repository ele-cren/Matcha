import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { Redirect, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import GeoLocation from './GeoLocation'

class MainPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.cleanErrors()
  }

  render () {
    let searchPage = ''
    if (!this.props.profile.informations || !this.props.profile.informations.bio || !this.props.profile.informations.gender
        || !this.props.profile.informations.orientation || this.props.profile.pictures.length === 0) {
      searchPage = (
        <Redirect to='/profile/update' />
      )
    } else {
      searchPage = (
        <div>
          <h1>Hello Search</h1>
          <Link to='/profile'>My Profile</Link>
        </div>
      )
    }
    if (!this.props.profile.latitude || !this.props.profile.longitude) {
      searchPage = <GeoLocation />
    }
    return this.props.profile.fetching ? <Loader /> : searchPage
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
