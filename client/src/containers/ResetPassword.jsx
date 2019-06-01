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
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { getResetErrors } from '../utilities/errorsFinder'
import MatchaNav from '../components/MatchaNav'
const Text = require('../../languageLocalisation/texts.json')

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
    const myText = Text[this.props.language]
    return (
      <React.Fragment>
        <MatchaNav color="pink darken-4" />
        <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard className="mt-2">
              <MDBCardBody>
                <MDBCardHeader className="form-header tempting-azure-gradient rounded">
                  <h3 className="my-3">
                    <MDBIcon icon="lock" /> { myText["reset_password"] }
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
                      label={ myText["login_label"] }
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
                    { myText["send_button"] }
                  </MDBBtn>
                  <p className={ this.props.errors.errors.length === 0 ? 'green-text' : 'red-text' }>
                    { this.props.errors.message }
                  </p>
                </div>
                </form>
                <MDBModalFooter>
                  <div className="font-weight-light">
                    <p>{ myText["remember_password"] }<Link to='/login'>{ myText["nav_login"] }</Link></p>
                    <p>{ myText["not_member"] }<Link to='/register'>{ myText["nav_register"] }</Link></p>
                  </div>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </React.Fragment>
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
