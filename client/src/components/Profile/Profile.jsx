import React from 'react'
import getStyles from './Profile_styles'
import Radium from 'radium'
import ReactTooltip from 'react-tooltip'
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
import Spinner from '../Spinner'


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.getButton = this.getButton.bind(this)
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

  getButton (styles) {
    let button = <MDBBtn style={ styles.button } color="elegant">Edit</MDBBtn>
    if (!this.props.isMyProfile) {
      if (this.props.loveInfos.isFetching) {
        button = <MDBBtn style={ styles.button } color="light-green"><Spinner /></MDBBtn>
      } else {
        if (this.props.loveInfos.iLoveUser) {
          button = <MDBBtn style={ styles.button } color="dark-green" onClick={ () => this.props.unlikeUser() }>Unlike</MDBBtn>
        } else {
          button = <MDBBtn style={ styles.button } color="light-green" onClick={ () => this.props.likeUser() }>Like</MDBBtn>
        }
      }
    }
    return button
  }

  render ()  {
    const profile = this.props.profile
    const gender = this.getGender(profile.informations.gender)
    const orientation = this.getOrientation(profile.informations.orientation)
    const styles = getStyles(profile.informations.gender)
    const button = this.getButton(styles)
    const eyeIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='eye' className="mt-2 ml-2" far icon="eye" />
        <ReactTooltip id='eye' effect='solid' place="bottom">
          <span>This user viewed your profile</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const heartIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='heart' className="mt-2 ml-2" far icon="heart" />
        <ReactTooltip id='heart' effect='solid' place="bottom">
          <span>This user liked your profile</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const userIcons = this.props.loveInfos ? (
      <div style={ styles.loveIcons }>
        { this.props.loveInfos.userSawMe ? eyeIcon : ''}
        { this.props.loveInfos.userLovesMe ? heartIcon : '' }
      </div>
    ) : ''
    let pictures = []
    profile.pictures.map(x => pictures = x.main ? [x, ...pictures] : [...pictures, x])

    return (
      <MDBContainer style={ styles.container }>
        <MDBCol md="8">
          <MDBCard style={ styles.card }>
            { this.props.isMyProfile ? '' : userIcons }
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
