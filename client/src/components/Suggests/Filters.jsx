import React from 'react'
import Radium from 'radium'
import styles from './Suggests_styles'
import SortDropdown from './SortDropdown'
import 'rc-slider/assets/index.css'
const { Range } = require('rc-slider')

const Filters = (props) => {
  const { age, order, distance, tags, score } = props
  const displayScoreMedia = {
    '@media (max-width: 385px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
  return (
    <div style={ styles.filterContainer }>
      <SortDropdown order={ order } selectOrder={ props.selectOrder } />
      <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 110 } }] } >
        <div style={ styles.displayAge }>
          <h6>Age</h6>
          <h6>{ age[0] } - { age[1] }</h6>
        </div>
        <Range 
          min={18} max={100} value={ age } handleStyle={ [styles.handleStyle, styles.handleStyle] }
          trackStyle={ [styles.trackStyle] } pushable={ true } onChange={ (age) => props.updateValue('age', age) } onAfterChange={ props.setAge } />
      </div>
      <div style={ styles.sliderContainer } >
        <div style={ styles.displayAge }>
          <h6>Distance</h6>
          <h6>{ distance[0] } - { distance[1] }{ distance[1] === 500 ? '+' : '' }</h6>
        </div>
        <Range 
          min={0} max={500} value={ distance } handleStyle={ [styles.handleStyle, styles.handleStyle] }
          trackStyle={ [styles.trackStyle] } pushable={ true }
          onChange={ (dist) => props.updateValue('distance', dist) } onAfterChange={ props.setDistance } />
      </div>
      <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 100 } }] } >
        <div style={ styles.displayAge }>
          <h6>Tags</h6>
          <h6>{ tags[0] } - { tags[1] }</h6>
        </div>
        <Range 
          min={0} max={20} value={ tags } handleStyle={ [styles.handleStyle, styles.handleStyle] }
          trackStyle={ [styles.trackStyle] } pushable={ true }
          onChange={ (tags) => props.updateValue('tags', tags) } onAfterChange={ props.setTags } />
      </div>
      <div style={ [styles.sliderContainer, { '@media (max-width: 385px)': { width: 100 } }] } >
        <div style={ [styles.displayAge, displayScoreMedia] }>
          <h6>Score</h6>
          <h6>{ score[0] } - { score[1] }</h6>
        </div>
        <Range 
          min={0} max={1000} value={ score } step={ 10 } handleStyle={ [styles.handleStyle, styles.handleStyle] }
          trackStyle={ [styles.trackStyle] } pushable={ true }
          onChange={ (score) => props.updateValue('score', score) } onAfterChange={ props.setScore } />
      </div>
    </div>
  )
}

export default Radium(Filters)
