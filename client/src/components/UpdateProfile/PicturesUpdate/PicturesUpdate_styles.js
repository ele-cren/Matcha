const styles = {
  mainPictureContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  picturesContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputPic: {
    width: 0,
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1',
    visibility: 'hidden'
  },
  labelPic: {
    width: 50,
    height: 60,
    border: '1px solid black',
    margin: 3,
    cursor: 'pointer'
  },
  deleteCross: {
    position: 'relative',
    fontSize: '10px',
    left: -14,
    top: -24,
    cursor: 'pointer'
  }
}

export default styles
