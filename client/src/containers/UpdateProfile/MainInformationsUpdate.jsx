import React from 'react'
import Radium from 'radium'
import styles from './UpdateProfile_styles'
import { MDBInput, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import { updateMainInformations } from '../../requests/profile'
import { updateInformations } from '../../actions/profileActions/profileActions'
import { isObjectEmpty } from '../../utilities/utilities'
const Text = require('../../../languageLocalisation/texts.json')
const TextErrors = require('../../../languageLocalisation/errors.json')

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
      errors.email = "Err email"
    }
    if (!data.fname) {
      errors.fname = "Err fname"
    }
    if (!data.lname) {
      errors.lname = "Err lname"
    }
    if (data.password && (data.password.length < 8 || data.password.length > 20)) {
      errors.password = "Err pass"
    } else if (data.password && data.password !== data.password_conf) {
      errors.password_conf = "Err conf"
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
      this.setState({ message: 'success' })
    }
  }

  render () {
    const myText = Text[this.props.language]
    const errText = TextErrors[this.props.language]
    return (
      <form onSubmit={ this.handleSubmit }>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="text" label={ myText["first_name"] } size="sm" value={ this.state.fname }
                      getValue={ (value) => this.handleChange('fname', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.fname ? errText["5"] : ''  }</p>
          </div>
          <div>
            <MDBInput type="text" label={ myText["last_name"] } size="sm" value={ this.state.lname }
                      getValue={ (value) => this.handleChange('lname', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.lname ? errText["6"] : '' }</p>
          </div>
        </div>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="email" label={ myText["email"] } size="sm" value={ this.state.email }
                      getValue={ (value) => this.handleChange('email', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.email ? errText["1"] : '' }</p>
          </div>
        </div>
        <div style={ styles.mainInfosContainer }>
          <div>
            <MDBInput type="password" label={ myText["password_label"] } size="sm" value={ this.state.password }
                      getValue={ (value) => this.handleChange('password', value) } />
            <p className="text-center text-danger m-0 small">{ this.state.errors.password ? errText["3"] : '' }</p>
          </div>
          <div>
            <MDBInput type="password" label={ myText["confirmation"] } size="sm"
                      value={ this.state.password_conf } getValue={ (value) => this.handleChange('password_conf', value) }  />
            <p className="text-center text-danger m-0 small">{ this.state.errors.password_conf ? errText["4"] : '' }</p>
          </div>
        </div>
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
          <MDBBtn className="text-center" type="submit" color="unique" size="sm" onClick={ this.handleSubmit }>{ myText["save_button"] }</MDBBtn>
          <p className="text-center text-success m-0 small">{ this.state.message ? myText["success_main_infos"] : '' }</p>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    language: state.language
  }
}

const mapDispatchToProps = {
  updateInformations: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(MainInformationsUpdate))
