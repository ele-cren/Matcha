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
    border: '1px solid black',
    zIndex: 10,
    cursor: 'pointer',
    backgroundColor: 'red',
    width: 230,
    height: '100%',
    userSelect: 'none'
  },
  toggleMessagerie: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
    width: 20,
    height: '100%',
    userSelect: 'none',
    cursor: 'pointer'
  },
  menu: {
    position: 'fixed',
    bottom: 50,
    right: 25,
    width: 230,
    zIndex: 10,
    maxHeight: 500,
    overflow: 'auto',
    height: 500,
    backgroundColor: 'orange',
    border: '1px solid black'
  }
}

export default styles
