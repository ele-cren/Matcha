import Radium from 'radium'
import React from 'react'
import { MDBContainer, MDBCol } from 'mdbreact'
import styles from './FindPage_styles'
import Search from '../../components/Find/Search/Search'
import Suggests from '../../components/Find/Suggests/Suggests'

class FindPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 1
    }
    this.changeSelected = this.changeSelected.bind(this)
  }

  changeSelected (value) {
    this.setState({
      selected: value
    })
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
      <React.Fragment>
        <MDBContainer>
          <MDBCol md="12" style={ styles.col }>
            <div style={ styles.tabContainer }>
              <div style={ tabLeft } onClick={ () => this.changeSelected(1) }>Search</div>
              <div style={ tabRight } onClick={ () => this.changeSelected(2) }>Suggestions</div>
            </div>
          </MDBCol>
        </MDBContainer>
        { this.state.selected === 1 ? <Search /> : <Suggests /> }
      </React.Fragment>
    )
  }
}

FindPage = Radium(FindPage)

export default FindPage
