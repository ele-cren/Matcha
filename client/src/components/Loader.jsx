import React from 'react'

class Loader extends React.Component {
  render () {
    return (
      <div class="gooey">
        <span class="dot"></span>
        <div class="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}

export default Loader
