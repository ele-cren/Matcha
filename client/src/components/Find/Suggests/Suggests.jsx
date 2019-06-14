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
import { saveSuggested, updateSuggestOptions, selectProfile } from '../../../actions/searchActions'

class Suggests extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      fetching: false,
      order: -1
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
    this.setProfile = this.setProfile.bind(this)
    this.filterBlocked = this.filterBlocked.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
  }

  componentDidMount () {
    if (this.props.search.lastSuggested.length > 0) {
      let profiles = [].concat(this.props.search.lastSuggested)
      profiles = this.applyFilters(profiles)
      this.setState({ profiles: profiles })
    } else {
      this.getProfiles()
    }
  }
  
  setProfile (profile) {
    this.props.selectProfile(profile)
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
      profiles = this.applyFilters(profiles)
      this.setState({
        profiles: profiles,
        fetching: false
      })
      this.props.saveSuggested(profiles)
    }
  }

  applyFilters (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = this.sortFilter(this.state.order, newProfiles)
    newProfiles = this.filterAge(newProfiles)
    newProfiles = this.filterDistance(newProfiles)
    newProfiles = this.filterTags(newProfiles)
    newProfiles = this.filterScore(newProfiles)
    newProfiles = this.filterBlocked(newProfiles)
    return newProfiles
  }

  filterBlocked (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = this.props.ban.blockedUsers.includes(x.informations.user_id) ? 1 : x.noDisplay
      return x
    })
    return newProfiles
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
    const newOpts = Object.assign({}, this.props.search.suggestOpts)
    newOpts[key] = value
    this.props.updateOptions(newOpts)
  }

  filterTags (profiles) {
    const tags = this.props.search.suggestOpts.tags
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.matchingTags < tags[0] || x.matchingTags > tags[1] ? 1 : x.noDisplay
      return x
    })
    return newProfiles
  }

  filterScore (profiles) {
    const score = this.props.search.suggestOpts.score
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.informations.score < score[0] || x.informations.score > score[1] ? 1 : x.noDisplay
      return x
    })
    return newProfiles
  }

  filterDistance (profiles) {
    const distance = this.props.search.suggestOpts.distance
    let newProfiles = [].concat(profiles)
    if (distance[1] < 500) {
      newProfiles = newProfiles.map(x => {
        x.noDisplay = x.distance < distance[0] || x.distance > distance[1] ? 1 : x.noDisplay
        return x
      })
    }
    return newProfiles
  }

  filterAge (profiles) {
    const age = this.props.search.suggestOpts.age
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.informations.age < age[0] || x.informations.age > age[1] ? 1 : 0
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
        <ProfileCard key={ i } profile={ x } selectProfile={ this.setProfile }  />
      ) : ''
    })
    const { age, distance, score, tags } = this.props.search.suggestOpts
    return (
      <MDBContainer>
        <MDBCol md="12">
          <Filters order={ this.state.order } age={ age } selectOrder= { this.selectOrder } updateValue={ this.updateValue }
            setAge={ this.setAge } distance={ distance } setDistance={ this.setDistance }
            tags={ tags } score={ score }  setScore={ this.setScore } setTags={ this.setTags }  />
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
    search: state.search,
    ban: state.ban
  }
}

const mapDispatchToProps = {
  saveSuggested: saveSuggested,
  updateOptions: updateSuggestOptions,
  selectProfile: selectProfile
}

Suggests = Radium(Suggests)

export default  connect(mapStateToProps, mapDispatchToProps)(Suggests)
