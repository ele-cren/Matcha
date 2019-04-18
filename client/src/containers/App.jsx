import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
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
    return (
      <Router>
        <PrivateRoute exact path='/' component={ SearchPage } />
        <Route path='/login' component={ LoginPage } /> 
        <Route path='/register' component={ RegisterPage } />
      </Router>
    )
  }
}

// function AlreadyLoggedRoute({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   )
// }

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        // false ? (
        //   <Component {...props} />
        // ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        // )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = () => {
  return {
    isLogged: checkLogged
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
