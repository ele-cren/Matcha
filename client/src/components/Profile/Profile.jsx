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
import MyCarouselItem from '../MyCarouselItem'
import getStyles from './Profile_styles'
import { getGender, getOrientation } from '../../utilities/utilities'
const Text = require('../../../languageLocalisation/texts.json')


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.getButton = this.getButton.bind(this)
  }

  getButton (styles) {
    const myText = Text[this.props.language]
    let button = <MDBBtn className="mt-3" style={ styles.button } color="elegant">{ myText["button_edit"] }</MDBBtn>
    if (!this.props.isMyProfile) {
      if (this.props.loveInfos.meAboutUser.like) {
        button = <MDBBtn
          className="mt-3"
          style={ styles.button }
          onClick={ () => this.props.updateLike(0) }
          color="blue-grey">{ myText["button_dislike"] }</MDBBtn>
      } else {
        button = <MDBBtn
          className="mt-3"
          style={ styles.button }
          onClick={ () => this.props.updateLike() }
          color="mdb-color">{ myText["button_like"] }</MDBBtn>
      }
    }
    return button
  }

  render ()  {
    const myText = Text[this.props.language]
    const profile = this.props.profile
    const gender = getGender(profile.informations.gender, myText)
    const orientation = getOrientation(profile.informations.orientation, myText)
    const styles = getStyles(profile.informations.gender)
    const dotStyle = {
      color: profile.mainInformations.online ? '#81ad64' : '#ad1838',
      fontSize: '10px'
    }
    const button = this.getButton(styles)
    const eyeIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='eye' className="mt-2 ml-2" far icon="eye" />
        <ReactTooltip id='eye' effect='solid' place="bottom">
          <span>{ myText["eye_popup"] }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const heartIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='heart' className="mt-2 ml-2" far icon="heart" />
        <ReactTooltip id='heart' effect='solid' place="right">
          <span>{ myText["like_popup"] }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const fullHeartIcon = (
      <React.Fragment>
      <MDBIcon data-tip data-for='fullHeart' className="mt-2 ml-2" icon="heart" />
      <ReactTooltip id='fullHeart' effect='solid' place="rihgt">
        <span>{ myText["match_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
    )
    const userIcons = this.props.loveInfos ? (
      <div style={ styles.loveIcons }>
        { this.props.loveInfos.userAboutMe.view ? eyeIcon : ''}
        { this.props.loveInfos.userAboutMe.like ? this.props.loveInfos.meAboutUser.like ? fullHeartIcon : heartIcon : '' }
      </div>
    ) : ''
    const reportIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='angry' className="mt-2 ml-2" icon="angry" style={ styles.banIcon } />
        <ReactTooltip id='angry' effect='solid' place="left">
          <span>{ myText["angry_popup"] }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const blockIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='block' className="mt-2 ml-2" icon="ban" style={ styles.banIcon } />
        <ReactTooltip id='block' effect='solid' place="left">
          <span>{ myText["block_popup"] }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const unblockIcon = (
      <React.Fragment>
        <MDBIcon data-tip data-for='unblock' className="mt-2 ml-2" far icon="check-circle" style={ styles.banIcon } />
        <ReactTooltip id='unblock' effect='solid' place="left">
          <span>{ myText["unblock_popup"] }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    const banIcons = (
      <div style={ styles.banIcons }>
        { this.props.blocked && this.props.blocked.includes(profile.informations.user_id) ? '' : reportIcon }
        { this.props.blocked && this.props.blocked.includes(profile.informations.user_id) ? unblockIcon : blockIcon }
      </div>
    )
    let pictures = []
    profile.pictures.map(x => pictures = x.main ? [x, ...pictures] : [...pictures, x])

    return (
      <MDBContainer style={ styles.container }>
        <MDBCol md="8">
          <MDBCard style={ styles.card }>
            { this.props.isMyProfile ? '' : userIcons  }
            { this.props.isMyProfile ? '' : banIcons }
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
            <h2 style={ styles.online } className="text-center">
              <MDBIcon icon="circle" style={ dotStyle } /> { profile.mainInformations.online ? myText["online"] : myText["offline"] }
            </h2>
            <h2 className='mt-2 text-center'>
              { profile.mainInformations.first_name + ' ' + profile.mainInformations.last_name + ', ' + profile.informations.age }
            </h2>
            <h2 className="mt-2 text-center">
              { profile.informations.score } <MDBIcon far icon="star" style={ styles.score } />
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
