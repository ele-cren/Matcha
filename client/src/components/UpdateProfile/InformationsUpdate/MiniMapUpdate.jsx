import React, { createRef } from 'react'
import L from 'leaflet'
import { getCoordsFromIp } from '../../../requests/geopip'
import { isObjectEmpty } from '../../../utilities/utilities'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { MDBContainer, MDBAlert } from 'mdbreact'

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

class MiniMapUpdate extends React.Component {
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
  }

  componentDidMount () {
    const propsCoords = this.props.lat && this.props.lng ? {
      lat: this.props.lat,
      lng: this.props.lng
    } : null
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setState({
        coords: coords,
        markerPos: propsCoords ? propsCoords : coords,
        locationType: 'geo'
      })
      this.props.updateCoords(propsCoords ? propsCoords.lat : coords.lat, propsCoords ? propsCoords.lng : coords.lng)
    }, () => {
      this.getIpCoords()
    })
  }

  getIpCoords () {
    const propsCoords = this.props.lat && this.props.lng ? {
      lat: this.props.lat,
      lng: this.props.lng
    } : null
    const xhr = getCoordsFromIp(this.props.userIp)
    xhr.onload = () => {
      const coords = {
        lat: xhr.response.lat,
        lng: xhr.response.lon
      }
      this.setState({
        coords: coords,
        markerPos: propsCoords ? propsCoords : coords,
        locationType: 'ip'
      })
      this.props.updateCoords(propsCoords ? propsCoords.lat : coords.lat, propsCoords ? propsCoords.lng : coords.lng)
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
      const pos = marker.leafletElement.getLatLng()
      this.setState({
        markerPos: pos
      })
      this.props.updateCoords(pos.lat, pos.lng)
    }
  }
  
  isSamePosition (position, markerPos) {
    return (position.lat === markerPos.lat && position.lng === markerPos.lng)
  }

  render () {
    const position = [this.state.coords.lat, this.state.coords.lng]
    const isSamePos = this.isSamePosition(this.state.coords, this.state.markerPos)
    const map = !isObjectEmpty(this.state.coords) ? (
      <Map
        className="mt-3"
        onZoomend={ this.updateZoom }
        style={ { height: '300px', width: '80%' } }
        center={ this.state.markerPos }
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
        { this.props.text["start_warning_geo"] }<strong>{ this.props.text["strong_warning_geo"] }</strong>{ this.props.text["end_warning_geo"] }
      </MDBAlert>
    ) : ''
    return (
      <MDBContainer style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
        { alert }
        { map }
      </MDBContainer>
    )
  }
}

export default MiniMapUpdate
