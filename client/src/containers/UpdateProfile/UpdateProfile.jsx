import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { MDBContainer, MDBCol } from 'mdbreact'
import styles from './UpdateProfile_styles'
import MatchaNav from '../../components/MatchaNav'
import { updateInformations } from '../../actions/profileActions/profileActions'
import PicturesUpdate from './PicturesUpdate'
import CropModal from './CropModal'
import { uploadFile } from '../../requests/upload'
import { updatePicture } from '../../requests/profile'

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

  onComplete (croppedImg) {
    const xhr = uploadFile(croppedImg)
    xhr.onload = () => {
      if (xhr.status === 200) {
        const newUrl = 'http://localhost:3000/images/' + xhr.responseText
        const newProfile = Object.assign({}, this.props.profile)
        if (!this.state.currentUrl) {
          newProfile.pictures = [
            ...newProfile.pictures,
            { user_id: this.props.user.userId, url: newUrl, main: newProfile.pictures.length > 0 ? 1 : 0 }
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
    let myPictures = []
    this.props.profile.pictures.forEach(x => {
      if (x.main) {
        myPictures = [x, ...myPictures]
      } else {
        myPictures = [...myPictures, x]
      }
    })
    return (
      <React.Fragment>
        <MatchaNav color="pink darken-4" />
        <CropModal picture={ this.state.image} opened={ this.state.modalOpened } toggle={ this.toggleModal } onComplete={ this.onComplete } />
        <MDBContainer style={ styles.bigContainer }>
          <MDBCol md="8">
            <div style={ styles.container }>
              <h3 className="text-center" style={ { color: '#c1c1c1' } } >Pictures</h3>
              <PicturesUpdate pictures={ myPictures } select={ this.onSelectFile } />
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
    profile: state.profile
  }
}

const mapDispatchToProps = {
  updateInformations: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(UpdateProfile))
