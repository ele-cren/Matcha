import React from 'react'
import Radium from 'radium'
import ReactTooltip from 'react-tooltip'
import { 
  MDBCarousel,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCarouselInner,
  MDBCardBody,
  MDBContainer,
  MDBCard,
  MDBCol
} from 'mdbreact'
import Spinner from '../Spinner'
import MyCarouselItem from '../MyCarouselItem'
import getStyles from './Profile_styles'
import { getGender, getOrientation } from '../../utilities/utilities'


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.getButton = this.getButton.bind(this)
  }

  getButton (styles) {
    let button = <MDBBtn className="mt-3" style={ styles.button } color="elegant">Edit</MDBBtn>
    if (!this.props.isMyProfile) {
      button = <MDBBtn
        className="mt-3"
        style={ styles.button }
        color="mdb-color">Like</MDBBtn>
    }
    return button
  }

  render ()  {
    const profile = this.props.profile
    const gender = getGender(profile.informations.gender)
    const orientation = getOrientation(profile.informations.orientation)
    const styles = getStyles(profile.informations.gender)
    const button = this.getButton(styles)
    // const eyeIcon = (
    //   <React.Fragment>
    //     <MDBIcon data-tip data-for='eye' className="mt-2 ml-2" far icon="eye" />
    //     <ReactTooltip id='eye' effect='solid' place="bottom">
    //       <span>This user viewed your profile</span>
    //     </ReactTooltip>
    //   </React.Fragment>
    // )
    // const heartIcon = (
    //   <React.Fragment>
    //     <MDBIcon data-tip data-for='heart' className="mt-2 ml-2" far icon="heart" />
    //     <ReactTooltip id='heart' effect='solid' place="bottom">
    //       <span>This user liked your profile</span>
    //     </ReactTooltip>
    //   </React.Fragment>
    // )
    // const fullHeartIcon = (
    //   <React.Fragment>
    //   <MDBIcon data-tip data-for='fullHeart' className="mt-2 ml-2" icon="heart" />
    //   <ReactTooltip id='fullHeart' effect='solid' place="bottom">
    //     <span>It's a match !</span>
    //   </ReactTooltip>
    // </React.Fragment>
    // )
    // const userIcons = this.props.loveInfos ? (
    //   <div style={ styles.loveIcons }>
    //     { this.props.loveInfos.userSawMe ? eyeIcon : ''}
    //     { this.props.loveInfos.userLovesMe ? this.props.loveInfos.iLoveUser ? fullHeartIcon : heartIcon : '' }
    //   </div>
    // ) : ''
    let pictures = []
    profile.pictures.map(x => pictures = x.main ? [x, ...pictures] : [...pictures, x])

    return (
      <MDBContainer style={ styles.container }>
        <MDBCol md="8">
          <MDBCard style={ styles.card }>
            { /* this.props.isMyProfile ? '' : userIcons */ }
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

export default Radium(Profile)
