import React, { Component } from "react"
import Radium from 'radium'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = {
  dropItem: {
    padding: '5px 0 5px 0',
    ':hover': {
      backgroundColor: '#f7f7f7'
    }
  }
}

class MatchaNav extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const color = this.props.profile.informations.genre === 1 ? 'indigo darken-4' : 'pink darken-4'
    return (
      <MDBNavbar color={ color } dark expand="md">
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
                <div key={ 3 } style={ styles.dropItem }><Link to='/logout'>Logout</Link></div>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBNavbar>
    )
  }
}

MatchaNav = Radium(MatchaNav)

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchaNav)