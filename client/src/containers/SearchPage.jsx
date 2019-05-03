import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { Redirect, Link } from 'react-router-dom'
import Loader from '../components/Loader'

class SearchPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true
    }
  }

  componentDidMount () {
    this.props.cleanErrors()
    if (!this.props.profile.fetching) {
      this.setState({
        isPageLoading: false
      })
    } else {
      setTimeout(() => {
        this.setState({
          isPageLoading: false
        })
      }, 700);
    }
  }

  render () {
    let searchPage = ''
    if (!this.props.profile.informations || !this.props.profile.informations.bio || !this.props.profile.informations.genre
        || this.props.profile.pictures.length === 0) {
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
    return (this.state.isPageLoading) ? <Loader /> : searchPage
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
