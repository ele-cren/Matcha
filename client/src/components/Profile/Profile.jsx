import React from 'react'
import Radium from 'radium'
import ReactTooltip from 'react-tooltip'
import {
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBCardBody,
  MDBContainer,
  MDBCard,
  MDBCol,
  MDBRow
} from 'mdbreact'
import getStyles from './Profile_styles'
import { getGender, getOrientation } from '../../utilities/utilities'
import LoveIcons from './LoveIcons'
import BanIcons from './BanIcons'
import MyCarousel from './MyCarousel'
import ProfileViewers from './ProfileViewers'
import ProfileLikers from './ProfileLikers'
import { formatDate, getLocaleDate } from '../../utilities/utilities'
import { Link } from 'react-router-dom'
const Text = require('../../../languageLocalisation/texts.json')


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.getButton = this.getButton.bind(this)
  }

  getButton (styles) {
    const myText = Text[this.props.language]
    let button = (
      <Link to="/profile/update">
        <MDBBtn className="mt-3" style={ styles.button } color="elegant">{ myText["button_edit"] }</MDBBtn>
      </Link> )
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
    const lastDisconnect = getLocaleDate(profile.mainInformations.last_disconnect)
    const formatedDate = formatDate(lastDisconnect, this.props.language)
    const gender = getGender(profile.informations.gender, myText)
    const orientation = getOrientation(profile.informations.orientation, myText)
    const styles = getStyles(profile.informations.gender)
    const button = this.getButton(styles)
    const loveIcons = <LoveIcons styles={ styles } text={ myText } loveInfos={ this.props.loveInfos } />
    const banIcons = <BanIcons
                        styles={ styles }
                        profile={ profile }
                        text={ myText }
                        blockUser={ this.props.blockUser }
                        reportUser={ this.props.reportUser }
                        ban={ this.props.ban } />
    let pictures = []
    profile.pictures.map(x => pictures = x.main ? [x, ...pictures] : [...pictures, x])
    const dotStyle = {
      color: profile.mainInformations.online ? '#81ad64' : '#ad1838',
      fontSize: '10px'
    }
    const dotOnline = profile.mainInformations.online ? <MDBIcon icon="circle" style={ dotStyle } /> : (
      <React.Fragment>
        <MDBIcon data-tip data-for='online' icon="circle" style={ dotStyle } />
        <ReactTooltip id='online' effect='solid' place="bottom">
          <span>{ myText["offline_since"] }</span><br />
          <span>{ formatedDate }</span>
        </ReactTooltip>
      </React.Fragment>
    )

    return (
      <MDBContainer style={ styles.container }>
        <MDBCol md="8">
          <MDBCard style={ styles.card }>
            { this.props.isMyProfile ? '' : loveIcons }
            { this.props.isMyProfile ? '' : banIcons }
            <MyCarousel pictures={ pictures } styles={ styles } />
            <h2 style={ styles.online } className="text-center">
              { dotOnline } { profile.mainInformations.online ? myText["online"] : myText["offline"] }
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
              { this.props.isMyProfile ? (
                <MDBRow style={ styles.colContainer }>
                    <ProfileViewers aboutMe={ this.props.aboutMe } styles={ styles } />
                    <ProfileLikers aboutMe={ this.props.aboutMe } styles={ styles } />
                </MDBRow> ) : '' }
              { button }
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    )
  }
}

export default Radium(Profile)
