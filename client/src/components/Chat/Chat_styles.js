const styles = {
  togglesContainer: {
    position: 'fixed',
    width: 270,
    height: 50,
    bottom: 0,
    right: 5,
    display: 'flex',
    zIndex: 20
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
    width: 250,
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
    width: 250,
    zIndex: 20,
    maxHeight: 500,
    overflowY: 'auto',
    height: 500,
    backgroundColor: '#f2e6ec',
    border: '1px solid #b7acb2',
    display: 'flex',
    flexDirection: 'column'
  },
  matchDisplay: {
    display: 'flex',
    minHeight: 50,
    maxHeight: 50,
    alignItems: 'center',
    marginBottom: '5px',
    cursor: 'pointer'
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    border: '1px solid #3f0624',
    userSelect: 'none',
    backgroundColor: '#880e4f',
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginLeft: 15
  },
  modalBody: {
    backgroundColor: '#fcfcfc',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 500,
    overflowY: 'auto'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    width: '90%',
    padding: 8,
    marginBottom: 10,
    border: '1px solid #eaeaea',
    ':focus': {
      outline: 0
    }
  },
  icon: {
    color: '#880e4f'
  },
  messagesSent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '5px 0 5px 0'
  },
  messagesReceived: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '5px 0 5px 0'
  },
  message: {
    border: '1px solid #d6d6d6',
    backgroundColor: '#eaeaea',
    padding: 5,
    borderRadius: '3px',
    margin: '0 10px 0 10px'
  },
  sendBtn: {
    border: 0,
    backgroundColor: 'white'
  }
}

export default styles
