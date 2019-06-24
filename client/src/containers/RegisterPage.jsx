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
import { Redirect } from 'react-router-dom'
import MatchaNav from '../components/MatchaNav'
import { getRegisterErrors } from '../utilities/errorsFinder'
const Text = require('../../languageLocalisation/texts.json')
const Messages = require('../../languageLocalisation/authMessages.json')
 
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
      redirect: false,
      submited: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onClean()
  }

  componentDidUpdate () {
    if (!this.state.redirect && this.props.errors.errors.length === 0 && this.state.submited) {
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
    const answer = this.props.onRegister(data, this.props.language)
    answer.request.onload = () => {
      answer.callback()
      this.setState({ submited: true })
    }
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const registerErrors = getRegisterErrors(this.props.errors.errors, this.props.language)
    const myText = Text[this.props.language]
    if (!this.state.redirect) {
      return (
        <React.Fragment>
          <MatchaNav color="pink darken-4" />
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mt-2">
                  <MDBCardBody>
                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                      <h3 className="my-3">
                      <MDBIcon icon="pen-nib" /> { myText["nav_register"] }
                      </h3>
                    </MDBCardHeader>
                    <br />
                    <form onSubmit={ this.submitForm }>
                      <div className="grey-text">
                        <p className="red-text">{ registerErrors.first_name }</p>
                        <label
                          htmlFor="first_name"
                          className="grey-text font-weight-light"
                          >
                          { myText["first_name"] }
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
                        <p className="red-text">{ registerErrors.last_name }</p>
                        <label
                          htmlFor="last_name"
                          className="grey-text font-weight-light"
                          >
                          { myText["last_name"] }
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
                        <p className="red-text">{ registerErrors.username }</p>
                        <label
                          htmlFor="username"
                          className="grey-text font-weight-light"
                          >
                          { myText["username"] }
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
                        <p className="red-text">{ registerErrors.email }</p>
                        <label
                          htmlFor="email"
                          className="grey-text font-weight-light"
                          >
                          { myText["email"] }
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
                        <p className="red-text">{ registerErrors.password }</p>
                        <label
                          htmlFor="password"
                          className="grey-text font-weight-light"
                          >
                          { myText["password"] }
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
                          { myText["confirmation"] }
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
                        { myText["nav_register"] }
                        </MDBBtn>
                        <p className={ this.props.errors.errors.length === 0 ? 'green-text' : 'red-text' }>
                          { this.props.errors.errors.length === 0 ?
                            this.state.submited ? Messages[this.props.language]["success_register"] : ''
                          : Messages[this.props.language]["fail_register"] }
                        </p>
                      </div>
                    </form>
                    <MDBModalFooter>
                      <div className="font-weight-light">
                        <p>{ myText["already_member"] }<Link to='/login'>{ myText["nav_login"] }</Link></p>
                      </div>
                    </MDBModalFooter>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </React.Fragment>
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
    errors: state.errors,
    language: state.language
  }
}

const mapDispatchToProps = {
  onRegister: tryRegister,
  onClean: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
