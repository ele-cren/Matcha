import React from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from 'mdbreact'
import { Link } from 'react-router-dom'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      errors: {},
      message: '',
      success: true
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm (event) {
    event.preventDefault()
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/login')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    const login = encodeURIComponent(this.state.login)
    const pass = encodeURIComponent(this.state.password)
    const params = `login=${ login }&password=${ pass }`
    xhr.send(params)
    xhr.onload= () => {
      this.setState({
        message: xhr.response.message,
        errors: xhr.response.errors,
        success: xhr.response.success
      })
    }
  }

  render () {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header deep-blue-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> Login
                  </h3>
                </MDBCardHeader>
                <form onSubmit={ this.submitForm }>
                  <div className="grey-text">
                    <p className="red-text mt-3">{ this.state.errors.login }</p>
                    <MDBInput
                      className="p-2"
                      name="login"
                      value={ this.state.login }
                      onChange={ this.handleChange }
                      label="Type your email or your username"
                      icon="envelope"
                      group
                      type="text"
                    />
                    <p className="red-text">{ this.state.errors.password }</p>
                    <MDBInput
                      className="p-2"
                      name="password"
                      value={ this.state.password }
                      onChange={ this.handleChange }
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                    />
                  </div>
  
                <div className="text-center mt-4">
                  <MDBBtn
                    color="light-blue"
                    className="mb-3"
                    type="submit"
                  >
                    Login
                  </MDBBtn>
                  <p className={ this.state.success ? 'green-text' : 'red-text' }>{ this.state.message }</p>
                </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>Not a member ? <Link to='/register'>Sign Up</Link></p>
                    <p>Forgot Password ?</p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LoginPage