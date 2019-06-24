import Radium from 'radium'
import React from 'react'
import { MDBContainer, MDBCol } from 'mdbreact'
import styles from './FindPage_styles'
import Search from '../../components/Find/Search/Search'
import Suggests from '../../components/Find/Suggests/Suggests'
import { connect } from 'react-redux'
const Text = require('../../../languageLocalisation/texts.json')

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
    const myText = Text[this.props.language]
    const tabLeft = Object.assign(styles.tabLeft, {
      borderBottom: this.state.selected === 1 ? '2px solid #880e4f' : '2px solid #f2f2f2'
    })
    const tabRight = Object.assign(styles.tabRight, {
      borderBottom: this.state.selected === 2 ? '2px solid #880e4f' : '2px solid #f2f2f2'
    })
    return (
      <React.Fragment>
        <MDBContainer>
          <MDBCol md="12" style={ styles.col }>
            <div style={ styles.tabContainer }>
              <div key={ 't1' } style={ tabLeft } onClick={ () => this.changeSelected(1) }>{ myText["search"] }</div>
              <div key={ 't2' } style={ tabRight } onClick={ () => this.changeSelected(2) }>Suggestions</div>
            </div>
          </MDBCol>
        </MDBContainer>
        { this.state.selected === 1 ? <Search /> : <Suggests /> }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FindPage))
