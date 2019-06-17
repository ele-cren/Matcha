import React from 'react'
import Radium from 'radium'
import styles from './UpdateProfile_styles'

const getPictureInput = (pictures, index, select) => {
  let backgroundStyle
  if (pictures[index]) {
    backgroundStyle = {
      backgroundImage: `url('${ pictures[index].url }')`,
      backgroundSize: '50px 60px'
    }
  } else {
    backgroundStyle = { backgroundColor: 'grey' }
  }
  return (
    <React.Fragment key={ index }>
      <input style={ styles.inputPic } type="file" id="picture" name="picture" accept="image/png,image/jpeg"
        onChange={ (e) => select(e, pictures[index] ? pictures[index].url : '') } />
      <label htmlFor="picture" style={ [styles.labelPic, backgroundStyle] }></label>
    </React.Fragment>
  )
}

const PicturesUpdate = (props) => {
  const pictures = props.pictures
  let basicPicsInputs = []
  for (let i = 0; i < 4; i++) {
    basicPicsInputs = [...basicPicsInputs, getPictureInput(pictures, i + 1, props.select)]
  }
  return (
    <React.Fragment>
      <div style={ styles.mainPictureContainer }>
        { getPictureInput(pictures, 0, props.select) }
      </div>
      <div style={ styles.picturesContainer }>
        { basicPicsInputs }
      </div>
    </React.Fragment>
  )
}

export default Radium(PicturesUpdate)
