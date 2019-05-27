import React from 'react'

const Spinner = () => {
  return (
      <div className="spinner-border spinner-border-sm" role="status" style={ { color: 'white' } }>
        <span className="sr-only">Loading...</span>
      </div>
  )
}

export default Spinner
