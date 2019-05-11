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
    }
  }
} 

export default getStyles
