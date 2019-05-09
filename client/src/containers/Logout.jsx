import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/userActions/logoutUserActions'

class Logout extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.logOutUser()
  }

  render () {
    return (
      <Redirect to='/login' />
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = {
  logOutUser: logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
