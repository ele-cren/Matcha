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
import { tryLogIn } from '../actions/userActions/loginUserActions'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { isObjectEmpty } from '../utilities/utilities'
import MatchaNav from '../components/MatchaNav'
import { getLoginErrors } from '../utilities/errorsFinder'
const Text = require('../../languageLocalisation/texts.json')
 
class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      redirect: false
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onClean()
  }

  componentDidUpdate () {
    if (!this.state.redirect && isObjectEmpty(this.props.errors.errors) && this.props.user.user.userId) {
      setTimeout(() => {
        this.setState({
          redirect: true
        })
      }, 2000);
    }
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
    this.props.onLoginUser(data, this.props.language)
  }

  render () {
    const myText = Text[this.props.language]
    const loginErrors = getLoginErrors(this.props.errors.errors, this.props.language)
    return (
      <React.Fragment>
        <MatchaNav color="pink darken-4" />
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
              <MDBCard className="mt-2">
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> { myText["login_title"] }
                    </h3>
                  </MDBCardHeader>
                  <form onSubmit={ this.submitForm }>
                    <div className="grey-text">
                      <p className="red-text mt-3">{ loginErrors.login }</p>
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
                      <p className="red-text">{ loginErrors.password }</p>
                      <MDBInput
                        className="p-2"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        label={ myText["password_label"] }
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
                      { myText["login_button"] }
                    </MDBBtn>
                  </div>
                  </form>
                  <MDBModalFooter>
                    <div className="font-weight-light">
                      <p>{ myText["not_member"] }<Link to='/register'>{ myText["nav_register"] }</Link></p>
                      <p><Link to='/reset_pass'>{ myText["forgot_pass"] }</Link></p>
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

const mapStateToProps = state => {
  return {
    user: state.user,
    errors: state.errors,
    language: state.language
  }
}

const mapDispatchToProps = {
  onLoginUser: tryLogIn,
  onClean: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
