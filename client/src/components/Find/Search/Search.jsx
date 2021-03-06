import React from 'react'
import Radium from 'radium'
import styles from '../Find_styles'
import ProfileCard from '../../ProfileCard/ProfileCard'
import { connect } from 'react-redux'
import { MDBIcon, MDBContainer, MDBCol } from 'mdbreact'
import { getProfiles as getProfilesReq } from '../../../requests/search'
import { addDistanceToProfiles, addMatchingTagsToProfiles } from '../../../utilities/searchUtils'
import SearchFilters from './SearchFilters'
import { updateSearchOptions, saveSearched, selectProfile } from '../../../actions/searchActions'
import { socket } from '../../../containers/App'
 
class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: [],
      fetching: false,
      order: -1
    }
    this.getProfiles = this.getProfiles.bind(this)
    this.filterDistance = this.filterDistance.bind(this)
    this.filterTags = this.filterTags.bind(this)
    this.filterBlocked = this.filterBlocked.bind(this)
    this.search = this.search.bind(this)
    this.selectOrder = this.selectOrder.bind(this)
    this.setProfile = this.setProfile.bind(this)
    this.applyFilters = this.applyFilters.bind(this)
    this.updateConnect = this.updateConnect.bind(this)
    this.updateDisconnect = this.updateDisconnect.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    if (this.props.search.lastSearched.length > 0) {
      let profiles = [].concat(this.props.search.lastSearched)
      profiles = this.applyFilters(profiles)
      this.setState({ profiles: profiles })
    } else {
      this.getProfiles ()
    }
    socket.on('user connected', this.updateConnect)
    socket.on('user disconnected', this.updateDisconnect)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  
  updateConnect (userId) {
    if (this._isMounted) {
      const profiles = [].concat(this.state.profiles)
      for (const profile of profiles) {
        if (userId === profile.informations.user_id) {
          profile.mainInformations.online = 1
        }
      }
      this.setState({ profiles })
    }
  }

  updateDisconnect (userId) {
    if (this._isMounted) {
      const profiles = [].concat(this.state.profiles)
      for (const profile of profiles) {
        if (userId === profile.informations.user_id) {
          profile.mainInformations.online = 0
          profile.mainInformations.last_disconnect = getUtcDate()
        }
      }
      this.setState({ profiles })
    }
  }

  setProfile (profile) {
    this.props.selectProfile(profile)
  }

  search (data) {
    const opts = Object.assign(this.props.search.searchOpts, data)
    this.props.updateOptions(opts)
    this.setState({ profiles: [] })
    this.getProfiles(true)
  }

  sortFilter (order, profiles) {
    switch (order) {
      case -1:
        return profiles
      case 0:
        return profiles.sort((a, b) => a.informations.age - b.informations.age)
      case 1:
        return profiles.sort((a, b) => a.distance - b.distance)
      case 2:
        return profiles.sort((a, b) => a.matchingTags - b.matchingTags)
      case 3:
        return profiles.sort((a, b) => a.informations.score - b.informations.score)
      default:
        return profiles
    }
  }

  selectOrder (order) {
    if (order !== this.state.order) {
      this.setState({ order: order })
      let profiles = [].concat(this.state.profiles)
      profiles = this.sortFilter(order, profiles)
      this.setState({ profiles: profiles })
      this.props.saveSearched(profiles)
    }
  }

  getProfiles (reset) {
    this.setState({ fetching: true })
    const xhr = getProfilesReq({
      type: 'search',
      gender: this.props.search.searchOpts.gender,
      age: this.props.search.searchOpts.age,
      score: this.props.search.searchOpts.score,
      online: this.props.search.searchOpts.online,
      search: this.props.search.searchOpts.search,
    }, reset ? 0 : this.state.profiles.length)
    xhr.onload = () => {
      if (this._isMounted) {
        let profiles = addDistanceToProfiles(this.props.profile, xhr.response.userProfiles)
        profiles = addMatchingTagsToProfiles(this.props.profile, profiles)
        profiles = this.state.profiles.concat(profiles)
        profiles = this.applyFilters(profiles)
        this.setState({
          fetching: false,
          profiles: profiles
        })
        this.props.saveSearched(profiles)
      }
    }
  }

  applyFilters (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = this.sortFilter(this.state.order, newProfiles)
    newProfiles = this.filterDistance(newProfiles)
    newProfiles = this.filterTags(newProfiles)
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

  filterTags (profiles) {
    let newProfiles = [].concat(profiles)
    newProfiles = newProfiles.map(x => {
      x.noDisplay = x.matchingTags < this.props.search.searchOpts.tags[0]
                    || x.matchingTags > this.props.search.searchOpts.tags[1] ? 1 : x.noDisplay
      return x
    })
    return newProfiles
  }

  filterDistance (profiles) {
    const distance = this.props.search.searchOpts.distance
    let newProfiles = [].concat(profiles)
    if (distance[1] < 500) {
      newProfiles = newProfiles.map(x => {
        x.noDisplay = x.distance < distance[0] || x.distance > distance[1] ? 1 : 0
        return x
      })
    }
    return newProfiles
  }

  render () {
    const spinner = (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
    let profiles = this.state.profiles.map((x, i) => {
      return !x.noDisplay ? (
        <ProfileCard key={ i } profile={ x } selectProfile={ this.setProfile }  />
      ) : ''
    })
    profiles = profiles.filter(Boolean)
    return (
      <MDBContainer>
        <MDBCol md="12">
          <SearchFilters searchProfiles={ this.search } order={ this.state.order } selectOrder={ this.selectOrder } />
          <div style={ styles.loadingContainer }>
            { this.state.fetching && profiles.length === 0 ? spinner : '' }
          </div>
          <div style={ styles.container }>
            { profiles.length > 0 ? profiles : '' }
            <div style={ styles.addContainer }>
              { this.state.fetching && profiles.length > 0 ? spinner :
                profiles.length > 0 ? (
                <div style={ styles.addButton } onClick={ () => this.getProfiles(false) }><MDBIcon icon="plus" /></div>
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
    search: state.search,
    profile: state.profile,
    ban: state.ban
  }
}

const mapDispatchToProps = {
  updateOptions: updateSearchOptions,
  saveSearched: saveSearched,
  selectProfile: selectProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(Search))
