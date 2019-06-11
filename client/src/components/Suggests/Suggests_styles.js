const styles = {
  container: {
    marginTop: 10,
    display: 'flex',
    flexWrap: 'wrap',
    '@media (max-width: 490px)': {
      justifyContent: 'center'
    }
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
    color: '#880e4f'
  },
  addContainer: {
    width: 48,
    height: 240,
    margin: '9px 0 0 2px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#d6d6d6'
  },
  addButton: {
    border: '1px solid #d6d6d6',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
    borderRadius: '3px',
    fontSize: '30px',
  },
  filterContainer: {
    marginTop: 5,
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid black'
  },
  dropdownItem: {
    padding: '5px 0 5px 10px',
    userSelect: 'none',
    cursor: 'pointer'
  }
}

export default styles
