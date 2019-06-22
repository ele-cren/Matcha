const styles = {
  togglesContainer: {
    position: 'fixed',
    width: 250,
    height: 50,
    bottom: 0,
    right: 5,
    display: 'flex'
  },
  toggleMenu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #3f0624',
    zIndex: 20,
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#880e4f',
    width: 230,
    height: '100%',
    userSelect: 'none'
  },
  toggleMessagerie: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#660a3b',
    color: 'white',
    width: 20,
    height: '100%',
    userSelect: 'none',
    cursor: 'pointer',
    zIndex: 20,
  },
  menu: {
    position: 'fixed',
    bottom: 50,
    right: 25,
    width: 230,
    zIndex: 20,
    maxHeight: 500,
    overflow: 'auto',
    height: 500,
    backgroundColor: '#f2e6ec',
    border: '1px solid #b7acb2',
    display: 'flex',
    flexDirection: 'column'
  },
  matchDisplay: {
    display: 'flex',
    height: 50,
    alignItems: 'center',
    marginBottom: '5px'
  },
  picture: {
    width: 40,
    height: 40
  },
  messageInfosMatch: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  lastMessage: {
    border: '1px solid #e8e8e8',
    backgroundColor: '#fcfcfc',
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    fontSize: '13px',
    padding: '3px 5px 3px 5px'
  },
  countMsg: {
    display: 'flex',
    minWidth: 20,
    maxWidth: 20,
    minHeight: 20,
    maxHeight: 20,
    fontSize: '8px',
    position: 'relative',
    right: -20,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '1px solid #3f0624',
    userSelect: 'none',
    backgroundColor: '#880e4f',
    color: 'white'
  }
}

export default styles
