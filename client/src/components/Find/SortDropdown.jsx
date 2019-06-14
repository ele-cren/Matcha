import React from 'react'
import Radium from 'radium'
import styles from './Find_styles'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact'
import { connect } from 'react-redux'
const Text = require('../../../languageLocalisation/texts.json')

class SortDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.dropdownRef = React.createRef()
    this.selectOrder = this.selectOrder.bind(this)
  }

  selectOrder (order) {
    this.dropdownRef.current.onClick()
    this.props.selectOrder(order)
  }

  render () {
    const hovStyle = {
      ':hover': {
        backgroundColor: '#f9f9f9'
      }
    }
    const selectStyle = {
      backgroundColor: '#f7eff3'
    }
    const myText = Text[this.props.language]
    const order = this.props.order
    return (
      <MDBDropdown>
        <MDBDropdownToggle caret color="" ref={ this.dropdownRef } style={ styles.dropdownBtn }>
          { myText["sort"] }
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <div key={ 'dd1' } style={ [styles.dropdownItem, order === -1 ? selectStyle : hovStyle] } onClick={ () => this.selectOrder(-1) }>
            { myText["no_sort"] }
          </div>
          <div key={ 'dd2' } style={ [styles.dropdownItem, order === 0 ? selectStyle : hovStyle] } onClick={ () => this.selectOrder(0) }>
            Age
          </div>
          <div key={ 'dd3' } style={ [styles.dropdownItem, order === 1 ? selectStyle : hovStyle] } onClick={ () => this.selectOrder(1) }>
            Distance
          </div>
          <div key={ 'dd4' } style={ [styles.dropdownItem, order === 2 ? selectStyle : hovStyle] } onClick={ () => this.selectOrder(2) }>
            Tags
          </div>
          <div key={ 'dd5' } style={ [styles.dropdownItem, order === 3 ? selectStyle : hovStyle] } onClick={ () => this.selectOrder(3) }>
            Score
          </div>
        </MDBDropdownMenu>
      </MDBDropdown>
    )
  }
}

const mapStateToProps = state => {
  return {
    language: state.language
  }
}

export default connect(mapStateToProps, {})(Radium(SortDropdown))
