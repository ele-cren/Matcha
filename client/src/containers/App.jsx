import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ResetPassword from './ResetPassword'
import SearchPage from './SearchPage'
import { checkLogged } from '../actions/userActions/loginUserActions'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor (props) {
    super(props)
  }
  
  componentDidMount () {
    this.props.isLogged()
  }

  render () {
    if (!this.props.user.first_fetch) {
      return (
        <h1>Waiting</h1> // loading
      )
    } else {
      return (
        <Router>
          <PrivateRoute exact path='/' component={ SearchPage } logged={ this.props.user.userId } />
          <AlreadyLoggedRoute path='/login' component={ LoginPage } logged={ this.props.user.userId } /> 
          <AlreadyLoggedRoute path='/register' component={ RegisterPage } logged={ this.props.user.userId } />
          <AlreadyLoggedRoute path='/reset_pass' component={ ResetPassword } logged={ this.props.user.userId } />
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
  console.log(rest.logged)
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
    user: state.user
  }
}

const mapDispatchToProps = {
  isLogged: checkLogged
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
