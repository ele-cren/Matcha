const getStyles = (gender) => {
  return {
    card: {
      width: 200,
      color: 'white',
      margin: 3
    },
    img: {
      width: 200
    },
    cardBody: {
      backgroundColor: gender === 1 ? '#1a237e' : '#880e4f',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 0
    },
    cardText: {
      color: 'white'
    }
  }
}

export default getStyles
