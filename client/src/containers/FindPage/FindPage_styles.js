const styles = {
  col: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0
  },
  tabContainer: {
    display: 'flex',
    width: '100%'
  },
  tabLeft: {
    width: '50%',
    height: 30,
    textAlign: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0 0 40px 0',
    ':hover': {
      backgroundColor: '#fbfbfb'
    }
  },
  tabRight: {
    width: '50%',
    height: 30,
    textAlign: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0 0 40px 0',
    ':hover': {
      backgroundColor: '#fbfbfb'
    }
  }
}

export default styles
