import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { Redirect, Link } from 'react-router-dom'
import Loader from '../components/Loader'

class SearchPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.cleanErrors()
  }

  render () {
    if (this.props.profile.fetching) {
      return <Loader />
    } else {
      if (!this.props.profile.informations || !this.props.profile.informations.bio || !this.props.profile.informations.genre
          || this.props.profile.pictures.length === 0) {
        return (
          <Redirect to='/profile/update' />
        )
      } else {
        return (
          <div>
            <h1>Hello Search</h1>
            <Link to='/profile'>My Profile</Link>
          </div>
        )
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profile: state.profile,
    errors: state.errors
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)