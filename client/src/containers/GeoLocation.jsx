import React, { createRef } from 'react'
import L from 'leaflet'
import { connect } from 'react-redux'
import { getCoordsFromIp } from '../requests/geopip'
import { isObjectEmpty } from '../utilities/utilities'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { MDBCol, MDBContainer, MDBAlert, MDBBtn } from 'mdbreact'
import { updateInformations } from '../actions/profileActions/profileActions'
import { updateInformations as updateInformationsRequest } from '../requests/profile'
const Text = require('../../languageLocalisation/texts.json')

const homeIcon = L.icon({
  iconUrl: 'https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_23-512.png',
  iconSize: [30, 35],
  iconAnchor: [15, 30],
  popupAnchor: [-3, -76]
})

const posIcon = L.icon({
  iconUrl: 'https://png.pngtree.com/svg/20170505/7b67d2699c.svg',
  iconSize: [45, 50],
  iconAnchor: [23, 45],
  popupAnchor: [-3, -76]
})

class GeoLocation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coords: {},
      markerPos: {},
      zoom: 10,
      locationType: 'geo'
    }
    this.refmarker = createRef()
    this.refmap = createRef()
    this.updatePosition = this.updatePosition.bind(this)
    this.updateZoom = this.updateZoom.bind(this)
    this.getIpCoords = this.getIpCoords.bind(this)
    this.saveProfilePosition = this.saveProfilePosition.bind(this)
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setState({
        coords: coords,
        markerPos: coords,
        locationType: 'geo'
      })
    }, () => {
      this.getIpCoords()
    })
  }

  getIpCoords () {
    const xhr = getCoordsFromIp(this.props.user.user.ip)
    xhr.onload = () => {
      const coords = {
        lat: xhr.response.lat,
        lng: xhr.response.lon
      }
      this.setState({
        coords: coords,
        markerPos: coords,
        locationType: 'ip'
      })
    }
  }

  updateZoom () {
    this.setState({
      zoom: this.refmap.current.viewport.zoom
    })
  }

  updatePosition () {
    const marker = this.refmarker.current
    if (marker != null) {
      this.setState({
        markerPos: marker.leafletElement.getLatLng()
      })
    }
  }

  saveProfilePosition () {
    const newProfile = Object.assign({}, this.props.profile)
    newProfile.informations.latitude = this.state.markerPos.lat
    newProfile.informations.longitude = this.state.markerPos.lng
    this.props.updateProfile(newProfile)
    updateInformationsRequest(newProfile.informations)
  }

  isSamePosition (position, markerPos) {
    return (position.lat === markerPos.lat && position.lng === markerPos.lng)
  }

  render () {
    const myText = Text[this.props.language]
    const position = [this.state.coords.lat, this.state.coords.lng]
    const isSamePos = this.isSamePosition(this.state.coords, this.state.markerPos)
    const map = !isObjectEmpty(this.state.coords) ? (
      <Map
        className="mt-3"
        onZoomend={ this.updateZoom }
        style={ { height: '500px', width: '100%' } }
        center={position}
        zoom={ this.state.zoom }
        ref={ this.refmap }>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={ this.state.markerPos }
          draggable={ true }
          onDragend={ this.updatePosition }
          icon={ posIcon }
          zIndexOffset={ 10 }
          ref={ this.refmarker }>
        </Marker>
        { isSamePos ? '' : <Marker position={ position } icon={ homeIcon }></Marker> }
      </Map>
    ) : ''
    const alert = this.state.locationType === 'ip' ? (
      <MDBAlert color="warning" dismiss className="mt-3">
        { myText["start_warning_geo"] }<strong>{ myText["strong_warning_geo"] }</strong>{ myText["end_warning_geo"] }
      </MDBAlert>
    ) : ''
    return (
      <MDBContainer>
        { alert }
        <MDBCol md="12" className="text-center">
          { map }
          <MDBBtn onClick={ this.saveProfilePosition } color="unique" className="mt-3">{ myText["save_button"] }</MDBBtn>
        </MDBCol>
      </MDBContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    user: state.user,
    language: state.language
  }
}

const mapDispatchToProps = {
  updateProfile: updateInformations
}

GeoLocation = connect(mapStateToProps, mapDispatchToProps)(GeoLocation)

export default GeoLocation