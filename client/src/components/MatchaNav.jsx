import React, { Component } from "react"
import Radium from 'radium'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom'

const styles = {
  dropItem: {
    padding: '5px 0 5px 0',
    ':hover': {
      backgroundColor: '#f7f7f7'
    }
  }
}

class MatchaNav extends Component {
  render() {
    return (
      <MDBNavbar color="pink darken-4" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Matcha</strong>
        </MDBNavbarBrand>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default" right>
                <div key={ 1 } style={ styles.dropItem }><Link to='/profile'>Profile</Link></div>
                <div key={ 2 } style={ styles.dropItem }><Link to='/profile/update'>Edit Profile</Link></div>
                <div key={ 3 } style={ styles.dropItem }><Link to='/'>Logout</Link></div>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    )
  }
}

MatchaNav = Radium(MatchaNav)

export default MatchaNav