const styles = {
  notificationContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '300px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden'
  },
  notification: {
    marginTop: '5px',
    width: '90%',
    height: '50px',
    textAlign: 'center',
    lineHeight: '50px',
    color: 'white',
    zIndex: '3',
    userSelect: 'none'
  },
  notificationView: {
    backgroundColor: 'rgba(34, 152, 165, 0.8)'
  },
  notificationLike: {
    backgroundColor: 'rgba(82, 155, 94, 0.8)'
  },
  notificationMatch: {
    backgroundColor: 'rgba(136, 14, 79, 0.8)'
  },
  notificationDislike: {
    backgroundColor: 'rgba(153, 136, 145, 0.8)'
  },
  notificationUnmatch: {
    backgroundColor: 'rgba(119, 119, 119, 0.8)'
  },
  notificationMessage: {
    backgroundColor: 'rgba(255, 167, 73, 0.8)'
  }
}

export default styles
