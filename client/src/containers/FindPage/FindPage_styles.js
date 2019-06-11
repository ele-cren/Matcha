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
    border: '1px solid #8c8c8c',
    borderRadius: '3px 0 0 3px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  tabRight: {
    width: '50%',
    height: 30,
    textAlign: 'center',
    fontSize: '20px',
    borderTop: '1px solid #8c8c8c',
    borderRight: '1px solid #8c8c8c',
    borderBottom: '1px solid #8c8c8c',
    borderLeft: 0,
    borderRadius: '0 3px 3px 0',
    cursor: 'pointer',
    userSelect: 'none'
  }
}

export default styles
