import React from 'react'
import Radium from 'radium'
import { MDBBtn, MDBIcon } from 'mdbreact'
import styles from '../Find_styles'
import 'rc-slider/assets/index.css'
const { Range } = require('rc-slider')
import SortDropdown from '../SortDropdown'
const Text = require('../../../../languageLocalisation/texts.json')
import { connect } from 'react-redux'

class SearchFilters extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gender: -1,
      age: [],
      distance: [],
      score: [],
      tags: [],
      online: 0,
      search: ''
    }
    this.updateValue = this.updateValue.bind(this)
    this.updateGender = this.updateGender.bind(this)
  }

  componentDidMount () {
    this.setState({
      gender: this.props.search.searchOpts.gender,
      age: this.props.search.searchOpts.age,
      distance: this.props.search.searchOpts.distance,
      tags: this.props.search.searchOpts.tags,
      score: this.props.search.searchOpts.score,
      online: this.props.search.searchOpts.online,
      search: this.props.search.searchOpts.search
    })
  }

  updateValue (key, value) {
    this.setState({ [key]: value })
  }

  updateGender (gender) {
    let newGender
    if (gender === 1) {
      newGender = this.state.gender === -1 ? 2 : this.state.gender === 2 ? -1 : this.state.gender
    } else {
      newGender = this.state.gender === -1 ? 1 : this.state.gender === 1 ? -1 : this.state.gender
    }
    this.setState({
      gender: newGender
    })
  }

  render () {
    const { age, distance, tags, score } = this.state
    const displayScoreMedia = {
      '@media (max-width: 385px)': {
        flexDirection: 'column',
        alignItems: 'center'
      }
    }
    const selectedCheckbox = {
      backgroundColor: '#880e4f'
    }
    const myText = Text[this.props.language]
    return (
      <div style={ styles.searchContainer }>
        <div style={ styles.filterContainer }>
          <SortDropdown order={ this.props.order } selectOrder={ this.props.selectOrder } />
          <div style={ [styles.checkboxContainer, { width: 110 }] } >
            <div style={ [styles.checkbox, this.state.online ? selectedCheckbox : ''] }
              onClick={ () => this.updateValue('online', this.state.online ? 0 : 1) }></div>
            { myText["online"] }
          </div>
          <div style={ [styles.sliderContainer, { width: 100, alignItems: 'flex-start' }] }>
            <div style={ { display: 'flex' } } >
              <div style={ [styles.checkbox, (this.state.gender === 1 || this.state.gender === -1) ? selectedCheckbox : ''] }
                onClick={ () => this.updateGender(1) }></div>
              { myText["gender_male"] }
            </div>
            <div style={ { display: 'flex' } } >
              <div style={ [styles.checkbox, (this.state.gender === 2 || this.state.gender === -1) ? selectedCheckbox : ''] }
                onClick={ () => this.updateGender(2) }></div>
              { myText["gender_female"] }
            </div>
          </div>
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
          <div style={ styles.sliderContainer } >
            <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
              <MDBIcon icon="search" className="mr-2" />
              <input style={ styles.searchInput }
                type="text" value={ this.state.search } name="search" onChange={ (e) => this.updateValue('search', e.target.value) } />
            </div>
          </div>
        </div>
        <div style={ styles.searchBtnContainer } >
          <MDBBtn color="" style={ styles.searchBtn } onClick={ () => this.props.searchProfiles(this.state) } >{ myText["search"] } </MDBBtn>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    language: state.language
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SearchFilters))
