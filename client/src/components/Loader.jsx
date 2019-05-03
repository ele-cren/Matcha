import React from 'react'

class Loader extends React.Component {
  render () {
    return (
      <div className="spinner">
        <div className="heart heart1"></div>
        <div className="heart heart2"></div>
        <div className="heart heart3"></div>
      </div>
    )
  }
}

export default Loader
