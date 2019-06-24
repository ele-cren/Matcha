const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagsContainer: {
    width: '90%',
    border: '1px solid #e8e8e8',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '10px 0 10px 0',
    padding: 3,
    borderRadius: '3px'
  },
  tag: {
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d8d8d8',
    border: '1px solid black',
    padding: '0 5px 0 5px',
    margin: 5,
    userSelect: 'none'
  },
  deleteCross: {
    fontSize: '8px',
    position: 'relative',
    left: 4,
    top: -12,
    cursor: 'pointer'
  }
}

export default styles
