import React from 'react'
import Radium from 'radium'
import styles from './PicturesUpdate_styles'
import { MDBIcon } from 'mdbreact'

const getPictureInput = (pictures, index, select, del) => {
  let backgroundStyle
  if (pictures[index]) {
    backgroundStyle = {
      backgroundImage: `url('${ pictures[index].url }')`,
      backgroundSize: '50px 60px'
    }
  } else {
    backgroundStyle = { backgroundColor: '#eaeaea' }
  }
  return (
    <React.Fragment key={ index }>
      <input style={ styles.inputPic } type="file" id={ `picture${ index }` } name={ `picture${ index }` } accept="image/png,image/jpeg"
        onChange={ (e) => select(e, pictures[index] ? pictures[index].url : '') }/>
      <label htmlFor={ `picture${ index }` } style={ [styles.labelPic, backgroundStyle] }></label>
      { index !== 0 && pictures[index] ? 
        <MDBIcon style={ styles.deleteCross } far icon="times-circle" onClick={ () => del(pictures[index].url) } /> : '' }
    </React.Fragment>
  )
}

const PicturesUpdate = (props) => {
  const pictures = props.pictures
  let basicPicsInputs = []
  for (let i = 0; i < 4; i++) {
    basicPicsInputs = [...basicPicsInputs, getPictureInput(pictures, i + 1, props.select, props.deletePic)]
  }
  return (
    <React.Fragment>
      <div style={ styles.mainPictureContainer }>
        { getPictureInput(pictures, 0, props.select, props.deletePic) }
      </div>
      <div style={ styles.picturesContainer }>
        { basicPicsInputs }
      </div>
    </React.Fragment>
  )
}

export default Radium(PicturesUpdate)
