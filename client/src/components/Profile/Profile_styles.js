const getStyles = (gender = 1) => {
  return {
    picture: {
      width: '200px',
      height: '200px'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
      margin: '20px 0 0 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: gender === 1 ? '#e1e2ef' : '#eae3e7'
    },
    gender: {
      border: '1px solid black',
      width: '100px',
      padding: '5px 0 5px 0',
      margin: '0 2px 0 2px',
      userSelect: 'none',
      'MozUserSelect': 'none',
      color: 'white'
    },
    orientation: {
      border: '1px solid black',
      width: '100px',
      padding: '5px 0 5px 0',
      margin: '0 2px 0 2px',
      userSelect: 'none',
      'MozUserSelect': 'none',
      color: 'white'
    },
    tagsContainer: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#eceff1',
      flexWrap: 'wrap',
      marginTop: 15,
      borderRadius: '3px',
      border: '1px solid #d6d6d6'
    },
    tag: {
      minWidth: 75,
      margin: '5px 3px 5px 3px',
      backgroundColor: '#cfd8dc',
      fontStyle: 'italic',
      lineHeight: '30px',
      border: '1px solid #afaeae',
      userSelect: 'none',
      'MozUserSelect': 'none',
      padding: '0 3px 0 3px'
    },
    personalInfos: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    bio: {
      border: '1px solid #d6d6d6',
      padding: 20,
      borderRadius: '3px',
      fontSize: '1.2em',
      backgroundColor: '#fafafa'
    },
    carousel: {
      width: '200px',
      height: '200px',
      marginTop: 10
    },
    caption: {
      color: 'white',
      position: 'relative',
      top: '-195px',
      left: '0px',
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '3px'
    },
    button: {
      width: 165,
      height: 50
    },
    loveIcons: {
      fontSize: '30px',
      position: 'absolute',
      left: 0,
      top: 0,
      color: gender === 1 ? '#1a237e' : '#880e4f',
      display: 'flex',
      '@media (max-width: 445px)': {
        flexDirection: 'column'
      },
      '@media (max-width: 370px)': {
        fontSize: '18px'
      }
    },
    score: {
      color: gender === 1 ? '#1a237e' : '#880e4f',
      fontSize: '30px',
      marginLeft: '5px'
    },
    online: {
      fontSize: '15px',
      marginTop: '5px'
    },
    banIcons: {
      fontSize: '30px',
      position: 'absolute',
      right: 0,
      top: 0,
      color: gender === 1 ? '#1a237e' : '#880e4f',
      display: 'flex',
      '@media (max-width: 435px)': {
        flexDirection: 'column'
      },
      '@media (max-width: 345px)': {
        fontSize: '20px'
      }
    },
    banIcon: {
      cursor: 'pointer'
    },
    colContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '10px'
    },
    profilesCol: {
      display: 'flex',
      flexWrap: 'wrap',
      borderRadius: '5px',
      padding: 0,
      marginTop: '10px'
    },
    profileCard: {
      margin: 3,
      width: '75px'
    },
    profileCardTitle: {
      fontSize: '15px',
      margin: 0
    },
    profileCardBody: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      color: 'black'
    }
  }
} 

export default getStyles
