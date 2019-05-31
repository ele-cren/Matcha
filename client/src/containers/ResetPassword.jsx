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
import { connect } from 'react-redux'
import { resetPass } from '../actions/userActions/resetPasswordAction'
import { Link } from 'react-router-dom'
import { isObjectEmpty } from '../utilities/utilities'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { getResetErrors } from '../utilities/errorsFinder'

class ResetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount () {
    this.props.cleanErrors()
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm (event) {
    event.preventDefault()
    this.props.resetPass(this.state.login, this.props.language)
  }

  render () {
    const resetErrors = getResetErrors(this.props.errors.errors, this.props.language)
    return (
      <MDBContainer>
      <MDBRow>
        <MDBCol md="12">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header tempting-azure-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Reset Password
                </h3>
              </MDBCardHeader>
              <form onSubmit={ this.submitForm }>
                <div className="grey-text">
                  <p className="red-text mt-3">{ resetErrors.login }</p>
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
                </div>

              <div className="text-center mt-4">
                <MDBBtn
                  color="light-blue"
                  className="mb-3"
                  type="submit"
                >
                  Send
                </MDBBtn>
                <p className={ this.props.errors.errors.length === 0 ? 'green-text' : 'red-text' }>
                  { this.props.errors.message }
                </p>
              </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Remember your password ? <Link to='/login'>Log In</Link></p>
                  <p>Not a member ? <Link to='/register'>Register</Link></p>
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

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    language: state.language
  }
}

const mapDispatchToProps = {
  resetPass: resetPass,
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
