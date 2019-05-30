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
import { connect } from 'react-redux'
import { tryRegister } from '../actions/userActions/registerUserActions'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { isObjectEmpty } from '../utilities/utilities'
import { Redirect } from 'react-router-dom'
 
class RegisterPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      redirect: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onClean()
  }

  componentDidUpdate () {
    if (!this.state.redirect && isObjectEmpty(this.props.errors.errors) && this.props.errors.message) {
      setTimeout(() => {
        this.setState({
          redirect: true
        })
      }, 2000)
    }
  }

  submitForm (event) {
    event.preventDefault()
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }
    this.props.onRegister(data)
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    if (!this.state.redirect) {
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
                      <p className="red-text">{ this.props.errors.errors.first_name }</p>
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
                      <p className="red-text">{ this.props.errors.errors.last_name }</p>
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
                      <p className="red-text">{ this.props.errors.errors.username }</p>
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
                      <p className="red-text">{ this.props.errors.errors.email }</p>
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
                      <p className="red-text">{ this.props.errors.errors.password }</p>
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
                      <p className={ isObjectEmpty(this.props.errors.errors) ? 'green-text' : 'red-text' }>
                        { this.props.errors.message }
                      </p>
                    </div>
                  </form>
                  <MDBModalFooter>
                    <div className="font-weight-light">
                      <p>Already a member ? <Link to='/login'>Log In</Link></p>
                    </div>
                  </MDBModalFooter>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      )
    } else {
      return (
        <Redirect to='/login' />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

const mapDispatchToProps = {
  onRegister: tryRegister,
  onClean: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
