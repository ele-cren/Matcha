import React from 'react'
import Radium from 'radium'
import styles from './UpdateProfile_styles'
import { MDBInput, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import { updateMainInformations } from '../../requests/profile'
import { updateInformations } from '../../actions/profileActions/profileActions'
import { isObjectEmpty } from '../../utilities/utilities'

class MainInformationsUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      password_conf: '',
      errors : {},
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({
      fname: this.props.profile.mainInformations.first_name,
      lname: this.props.profile.mainInformations.last_name,
      email: this.props.profile.mainInformations.email
    })
  }

  handleChange (key, value) {
    this.setState({ [key]: value })
  }

  verifyData (data) {
    const emailRegex = /(^[A-z0-9]+)(([._\-A-z0-9]+))@[\-A-z0-9]+?\.([\-A-z0-9]+\.)?[a-z]+$/
    const errors = {}
    if (!emailRegex.test(data.email) || !data.email) {
      errors.email = 'Please, provide a valid email address'
    }
    if (!data.fname) {
      errors.fname = 'Please provide your first name'
    }
    if (!data.lname) {
      errors.lname = 'Please provide your last name'
    }
    if (data.password && (data.password.length < 8 || data.password.length > 20)) {
      errors.password = 'Please, provide a password between 8 and 20'
    } else if (data.password && data.password  !== data.password_conf) {
      errors.password = "Password and password confirmation don't match"
    }
    return errors
  }
  
  handleSubmit (e) {
    this.setState({ message: '' })
    e.preventDefault()
    const errors = this.verifyData(this.state)
    this.setState({ errors })
    if (isObjectEmpty(errors)) {
      const data = {
        first_name: this.state.fname,
        last_name: this.state.lname,
        email: this.state.email,
        password: this.state.password
      }
      const newProfile = Object.assign({}, this.props.profile)
      newProfile.mainInformations.first_name = data.first_name
      newProfile.mainInformations.last_name = data.last_name
      newProfile.mainInformations.email = data.email
      this.props.updateInformations(newProfile)
      updateMainInformations(data)
      this.setState({ message: 'Informations have been saved !' })
    }
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit }>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="text" label="First name" size="sm" name="fname" value={ this.state.fname }
                      getValue={ (value) => this.handleChange('fname', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.fname }</p>
          </div>
          <div>
            <MDBInput type="text" label="Last name" size="sm" name="lname" value={ this.state.lname }
                      getValue={ (value) => this.handleChange('lname', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.lname }</p>
          </div>
        </div>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="email" label="Email" size="sm" name="email" value={ this.state.email }
                      getValue={ (value) => this.handleChange('email', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.email }</p>
          </div>
        </div>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="password" label="Password" size="sm" name="password" value={ this.state.password }
                      getValue={ (value) => this.handleChange('password', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.password }</p>
          </div>
          <MDBInput type="password" label="Confirm Password" size="sm" name="password_conf"
                    value={ this.state.password_conf } getValue={ (value) => this.handleChange('password_conf', value) }  />
        </div>
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
          <MDBBtn className="text-center" type="submit" color="unique" size="sm" onClick={ this.handleSubmit }>Save</MDBBtn>
          <p className="text-center text-success m-0 small">{ this.state.message }</p>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = {
  updateInformations: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(MainInformationsUpdate))
