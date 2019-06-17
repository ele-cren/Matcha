import React from 'react'
import Radium from 'radium'
import { MDBModal, MDBContainer, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'
import styles from './UpdateProfile_styles'
import ReactCrop from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css";

class CropModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      crop: {
        unit: 'px',
        width: 190,
        height: 200
      },
      minWidth: 190,
      minHeight: 200,
      maxWidth: 190,
      maxHeight: 200
    }
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.makeClientCrop = this.makeClientCrop.bind(this)
    this.saveCropped = this.saveCropped.bind(this)
  }

  onImageLoaded (image) {
    this.imageRef = image
  }

  onCropComplete (crop) {
    this.makeClientCrop(crop)
  }

  onCropChange (crop) {
    this.setState({ crop })
  }

  makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = this.getCroppedImg(
        this.imageRef,
        crop
      )
      this.setState({ croppedImageUrl })
    }
  }

  getCroppedImg (image, crop) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg');
  }

  saveCropped () {
    this.props.onComplete(this.state.croppedImageUrl)
    this.props.toggle()
  }

  render () {
    return (
      <MDBContainer>
        <MDBModal isOpen={ this.props.opened } toggle={ this.props.toggle } backdrop={ false }>
          <MDBModalBody style={ styles.modalBody }>
            { this.props.picture && <ReactCrop
              src={ this.props.picture }
              crop={ this.state.crop }
              minWidth={ this.state.minWidth }
              maxWidth={ this.state.maxWidth }
              minHeight={ this.state.minHeight }
              maxHeight={ this.state.maxHeight }
              style={ { maxWidth: 200 } }
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange} /> }
          </MDBModalBody>
          <MDBModalFooter style={ styles.modalFooter }>
            <MDBBtn className="text-center" color="elegant" onClick={ this.saveCropped }>Save</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default Radium(CropModal)
