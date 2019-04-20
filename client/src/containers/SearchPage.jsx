import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { getInformations } from '../actions/profileActions/profileActions'

class SearchPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.cleanErrors()
    if (!this.props.profile.first_fetch) {
      this.props.updateProfile(false)
    }
  }

  render () {
    if (!this.props.profile.fetched) {
      return (
        <h1>Waiting</h1>
      )
    } else {
      return (
        <h1>Hello Search</h1>
      )
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
  cleanErrors: cleanErrors,
  updateProfile: getInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)