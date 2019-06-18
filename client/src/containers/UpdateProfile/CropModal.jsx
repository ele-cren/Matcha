import React from 'react'
import Radium from 'radium'
import { MDBModal, MDBContainer, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdbreact'
import styles from './UpdateProfile_styles'
import ReactCrop from 'react-image-crop'
import "react-image-crop/dist/ReactCrop.css"
import 'rc-slider/assets/index.css'
import Slider from 'rc-slider'

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
      maxHeight: 200,
      zoom: 50
    }
    this.onImageLoaded = this.onImageLoaded.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.makeClientCrop = this.makeClientCrop.bind(this)
    this.saveCropped = this.saveCropped.bind(this)
    this.updateZoom = this.updateZoom.bind(this)
  }

  onImageLoaded (image) {
    this.setState({ zoom: 50 })
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

  updateZoom (zoom) {
    this.setState({ zoom })
  }

  render () {
    return (
      <MDBContainer>
        <MDBModal isOpen={ this.props.opened } toggle={ this.props.toggle } backdrop={ false }>
          <MDBModalBody style={ styles.modalBody }>
            { this.props.picture && <ReactCrop
              src={ this.props.picture }
              crop={ this.state.crop }
              style={ { width: `${ this.state.zoom }%`, minWidth: 200 } }
              minWidth={ this.state.minWidth }
              maxWidth={ this.state.maxWidth }
              minHeight={ this.state.minHeight }
              maxHeight={ this.state.maxHeight }
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange} /> }
              <div style={ styles.sliderContainer }>
                <h5 className="text-center" >Zoom - { this.state.zoom } %</h5>
                <Slider
                  min={40} max={100} value={ this.state.zoom } handleStyle={ [styles.handleStyle] }
                  trackStyle={ [styles.trackStyle] }
                  onChange={ (zoom) => this.updateZoom(zoom) } />
              </div>
          </MDBModalBody>
          <MDBModalFooter style={ styles.modalFooter }>
            <MDBBtn className="text-center" color="elegant" onClick={ this.saveCropped }>Save</MDBBtn>
            <MDBBtn className="text-center" color="unique" onClick={ this.props.toggle }>Cancel</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    )
  }
}

export default Radium(CropModal)
