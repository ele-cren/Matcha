import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ResetPassword from './ResetPassword'
import MainPage from './MainPage'
import MyProfilePage from './MyProfilePage'
import ProfilePage from './ProfilePage'
import UpdateProfile from './UpdateProfile/UpdateProfile'
import ConfirmUser from './ConfirmUser'
import Loader from '../components/Loader'
import Notifications from '../components/Notifications/Notifications'
import Chat from '../components/Chat/Chat'
import { checkLogged } from '../actions/userActions/loginUserActions'
import { getLoveInformations } from '../actions/loveActions/loveActions'
import { getInformations } from '../actions/profileActions/profileActions'
import { getNotifications } from '../actions/notificationsActions/notifActions'
import { getBlocked, getReported } from '../actions/banActions/banActions'
import { getMessagesRequest } from '../actions/messagesActions'
import { connect } from 'react-redux'
import { isObjectEmpty } from '../utilities/utilities'
import Logout from './Logout'
import io from 'socket.io-client'

let socket

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    this.props.isLogged()
  }
  
  componentDidUpdate () {
    if (this.props.user.user.userId && isObjectEmpty(this.props.profile.mainInformations) && !this.props.profile.fetching) {
      socket = io('http://localhost:3000', { query: 'userId=' + this.props.user.user.userId })
      this.props.updateProfile(this.props.user.user.userId)
      this.props.updateLove(this.props.user.user.userId)
      this.props.getBlocked()
      this.props.getReported()
      this.props.getNotifications()
      this.props.getMessages()
    }
  }

  render () {
    if (!this.props.user.checked || (this.props.user.checked && this.props.user.user.userId && !this.props.love.checked)
        || (this.props.user.checked && this.props.user.user.userId && !this.props.messages.checked)) {
      return <Loader />
    } else {
      return (
        <React.Fragment>
          { socket ? <Notifications /> : '' }
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={ MainPage } logged={ this.props.user.user.userId } />
              <AlreadyLoggedRoute path='/login' component={ LoginPage } logged={ this.props.user.user.userId } /> 
              <AlreadyLoggedRoute path='/register' component={ RegisterPage } logged={ this.props.user.user.userId } />
              <AlreadyLoggedRoute path='/reset_pass' component={ ResetPassword } logged={ this.props.user.user.userId } />
              <Route path='/logout' component={ Logout } />
              <Route path='/confirm_user/:userId' component={ ConfirmUser } />
              <PrivateRoute path='/profile' exact component={ MyProfilePage } logged={ this.props.user.user.userId } />
              <PrivateRoute path='/profile/update' exact component={ UpdateProfile } logged={ this.props.user.user.userId } />
              <PrivateRoute path='/profile/:userId' exact component={ ProfilePage } logged={ this.props.user.user.userId } />
            </Switch>
          </Router>
          { socket ? <Chat /> : '' }
        </React.Fragment>
      )
    }
  }
}

function AlreadyLoggedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !rest.logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    love: state.love,
    messages: state.messages
  }
}

const mapDispatchToProps = {
  isLogged: checkLogged,
  updateProfile: getInformations,
  updateLove: getLoveInformations,
  getNotifications: getNotifications,
  getBlocked: getBlocked,
  getReported: getReported,
  getMessages: getMessagesRequest
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export { socket, App }
