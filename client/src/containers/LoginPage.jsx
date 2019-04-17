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
import { connect } from 'react-redux'
import { tryLogIn } from '../actions/loginUserActions'
import { clean } from '../actions/cleanUserActions'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: '',
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onClean()
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm (event) {
    event.preventDefault()
    const data = {
      login: this.state.login,
      password: this.state.password
    }
    this.props.onLoginUser(data)
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
                    <p className="red-text mt-3">{ this.props.errors.login }</p>
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
                    <p className="red-text">{ this.props.errors.password }</p>
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
                  <p className={ this.props.success ? 'green-text' : 'red-text' }>{ this.props.message }</p>
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

const mapStateToProps = state => {
  return state
}

const mapActionsToProps = {
  onLoginUser: tryLogIn,
  onClean: clean
}

export default connect(mapStateToProps, mapActionsToProps)(LoginPage)