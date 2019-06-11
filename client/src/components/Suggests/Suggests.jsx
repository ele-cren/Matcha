import React from 'react'
import { MDBContainer, MDBCol, MDBIcon } from 'mdbreact'
import Radium from 'radium'
import styles from './Suggests_styles'
import { getGenderFromOriGend } from '../../utilities/utilities'
import { getProfiles } from '../../requests/search'
import { connect } from 'react-redux'
import ProfileCard from '../ProfileCard/ProfileCard'
import { addDistanceToProfiles, addMatchingTagsToProfiles } from '../../utilities/searchUtils'

class Suggests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      fetching: false
    }
    this.getProfiles = this.getProfiles.bind(this)
  }

  componentDidMount () {
    this.getProfiles()
  }

  getProfiles () {
    this.setState({
      fetching: true
    })
    const gender = getGenderFromOriGend(this.props.profile.informations.gender, this.props.profile.informations.orientation)
    const xhr = getProfiles(gender, this.state.profiles.length)
    xhr.onload = () => {
      let profiles = addDistanceToProfiles(this.props.profile, xhr.response.userProfiles)
      profiles = addMatchingTagsToProfiles(this.props.profile, profiles)
      profiles = this.state.profiles.concat(profiles)
      profiles = this.sortProfiles(profiles)
      console.log(profiles)
      this.setState({
        profiles: profiles,
        fetching: false
      })
    }
  }

  sortProfiles (profiles) {
    return profiles.sort((a, b) => {
      if (a.distance !== b.distance) {
        return a.distance - b.distance
      } else if (a.matchingTags !== b.matchingTags) {
        return b.matchingTags - a.matchingTags
      }
      return a.informations.score - b.informations.score
    })
  }

  render () {
    const spinner = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
    const profiles = this.state.profiles.map((x, i) => {
      return (
        <ProfileCard key={ i } profile={ x } />
      )
    })
    return (
      <MDBContainer>
        <MDBCol md="12">
          <div style={ styles.loadingContainer }>
            { this.state.fetching && this.state.profiles.length === 0 ? spinner : '' }
          </div>
          <div style={ styles.container }>
            { profiles.length > 0 ? profiles : '' }
            <div style={ styles.addContainer }>
              { this.state.fetching && this.state.profiles.length > 0 ? spinner :
              this.state.profiles.length > 0 ? (
                <div style={ styles.addButton } onClick={ this.getProfiles }><MDBIcon icon="plus" /></div>
               ) : '' }
            </div>
          </div>
        </MDBCol>
      </MDBContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = {
}

Suggests = Radium(Suggests)

export default  connect(mapStateToProps, mapDispatchToProps)(Suggests)
