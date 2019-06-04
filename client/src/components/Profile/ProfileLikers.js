import { MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact'
import React from 'react'
import { Link } from 'react-router-dom'

const getLikers = (profiles) => {
  let likers = profiles.map(x => {
    if (x.like) {
      return x
    }
  })
  return likers.filter(Boolean)
}

const ProfileLikers = (props) => {
  const styles = props.styles
  const likers = getLikers(props.aboutMe)
  const colStle = Object.assign({ backgroundColor: 'rgba(82, 155, 94, 0.2)', border: '1px solid #386b41' }, styles.profilesCol)
  const cards = likers.map((x, i) => {
    return (
      <ProfileCard key={ i } styles={ styles } profile={ x } />
    )
  })
  return likers.length > 0 ? (
    <MDBCol md="5" style={ colStle }>
      { cards }
    </MDBCol>
  ) : ''
}

const ProfileCard = (props) => {
  const profile = props.profile
  const styles = props.styles
  const dotStyle = {
    color: profile.userInfos.mainInformations.online ? '#81ad64' : '#ad1838',
    fontSize: '8px',
    marginRight: '2px'
  }
  const bodyStyle = Object.assign({ backgroundColor: 'rgba(82, 155, 94, 0.1)' }, styles.profileCardBody)
  return (
    <Link to={ '/profile/' + profile.userInfos.informations.user_id }><MDBCard style={ styles.profileCard }>
      <MDBCardImage className="img-fluid" src={ profile.userInfos.mainPicture } />
      <MDBCardBody style={ bodyStyle }>
        <MDBCardTitle
          style={ styles.profileCardTitle } >
          { profile.userInfos.mainInformations.first_name }
        </MDBCardTitle>
        <MDBCardText style={ { fontSize: '10px' } }>
          <MDBIcon icon="circle" style={ dotStyle } />
          { profile.userInfos.informations.age }
        </MDBCardText>
      </MDBCardBody>
    </MDBCard></Link>
  )
}

export default ProfileLikers
