import React, { Component } from "react"
import Radium from 'radium'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom'
import NotificationsDropdown from './NotificationsDropdown'
import { connect } from 'react-redux'

const styles = {
  dropItem: {
    padding: '5px 0 5px 0',
    ':hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  icon: {
    fontSize: '25px',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row'
  }
}

class MatchaNav extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const color = this.props.color
    const userItem = (
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav caret>
            <MDBIcon icon="user" style={ styles.icon }/>
          </MDBDropdownToggle>
          <MDBDropdownMenu className="dropdown-default" right>
            <div key={ 1 } style={ styles.dropItem }><Link to='/profile'>Profile</Link></div>
            <div key={ 2 } style={ styles.dropItem }><Link to='/profile/update'>Edit Profile</Link></div>
            <div key={ 3 } style={ styles.dropItem }><Link to='/logout'>Logout</Link></div>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    )
    return (
      <MDBNavbar color={ color } dark expand="md">
        <MDBNavbarBrand>
          <Link to='/'><strong className="white-text">Matcha</strong></Link>
        </MDBNavbarBrand>
        <MDBNavbarNav right style={ styles.navbar }>
        <NotificationsDropdown />
        { this.props.user.user.userId ? userItem : '' }
        </MDBNavbarNav>
      </MDBNavbar>
    )
  }
}

MatchaNav = Radium(MatchaNav)

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchaNav)
