import React, { Component } from "react"
import Radium from 'radium'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBIcon, MDBDropdownItem } from "mdbreact"
import { Link } from 'react-router-dom'
import NotificationsDropdown from './NotificationsDropdown'
import { connect } from 'react-redux'
import languages from '../../languageLocalisation/languageList'
import { updateLanguage } from '../actions/languageActions/languageActions'

const styles = {
  dropItem: {
    padding: '5px 0 5px 0',
    ':hover': {
      backgroundColor: '#f7f7f7'
    }
  },
  icon: {
    fontSize: '25px',
    color: 'white'
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row'
  },
  linkItem: {
    color: 'white',
    margin: '0 15px 0 15px',
    lineHeight: '40px'
  }
}

class MatchaNav extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const color = this.props.color
    const userItem = (
      <React.Fragment>
        <NotificationsDropdown />
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
      </React.Fragment>
    )
    const notLoggedItems = (
      <React.Fragment>
        <MDBNavItem>
          <Link to='/login' style={ styles.linkItem }>Log In</Link>
        </MDBNavItem>
        <MDBNavItem>
          <Link to='/register' style={ styles.linkItem }>Register</Link>
        </MDBNavItem>
      </React.Fragment>
    )
    const languagesDiv = languages.map((x, i) => {
      return (
        <MDBDropdownItem
          key={ "lang" + i}
          className="text-center"
          disabled={ x === this.props.language }
          onClick={ () => this.props.updateLanguage(x) }
          >{ x }</MDBDropdownItem>
      )
    })
    const languageDropdown = (
      <MDBDropdown>
        <MDBDropdownToggle nav caret>
          <MDBIcon icon="flag" style={ styles.icon }/>
        </MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-default" right>
          { languagesDiv }
        </MDBDropdownMenu>
      </MDBDropdown>
    )
    return (
      <MDBNavbar color={ color } dark expand="md">
        <MDBNavbarBrand>
          <Link to='/'><strong className="white-text">Matcha</strong></Link>
        </MDBNavbarBrand>
        <MDBNavbarNav right style={ styles.navbar }>
        { this.props.user.user.userId ? userItem : notLoggedItems }
        { languageDropdown }
        </MDBNavbarNav>
      </MDBNavbar>
    )
  }
}

MatchaNav = Radium(MatchaNav)

const mapStateToProps = state => {
  return {
    user: state.user,
    language: state.language
  }
}

const mapDispatchToProps = {
  updateLanguage: updateLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchaNav)
