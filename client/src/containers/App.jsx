import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route exact path='/' component={ LoginPage } /> 
        <Route path='/register' component={ RegisterPage } />
      </Router>
    )
  }
}

export default App