import React from 'react'
import Radium from 'radium'
import { MDBIcon, MDBNavItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact'
import { connect } from 'react-redux'
import { updateNotif, deleteNotif } from '../actions/notificationsActions/notifActions'
import { socket } from '../containers/App'
import { Link } from 'react-router-dom'

const styles = (color = '#edf8f9') => {
  return {
    icon: {
      fontSize: '25px',
      marginRight: '10px',
    },
    count: {
      position: 'absolute',
      top: '10px',
      right: '80px',
      width: '15px',
      height: '15px',
      backgroundColor: 'red',
      zIndex: '2',
      borderRadius: '50%',
      textAlign: 'center',
      color: 'white',
      fontSize: '9px',
      lineHeight: '15px',
      userSelect: 'none'
    },
    dropItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 30px 0 10px',
      width: '415px',
      ':hover': {
        backgroundColor: '#f7f7f7'
      },
      userSelect: 'none'
    },
    image: {
      width: '35px',
      border: '2px solid' + color
    },
    cross: {
      fontSize: '10px',
      marginRight: '5px',
      color: '#6d6d6d',
      cursor: 'pointer'
    }
  }
}

class NotificationsDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.viewNotifs = this.viewNotifs.bind(this)
    this.deleteNotif = this.deleteNotif.bind(this)
  }

  viewNotifs () {
    for (const notif of this.props.notifications) {
      this.props.updateNotif(notif.uuid)
      socket.emit('update notification', notif.uuid)
    }
  }

  deleteNotif (notifId) {
    this.props.deleteNotif(notifId)
    socket.emit('delete notification', notifId)
  }

  getText (notif) {
    switch (notif.type) {
      case 1:
        return notif.userInfos.mainInformations.first_name + ' viewed your profile'
      case 2:
        return notif.userInfos.mainInformations.first_name + ' liked your profile'
      case 3:
        return "It's a match with " + notif.userInfos.mainInformations.first_name
      case 4:
        return notif.userInfos.mainInformations.first_name + " doesn't like your profile anymore"
      case 5:
        return "It's not a match with " + notif.userInfos.mainInformations.first_name + ' anymore'
      default:
        return notif.userInfos.mainInformations.first_name + ' viewed your profile'
    }
  }

  getColor (type) {
    switch (type) {
      case 1:
        return '#2298a5'
      case 2:
        return '#529b09'
      case 3:
        return '#880e4f'
      case 4:
        return '#998891'
      case 5:
        return '#494949'
      default:
        return '#2298a5'
    }
  }

  render () {
    let count = 0
    for (const notif of this.props.notifications) {
      if (!notif.view) {
        count++
      }
    }
    const notifications = this.props.notifications.map((x, i) => {
      const text = this.getText(x)
      const color = this.getColor(x.type)
      return (
        <div key={ i } style={ styles().dropItem }>
          <MDBIcon icon="times" style={ styles().cross } onClick={ () => this.deleteNotif(x.uuid) } />
          <Link to={ "/profile/" + x.from_user }>
            <img
              src={ x.userInfos.mainPicture }
              style={ styles(color).image }
              className="rounded-circle" />
          </Link>
          <p className="mt-3 ml-3">{ text }</p>
        </div>
      )
    })
    return (
      <MDBNavItem>
        { count > 0 ? <div style={ styles().count }>{ count >= 100 ? '..' : count }</div> : '' }
        <MDBDropdown>
          <MDBDropdownToggle nav onClick={ this.viewNotifs }>
            <MDBIcon icon="bell" style={ styles().icon }/>
          </MDBDropdownToggle>
          { this.props.notifications.length > 0 ? (
            <MDBDropdownMenu className="dropdown-default" right>
              { notifications }
            </MDBDropdownMenu>

          ) : ''}
        </MDBDropdown>
      </MDBNavItem>
    )
  }
}

NotificationsDropdown = Radium(NotificationsDropdown)

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

const mapDispatchToProps = {
  updateNotif: updateNotif,
  deleteNotif: deleteNotif
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsDropdown)
