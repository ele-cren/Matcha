import React from 'react'
import getStyles from './Profile_styles'
import Radium from 'radium'
import { 
  MDBCarousel,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBCardBody,
  MDBContainer,
  MDBCarouselCaption,
  MDBCard,
  MDBCol
} from 'mdbreact'


class Profile extends React.Component {
  constructor (props) {
    super(props)
  }

  getGender (genderNum) {
    switch (genderNum) {
      case 1:
        return ['Male', '#7986cb']
      case 2:
        return ['Female', '#ad1457']
      default:
        return ['Male', '#7986cb']
    }
  }

  getOrientation (orientationNum) {
    switch (orientationNum) {
      case 1:
        return ['Straight', '#8c7e7a']
      case 2:
        return ['Bisexual', '#583166']
      case 3:
        return ['Lesbian', '#ad1457']
      case 4:
        return ['Gay', '#7986cb']
      default:
        return ['Bisexual', '#a19ee9']
    }
  }

  render ()  {
    const profile = this.props.profile
    const gender = this.getGender(profile.informations.gender)
    const orientation = this.getOrientation(profile.informations.orientation)
    const styles = getStyles(profile.informations.gender)
    const button = this.props.isMyProfile ? (
      <MDBBtn color="elegant">Edit</MDBBtn>
    ) : <MDBBtn color="light-green">Like</MDBBtn>
    let pictures = []
    profile.pictures.map(x => pictures = x.main ? [x, ...pictures] : [...pictures, x])
    return (
      <MDBContainer style={ styles.container }>
        <MDBCol md="8">
          <MDBCard style={ styles.card }>
            <MDBCarousel
              activeItem={1}
              length={ pictures.length }
              showIndicators={ pictures.length > 1 }
              showControls={ pictures.length > 1 }
              className="z-depth-1"
              style={ styles.carousel }>
              <MDBCarouselInner>
                { pictures.map((x, i) =>
                  <MyCarouselItem key={ i } url={ x.url } id={ i + 1 } isMain={ x.main } styles={ styles } />) }
              </MDBCarouselInner>
            </MDBCarousel>
            <h2 className='mt-3'>
            { profile.mainInformations.first_name + ' ' + profile.mainInformations.last_name + ', ' + profile.informations.age }
            </h2>
            <MDBCardBody className="text-center">
              <MDBCardText style={ styles.bio }>
                { profile.informations.bio }
              </MDBCardText>
              <div style={ styles.personalInfos }>
                <p
                  className="shadow-box-example hoverable"
                  style={ [styles.gender, { backgroundColor: gender[1] }] }>
                  { gender[0] }
                </p>
                <p
                  className="shadow-box-example hoverable"
                  style={ [styles.orientation, { backgroundColor: orientation[1] }] }>
                  { orientation[0] }
                </p>
              </div>
              <div style={ styles.tagsContainer }>
                { profile.tags.map((x, i) =>
                <p key={ i } className="shadow-box-example hoverable" style={ styles.tag }>{ x.tag }</p>) }
              </div>
              { button }
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    )
  }
}

const MyCarouselItem = (props) => {
  return (
    <MDBCarouselItem itemId={ props.id }>
      <MDBView>
        <img
        className="d-block"
        src={ props.url }
        alt="First slide"
        style={ props.styles.picture }
        />
      </MDBView>
      { props.isMain ? 
        <MDBCarouselCaption style={ props.styles.caption }>
          <MDBIcon icon="star" />
        </MDBCarouselCaption> : '' }
    </MDBCarouselItem>
  )
}

export default Radium(Profile)
