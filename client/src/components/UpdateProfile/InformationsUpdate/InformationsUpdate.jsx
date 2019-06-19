import styles from './InformationsUpdate_styles'
import React from 'react'
import { connect } from 'react-redux'
import { MDBInput, MDBBtn } from 'mdbreact'
import Radium from 'radium'
import { updateInformations } from '../../../actions/profileActions/profileActions'
import { isObjectEmpty } from '../../../utilities/utilities'
import { updateInformations as reqUpdateInfos } from '../../../requests/profile'
import MiniMapUpdate from './MiniMapUpdate'
const Text = require('../../../../languageLocalisation/texts.json')

class InformationsUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {},
      message: '',
      orientation: 2,
      gender: null,
      age: 18,
      lat: 0,
      lng: 0,
      bio: '',
      mounted: false
    }
    this.updateGender = this.updateGender.bind(this)
    this.updateOrientation = this.updateOrientation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.updateCoords = this.updateCoords.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({
      gender: this.props.profile.informations.gender,
      orientation: this.props.profile.informations.orientation,
      age: this.props.profile.informations.age,
      lat: this.props.profile.informations.latitude,
      lng: this.props.profile.informations.longitude,
      bio: this.props.profile.informations.bio,
      mounted: true
    })
  }

  updateGender (gender) {
    this.setState({ gender })
    if ((gender === 1 && this.state.orientation === 3) || (gender === 2 && this.state.orientation === 4)) {
      this.setState({ orientation: 2 })
    }
  }

  updateOrientation (orientation) {
    if (this.state.gender === 1) {
      if (orientation === 1 || orientation === 2 || orientation === 4) {
        this.setState({ orientation })
      }
    } else if (this.state.gender === 2) {
      if (orientation === 1 || orientation === 2 || orientation === 3) {
        this.setState({ orientation })
      }
    }
  }

  updateCoords (lat, lng) {
    this.setState({ lat, lng })
  }

  handleChange (key, value) {
    this.setState({ [key]: value })
  }

  verifyInfos (data) {
    const errors = {}
    if (!data.age || data.age < 18) {
      errors.age = 'Need 18'
    }
    if (!data.gender) {
      errors.gender = 'Please gender'
    }
    if (!data.orientation) {
      errors.orientation = 'Please ori'
    }
    if (!data.bio) {
      errors.bio = 'Please bio'
    }
    return errors
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ message: '' })
    const errors = this.verifyInfos(this.state)
    this.setState({ errors })
    if (isObjectEmpty(errors)) {
      const newProfile = Object.assign({}, this.props.profile)
      newProfile.informations.age = this.state.age
      newProfile.informations.gender = this.state.gender
      newProfile.informations.orientation = this.state.orientation
      newProfile.informations.bio = this.state.bio
      newProfile.informations.latitude = this.state.lat,
      newProfile.informations.longitude = this.state.lng
      this.props.updateProfile(newProfile)
      reqUpdateInfos(newProfile.informations)
      this.setState({ message: 'Yes' })
    }
  }

  render () {
    const myText = Text[this.props.language]
    const getGenderStyle = (gender) => {
      return {
        backgroundColor: this.state.gender === gender ? gender === 1 ? '#406087' : '#7c4a68' : '#f2f2f2',
        color: this.state.gender === gender ? 'white' : 'black'
      }
    }
    const getOrientationStyle = (orientation) => {
      const colors = ['#aa4949', '#537c42', '#7c4a68', '#406087']
      return {
        backgroundColor: this.state.orientation === orientation ? colors[orientation - 1] : '#f2f2f2',
        color: this.state.orientation === orientation ? 'white' : 'black'
      }
    }
    return this.state.mounted ? (
      <form onSubmit={ this.handleSubmit }>
        <div style={ styles.btnsContainer }>
          <div style={ [styles.btn, getGenderStyle(1)] } onClick={ () => this.updateGender(1) }>{ myText["gender_male"] } </div>
          <div style={ [styles.btn, getGenderStyle(2)] } onClick={ () => this.updateGender(2) } >{ myText["gender_female"] }</div>
        </div>
        <p className="text-center text-danger m-0 small">{ this.state.errors.gender ? myText["need_gender"] : '' }</p>
        <div className="my-3" style={ styles.btnsContainer }>
          <div style={ [styles.btn, getOrientationStyle(1)] } onClick={ () => this.updateOrientation(1) }>{ myText["orientation_straight"] }</div>
          <div style={ [styles.btn, getOrientationStyle(2)] } onClick={ () => this.updateOrientation(2) } >{ myText["orientation_bisexual"] }</div>
          <div style={ [styles.btn, getOrientationStyle(3)] } onClick={ () => this.updateOrientation(3) } >{ myText["orientation_lesbian"] }</div>
          <div style={ [styles.btn, getOrientationStyle(4)] } onClick={ () => this.updateOrientation(4) } >{ myText["orientation_gay"] }</div>
        </div>
        <p className="text-center text-danger m-0 small">{ this.state.errors.orientation ? myText["need_orientation"] : '' }</p>
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
          <MDBInput type="number" label="Age" size="md"
                  value={ this.state.age ? this.state.age.toString() : '' } getValue={ (value) => this.handleChange('age', value) }  />
          <p className="text-center text-danger m-0 small">{ this.state.errors.age ? myText["under_18"] : '' }</p>
        </div>
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
          <MDBInput type="textarea" label="Description" rows="5"
                    value={ this.state.bio } getValue={ (value) => this.handleChange('bio', value) } />
          <p className="text-center text-danger m-0 small">{ this.state.errors.bio ? myText["need_bio"] : '' }</p>
        </div>
        <MiniMapUpdate userIp={ this.props.user.user.ip } updateCoords={ this.updateCoords }
                        lat={ this.state.lat } lng={ this.state.lng } text={ myText } />
        <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
          <MDBBtn className="text-center" type="submit" color="unique" size="sm" onClick={ this.handleSubmit }>{ myText["save_button"] }</MDBBtn>
          <p className="text-center text-success m-0 small">{ this.state.message ? myText["success_infos"] : '' }</p>
        </div>
      </form>
    ) : ''
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    language: state.language,
    user: state.user
  }
}

const mapDispatchToProps = {
  updateProfile: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(InformationsUpdate))
