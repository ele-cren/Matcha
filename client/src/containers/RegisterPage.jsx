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
  MDBBtn
} from 'mdbreact'
import { Link } from 'react-router-dom'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      success: true,
      errors: {},
      message: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  submitForm (event) {
    event.preventDefault()
    const first_name = encodeURIComponent(this.state.first_name)
    const last_name = encodeURIComponent(this.state.last_name)
    const username = encodeURIComponent(this.state.username)
    const email = encodeURIComponent(this.state.email)
    const password = encodeURIComponent(this.state.password)
    const password_confirmation = encodeURIComponent(this.state.password_confirmation)
    const params = `first_name=${ first_name }&last_name=${ last_name }&username=${ username }&email=${ email }&password=${ password }&password_confirmation=${ password_confirmation }`
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/auth/register')
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
    xhr.onload = () => {
      this.setState({
        errors: xhr.response.errors,
        message: xhr.response.message,
        success: xhr.response.success
      })
    }
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <MDBCardHeader className="form-header warm-flame-gradient rounded">
                  <h3 className="my-3">
                  <MDBIcon icon="pen-nib" /> Register
                  </h3>
                </MDBCardHeader>
                <br />
                <form onSubmit={ this.submitForm }>
                  <div className="grey-text">
                    <p className="red-text">{ this.state.errors.first_name }</p>
                    <label
                      htmlFor="first_name"
                      className="grey-text font-weight-light"
                      >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={ this.state.first_name }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                    <br />
                    <p className="red-text">{ this.state.errors.last_name }</p>
                    <label
                      htmlFor="last_name"
                      className="grey-text font-weight-light"
                      >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={ this.state.last_name }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                    <br />
                    <p className="red-text">{ this.state.errors.username }</p>
                    <label
                      htmlFor="username"
                      className="grey-text font-weight-light"
                      >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={ this.state.username }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                    <br />
                    <p className="red-text">{ this.state.errors.email }</p>
                    <label
                      htmlFor="email"
                      className="grey-text font-weight-light"
                      >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={ this.state.email }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                    <br />
                    <p className="red-text">{ this.state.errors.password }</p>
                    <label
                      htmlFor="password"
                      className="grey-text font-weight-light"
                      >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={ this.state.password }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                    <br />
                    <label
                      htmlFor="password_confirmation"
                      className="grey-text font-weight-light"
                      >
                      Confirmation
                    </label>
                    <input
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      value={ this.state.password_confirmation }
                      onChange={ this.handleChange }
                      className="form-control"
                    />
                  </div>

                  <div className="text-center mt-4">
                    <MDBBtn color="deep-orange" className="mb-3" type="submit">
                    Register
                    </MDBBtn>
                    <p className={ this.state.success ? 'green-text' : 'red-text' }>{ this.state.message }</p>
                  </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>Already a member ? <Link to='/'>Log In</Link></p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default RegisterPage