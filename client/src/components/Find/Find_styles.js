const styles = {
  container: {
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
    zIndex: -1
  },
  searchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBtn: {
    color: '#880e4f',
    border: '1px solid #880e4f'
  },
  filterContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '1px solid #880e4f',
    backgroundColor: '#fffcfd',
    borderRadius: '3px'
  },
  dropdownBtn: {
    color: '#880e4f',
    border: '1px solid #880e4f'
  },
  dropdownItem: {
    padding: '5px 0 5px 10px',
    userSelect: 'none',
    cursor: 'pointer'
  },
  sliderContainer: {
    width: '150px',
    color: '#880e4f',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '3px',
    border: '1px solid #880e4f'
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
  displayAge: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  checkboxContainer: {
    width: '100px',
    color: '#880e4f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: '3px',
    border: '1px solid #880e4f'
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#f2f2f2',
    marginRight: 5,
    cursor: 'pointer'
  },
  searchInput: {
    width: 100,
    ':focus': {
      outline: 'none'
    },
    ':active': {
      outline: 'none'
    }
  }
}

export default styles
