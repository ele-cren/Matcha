import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ResetPassword from './ResetPassword'
import SearchPage from './SearchPage'
import MyProfilePage from './MyProfilePage'
import ProfilePage from './ProfilePage'
import UpdateProfile from './UpdateProfile'
import ConfirmUser from './ConfirmUser'
import Loader from '../components/Loader'
import Notifications from '../components/Notifications/Notifications'
import { checkLogged } from '../actions/userActions/loginUserActions'
import { getLoveInformations } from '../actions/loveActions/loveActions'
import { getInformations } from '../actions/profileActions/profileActions'
import { getNotifications } from '../actions/notificationsActions/notifActions'
import { connect } from 'react-redux'
import { isObjectEmpty } from '../utilities/utilities'
import Logout from './Logout'
import io from 'socket.io-client'

let socket

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  
  componentDidMount () {
    this.props.isLogged()
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 700)
    socket = io('http://localhost:3000')
  }

  componentDidUpdate () {
    if (this.props.user.userId && isObjectEmpty(this.props.profile.mainInformations) && !this.props.profile.fetching) {
      this.props.updateProfile(this.props.user.userId)
      this.props.updateLove(this.props.user.userId)
      this.props.getNotifications()
    }
  }

  render () {
    if (!this.props.user.checked || !this.state.loaded) {
      return <Loader />
    } else {
      return (
        <React.Fragment>
          <Notifications />
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={ SearchPage } logged={ this.props.user.userId } />
              <AlreadyLoggedRoute path='/login' component={ LoginPage } logged={ this.props.user.userId } /> 
              <AlreadyLoggedRoute path='/register' component={ RegisterPage } logged={ this.props.user.userId } />
              <AlreadyLoggedRoute path='/reset_pass' component={ ResetPassword } logged={ this.props.user.userId } />
              <Route path='/logout' component={ Logout } />
              <Route path='/confirm_user/:userId' component={ ConfirmUser } />
              <PrivateRoute path='/profile' exact component={ MyProfilePage } logged={ this.props.user.userId } />
              <PrivateRoute path='/profile/update' exact component={ UpdateProfile } logged={ this.props.user.userId } />
              <PrivateRoute path='/profile/:userId' exact component={ ProfilePage } logged={ this.props.user.userId } />
            </Switch>
          </Router>
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
    profile: state.profile
  }
}

const mapDispatchToProps = {
  isLogged: checkLogged,
  updateProfile: getInformations,
  updateLove: getLoveInformations,
  getNotifications: getNotifications
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export { socket, App }
