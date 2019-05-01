import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from '../LoginPage'
import RegisterPage from '../RegisterPage'
import ResetPassword from '../ResetPassword'
import SearchPage from '../SearchPage'
import ProfilePage from '../ProfilePage'
import UpdateProfile from '../UpdateProfile'
import ConfirmUser from '../ConfirmUser'
import Loader from '../../components/Loader'
import { checkLogged } from '../../actions/userActions/loginUserActions'
import { getInformations } from '../../actions/profileActions/profileActions'
import { connect } from 'react-redux'
import { isObjectEmpty } from '../../utilities/utilities'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: true
    }
  }
  
  componentDidMount () {
    this.props.isLogged()
  }

  componentDidUpdate () {
    if (this.props.user.userId && isObjectEmpty(this.props.profile.mainInformations) && !this.props.profile.fetching_load) {
      this.setState({
        loaded: false
      })
      this.props.updateProfile(true)
      setTimeout(() => {
        this.setState({
          loaded: true
        })
      }, 700);
    }
  }

  render () {
    if (!this.props.user.checked || this.props.profile.fetching_load || !this.state.loaded) {
      return <Loader />
    } else {
      return (
        <Router>
          <PrivateRoute exact path='/' component={ SearchPage } logged={ this.props.user.userId } />
          <AlreadyLoggedRoute path='/login' component={ LoginPage } logged={ this.props.user.userId } /> 
          <AlreadyLoggedRoute path='/register' component={ RegisterPage } logged={ this.props.user.userId } />
          <AlreadyLoggedRoute path='/reset_pass' component={ ResetPassword } logged={ this.props.user.userId } />
          <Route path='/confirm_user/:userId' component={ ConfirmUser } />
          <PrivateRoute path='/profile' exact component={ ProfilePage } logged={ this.props.user.userId } />
          <PrivateRoute path='/profile/update' exact component={ UpdateProfile } logged={ this.props.user.userId } />
        </Router>
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
  updateProfile: getInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
