import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import Loader from '../components/Loader'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let mainPicture = ''
    let secondaryPictures = []
    this.props.profile.pictures.map(x => {
      if (x.main) {
        mainPicture = x.url
      } else {
        secondaryPictures = [...secondaryPictures, x.url]
      }
    })
    const profileJsx = (
      <div>
        <h1>Profile</h1>
        <p>Main picture : { mainPicture }</p>
        <p>Secondary : </p>
        <ul>
          { secondaryPictures.map((x, i) => <li key={ i }>{ x }</li>)}
        </ul>
      </div>
    )
    return (this.props.profile.fetching) ? <Loader /> : profileJsx
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
