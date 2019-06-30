import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../actions/userActions/logoutUserActions'
import { socket } from './App'

class Logout extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.logOutUser()
    socket.emit('user disconnected', this.props.user.user.userId)
  }

  render () {
    return (
      <Redirect to='/login' />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logOutUser: logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
