import React from 'react'

class Loader extends React.Component {
  render () {
    return (
      <div class="spinner">
        <div class="heart heart1"></div>
        <div class="heart heart2"></div>
        <div class="heart heart3"></div>
      </div>
    )
  }
}

export default Loader
