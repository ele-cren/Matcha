const styles = {
  bigContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    border: '1px solid #e8e8e8',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#fffcfd',
    borderRadius: '3px',
    boxShadow: '-1px 2px 13px -3px rgba(0,0,0,0.1)'
  },
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
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  handleStyle: {
    backgroundColor: '#880e4f',
    border: 'none',
    width: '10px',
    cursor: 'auto'
  },
  trackStyle: {
    backgroundColor: '#d6becb'
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    marginTop: 5
  }
}

export default styles
