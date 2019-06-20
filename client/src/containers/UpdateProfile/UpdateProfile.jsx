import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { MDBContainer, MDBCol } from 'mdbreact'
import styles from './UpdateProfile_styles'
import MatchaNav from '../../components/MatchaNav'
import { updateInformations } from '../../actions/profileActions/profileActions'
import PicturesUpdate from '../../components/UpdateProfile/PicturesUpdate/PicturesUpdate'
import CropModal from '../../components/UpdateProfile/CropModal/CropModal'
import { uploadFile } from '../../requests/upload'
import { updatePicture, deletePicture } from '../../requests/profile'
import MainInformationsUpdate from '../../components/UpdateProfile/MainInformationsUpdate/MainInformationsUpdate'
import InformationsUpdate from '../../components/UpdateProfile/InformationsUpdate/InformationsUpdate'
import TagsUpdate from '../../components/UpdateProfile/TagsUpdate/TagsUpdate'
import Loader from '../../components/Loader'
const Text = require('../../../languageLocalisation/texts.json')

class UpdateProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null,
      currentUrl: '',
      modalOpened: false
    }
    this.onSelectFile = this.onSelectFile.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.removePic = this.removePic.bind(this)
  }

  toggleModal () {
    this.setState({ modalOpened: !this.state.modalOpened })
  }

  onSelectFile (e, currentUrl) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () =>
        this.setState({ image: reader.result, modalOpened: true, currentUrl: currentUrl })
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  removePic (url) {
    const newProfile = Object.assign({}, this.props.profile)
    newProfile.pictures = newProfile.pictures.filter(x => x.url !== url)
    this.props.updateInformations(newProfile)
    deletePicture(url)
  }

  onComplete (croppedImg) {
    const xhr = uploadFile(croppedImg)
    xhr.onload = () => {
      if (xhr.status === 200) {
        const newUrl = 'http://localhost:3000/images/' + xhr.responseText
        const newProfile = Object.assign({}, this.props.profile)
        if (!this.state.currentUrl) {
          newProfile.pictures = [
            ...newProfile.pictures,
            { user_id: this.props.user.userId, url: newUrl, main: newProfile.pictures.length > 0 ? 0 : 1 }
          ]
        } else {
          newProfile.pictures = newProfile.pictures.map(x => {
            x.url = x.url === this.state.currentUrl ? newUrl : x.url
            return x
          })
        }
        this.props.updateInformations(newProfile)
        updatePicture(newUrl, this.state.currentUrl)
      }
    }
  }

  render () {
    const myText = Text[this.props.language]
    let myPictures = []
    this.props.profile.pictures.forEach(x => {
      if (x.main) {
        myPictures = [x, ...myPictures]
      } else {
        myPictures = [...myPictures, x]
      }
    })
    return this.props.profile.fetching ? <Loader /> : (
      <React.Fragment>
        <MatchaNav color="pink darken-4" />
        <CropModal picture={ this.state.image} opened={ this.state.modalOpened } toggle={ this.toggleModal } onComplete={ this.onComplete } />
        <MDBContainer style={ styles.bigContainer }>
          <MDBCol md="8">
            <div style={ styles.container }>
              <h3 className="text-center" style={ { color: '#c1c1c1' } } >{ myText["pictures"] }</h3>
              <PicturesUpdate pictures={ myPictures } select={ this.onSelectFile } deletePic={ this.removePic } />
              <h3 className="text-center mt-3" style={ { color: '#c1c1c1' } } >{ myText["main_infos"] }</h3>
              <MainInformationsUpdate />
              <h3 className="text-center mt-3" style={ { color: '#c1c1c1' } } >Informations</h3>
              <InformationsUpdate />
              <h3 className="text-center mt-3" style={ { color: '#c1c1c1' } } >Tags</h3>
              <TagsUpdate />
            </div>
          </MDBCol>
        </MDBContainer>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    language: state.language
  }
}

const mapDispatchToProps = {
  updateInformations: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(UpdateProfile))
