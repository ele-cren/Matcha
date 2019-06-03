import React from 'react'
import { connect } from 'react-redux'
import { getProfiles } from '../../requests/search'
import { MDBContainer, MDBCol, MDBCard } from 'mdbreact'
import styles from './SearchPage_styles'
import Radium from 'radium'

class SearchPage extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const xhr = getProfiles()
    xhr.onload = () => {
      console.log(xhr.response)
    }
  }

  render () {
    return (
      <MDBContainer>
        <MDBCol md="12" style={ styles.col }>
          <h1>Test</h1>
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

SearchPage = Radium(SearchPage)

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
