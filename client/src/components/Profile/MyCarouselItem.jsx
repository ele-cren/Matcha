import React from 'react'
import { 
  MDBIcon,
  MDBCarouselItem,
  MDBView,
  MDBCarouselCaption,
} from 'mdbreact'

const MyCarouselItem = (props) => {
  return (
    <MDBCarouselItem itemId={ props.id }>
      <MDBView>
        <img
        className="d-block"
        src={ props.url }
        alt="First slide"
        style={ props.styles.picture }
        />
      </MDBView>
      { props.isMain ? 
        <MDBCarouselCaption style={ props.styles.caption }>
          <MDBIcon icon="star" />
        </MDBCarouselCaption> : '' }
    </MDBCarouselItem>
  )
}

export default MyCarouselItem
