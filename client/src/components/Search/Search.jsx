import React from 'react'
import { MDBContainer, MDBCol } from 'mdbreact'
import Radium from 'radium'
import styles from './Search_styles'

class Search extends React.Component {
  render () {
    return (
      <MDBContainer>
        <MDBCol md="12" style={ styles.col }>
          <h1>Search</h1>
        </MDBCol>
      </MDBContainer>
    )
  }
}

export default Radium(Search)
