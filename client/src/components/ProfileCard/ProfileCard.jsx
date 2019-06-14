import { MDBIcon, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact'
import React from 'react'
import Radium from 'radium'
import getStyles from './ProfileCard_styles'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const Text = require('../../../languageLocalisation/texts.json')

const ProfileCard = (props) => {
  let picture
  let fullName = props.profile.mainInformations.first_name + ' ' + props.profile.mainInformations.last_name
  fullName = fullName.length > 15 ? props.profile.mainInformations.first_name + ' ' + props.profile.mainInformations.last_name[0] + '.' : fullName
  props.profile.pictures.map(x => {
    if (x.main) {
      picture = x.url
    }
  })
  picture = picture ? picture : 'http://chittagongit.com/download/217644'
  const dotStyle = {
    color: props.profile.mainInformations.online ? '#81ad64' : '#e21b50',
    fontSize: '10px'
  }
  const styles = getStyles(props.profile.informations.gender)
  const myText = Text[props.language]
  return (
    <Link to={ '/profile/' + props.profile.informations.user_id }>
      <MDBCard style={ styles.card } onClick={ () => props.selectProfile(props.profile) } >
        <MDBCardImage className="img-fluid" src={ picture } waves style={ styles.img } />
        <MDBCardBody style={ styles.cardBody }>
          <MDBCardTitle className="text-center m-0">{ fullName }</MDBCardTitle>
          <MDBCardText className="text-center m-0" style={ styles.cardText }>
            <MDBIcon icon="circle" style={ dotStyle} /> { props.profile.informations.age } { myText["age"] } - { props.profile.distance } km
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </Link>
  )
}

const mapStateToProps = state => {
  return {
    myProfile: state.profile,
    language: state.language
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ProfileCard))
