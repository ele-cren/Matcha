import React from 'react'
import Radium from 'radium'
import { MDBBtn } from 'mdbreact'
import styles from '../Find_styles'
import 'rc-slider/assets/index.css'
const { Range } = require('rc-slider')
import SortDropdown from '../SortDropdown'
import { connect } from 'react-redux'

class SearchFilters extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      age: [],
      distance: [],
      score: [],
      tags: []
    }
    this.updateValue = this.updateValue.bind(this)
  }

  componentDidMount () {
    this.setState({
      age: this.props.search.searchOpts.age,
      distance: this.props.search.searchOpts.distance,
      tags: this.props.search.searchOpts.tags,
      score: this.props.search.searchOpts.score
    })
  }

  updateValue (key, value) {
    this.setState({ [key]: value })
  }

  render () {
    const { age, distance, tags, score } = this.state
    const displayScoreMedia = {
      '@media (max-width: 385px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    }
    return (
      <div style={ styles.searchContainer }>
        <div style={ styles.filterContainer }>
          <SortDropdown order={ this.props.order } selectOrder={ this.props.selectOrder } />
          <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 110 } }] } >
            <div style={ styles.displayAge }>
              <h6>Age</h6>
              <h6>{ age[0] } - { age[1] }</h6>
            </div>
            <Range 
              min={18} max={100} value={ age } handleStyle={ [styles.handleStyle, styles.handleStyle] }
              trackStyle={ [styles.trackStyle] } pushable={ true }
              onChange={ (age) => this.updateValue('age', age) } />
          </div>
          <div style={ styles.sliderContainer } >
            <div style={ styles.displayAge }>
              <h6>Distance</h6>
              <h6>{ distance[0] } - { distance[1] }{ distance[1] === 500 ? '+' : '' }</h6>
            </div>
            <Range 
              min={0} max={500} value={ distance } handleStyle={ [styles.handleStyle, styles.handleStyle] }
              trackStyle={ [styles.trackStyle] } pushable={ true }
              onChange={ (dist) => this.updateValue('distance', dist) }/>
          </div>
          <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 100 } }] } >
            <div style={ styles.displayAge }>
              <h6>Tags</h6>
              <h6>{ tags[0] } - { tags[1] }</h6>
            </div>
            <Range 
              min={0} max={20} value={ tags } handleStyle={ [styles.handleStyle, styles.handleStyle] }
              trackStyle={ [styles.trackStyle] } pushable={ true }
              onChange={ (tags) => this.updateValue('tags', tags) } />
          </div>
          <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 100 } }] } >
            <div style={ [styles.displayAge, displayScoreMedia] }>
              <h6>Score</h6>
              <h6>{ score[0] } - { score[1] }</h6>
            </div>
            <Range 
              min={0} max={1000} value={ score } step={ 10 } handleStyle={ [styles.handleStyle, styles.handleStyle] }
              trackStyle={ [styles.trackStyle] } pushable={ true }
              onChange={ (score) => this.updateValue('score', score) } />
          </div>
        </div>
        <div style={ styles.searchBtnContainer } >
          <MDBBtn color="" style={ styles.searchBtn } onClick={ () => this.props.searchProfiles(this.state) } >Search</MDBBtn>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SearchFilters))
