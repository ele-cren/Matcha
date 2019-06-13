import React from 'react'
import { MDBContainer, MDBCol, MDBIcon } from 'mdbreact'
import Radium from 'radium'
import styles from '../Find_styles'
import { getGenderFromOriGend } from '../../../utilities/utilities'
import { getProfiles } from '../../../requests/search'
import { connect } from 'react-redux'
import ProfileCard from '../../ProfileCard/ProfileCard'
import { addDistanceToProfiles, addMatchingTagsToProfiles } from '../../../utilities/searchUtils'
import Filters from './Filters'
import { saveSuggested } from '../../../actions/searchActions'

class Suggests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      fetching: false,
      order: -1,
      age: [18, 30],
      distance: [0, 400],
      tags: [0, 4],
      score: [0, 100]
    }
    this.getProfiles = this.getProfiles.bind(this)
    this.selectOrder = this.selectOrder.bind(this)
    this.filterAge = this.filterAge.bind(this)
    this.setAge = this.setAge.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.filterDistance = this.filterDistance.bind(this)
    this.filterTags = this.filterTags.bind(this)
    this.filterScore = this.filterScore.bind(this)
    this.setDistance = this.setDistance.bind(this)
    this.setTags = this.setTags.bind(this)
    this.setScore = this.setScore.bind(this)
  }

  componentDidMount () {
    if (this.props.search.lastSuggested.length > 0) {
      this.setState({ profiles: this.props.search.lastSuggested })
    } else {
      this.getProfiles()
    }
  }
  
  getProfiles () {
    this.setState({
      fetching: true
    })
    const gender = getGenderFromOriGend(this.props.profile.informations.gender, this.props.profile.informations.orientation)
    const xhr = getProfiles({ type: 'suggests', gender: gender }, this.state.profiles.length)
    xhr.onload = () => {
      let profiles = addDistanceToProfiles(this.props.profile, xhr.response.userProfiles)
      profiles = addMatchingTagsToProfiles(this.props.profile, profiles)
      profiles = this.state.profiles.concat(profiles)
      profiles = this.sortFilter(this.state.order, profiles)
      profiles = this.filterAge(profiles)
      profiles = this.filterDistance(profiles)
      profiles = this.filterTags(profiles)
      profiles = this.filterScore(profiles)
      this.setState({
        profiles: profiles,
        fetching: false
      })
      this.props.saveSuggested(profiles)
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

  sortFilter (order, profiles) {
    switch (order) {
      case -1:
        return this.sortProfiles(profiles)
      case 0:
        return profiles.sort((a, b) => a.informations.age - b.informations.age)
      case 1:
        return profiles.sort((a, b) => a.distance - b.distance)
      case 2:
        return profiles.sort((a, b) => a.matchingTags - b.matchingTags)
      case 3:
        return profiles.sort((a, b) => a.informations.score - b.informations.score)
      default:
        return this.sortProfiles(profiles)
    }
  }

  selectOrder (order) {
    if (order !== this.state.order) {
      this.setState({ order: order })
      let profiles = [].concat(this.state.profiles)
      profiles = this.sortFilter(order, profiles)
      this.setState({ profiles: profiles })
      this.props.saveSuggested(profiles)
    }
  }

  updateValue (key, value) {
    this.setState({ [key]: value })
  }

  filterTags (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.matchingTags < this.state.tags[0] || x.matchingTags > this.state.tags[1] ? 1 : x.noDisplay
      return x
    })
    return newProfiles
  }

  filterScore (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.informations.score < this.state.score[0] || x.informations.score > this.state.score[1] ? 1 : x.noDisplay
      return x
    })
    return newProfiles
  }

  filterDistance (profiles) {
    let newProfiles = [].concat(profiles)
    if (this.state.distance[1] < 500) {
      newProfiles = newProfiles.map(x => {
        x.noDisplay = x.distance < this.state.distance[0] || x.distance > this.state.distance[1] ? 1 : x.noDisplay
        return x
      })
    }
    return newProfiles
  }

  filterAge (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.informations.age < this.state.age[0] || x.informations.age > this.state.age[1] ? 1 : 0
      return x
    })
    return newProfiles
  }

  setDistance () {
    const profiles = this.filterDistance(this.state.profiles)
    this.setState({ profiles: profiles })
    this.props.saveSuggested(profiles)
  }

  setTags () {
    const profiles = this.filterTags(this.state.profiles)
    this.setState({ profiles: profiles })
    this.props.saveSuggested(profiles)
  }

  setScore () {
    const profiles = this.filterScore(this.state.profiles)
    this.setState({ profiles: profiles })
    this.props.saveSuggested(profiles)
  }

  setAge () {
    const profiles = this.filterAge(this.state.profiles)
    this.setState({ profiles: profiles })
    this.props.saveSuggested(profiles)
  }

  render () {
    const spinner = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
    const profiles = this.state.profiles.map((x, i) => {
      return !x.noDisplay ? (
        <ProfileCard key={ i } profile={ x } />
      ) : ''
    })
    return (
      <MDBContainer>
        <MDBCol md="12">
          <Filters order={ this.state.order } age={ this.state.age } selectOrder= { this.selectOrder } updateValue={ this.updateValue }
            setAge={ this.setAge } distance={ this.state.distance } setDistance={ this.setDistance }
            tags={ this.state.tags } score={ this.state.score }  setScore={ this.setScore } setTags={ this.setTags }  />
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
    profile: state.profile,
    search: state.search
  }
}

const mapDispatchToProps = {
  saveSuggested: saveSuggested
}

Suggests = Radium(Suggests)

export default  connect(mapStateToProps, mapDispatchToProps)(Suggests)
