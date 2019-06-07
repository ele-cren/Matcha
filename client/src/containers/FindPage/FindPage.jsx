import Radium from 'radium'
import React from 'react'
import { connect } from 'react-redux'
import { getProfiles } from '../../requests/search'
import { MDBContainer, MDBCol, MDBIcon } from 'mdbreact'
import styles from './FindPage_styles'

class FindPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 1
    }
    this.changeSelected = this.changeSelected.bind(this)
  }

  changeSelected () {
    this.setState({
      selected: this.state.selected === 1 ? 2 : 1
    })
  }

  componentDidMount () {
    const xhr = getProfiles()
    xhr.onload = () => {
      console.log(xhr.response)
    }
  }

  render () {
    const tabLeft = Object.assign(styles.tabLeft, {
      color: this.state.selected === 1 ? 'white' : 'black',
      backgroundColor: this.state.selected === 1 ? '#880e4f' : '#f7e8ef'
    })
    const tabRight = Object.assign(styles.tabRight, {
      color: this.state.selected === 2 ? 'white' : 'black',
      backgroundColor: this.state.selected === 2 ? '#880e4f' : '#f7e8ef'
    })
    return (
      <MDBContainer>
        <MDBCol md="12" style={ styles.col }>
          <div style={ styles.tabContainer }>
            <div style={ tabLeft } onClick={ this.changeSelected }>Search</div>
            <div style={ tabRight } onClick={ this.changeSelected }>Suggestions</div>
          </div>
        </MDBCol>
      </MDBContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = {
}

FindPage = Radium(FindPage)

export default connect(mapStateToProps, mapDispatchToProps)(FindPage)
