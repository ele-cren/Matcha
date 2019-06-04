import MyCarouselItem from './MyCarouselItem'
import React from 'react'
import { MDBCarousel, MDBCarouselInner } from 'mdbreact'

const MyCarousel = (props) => {
  const styles = props.styles
  const pictures = props.pictures
  return (
    <MDBCarousel
      activeItem={1}
      length={ pictures.length }
      showIndicators={ pictures.length > 1 }
      showControls={ pictures.length > 1 }
      className="z-depth-1"
      style={ styles.carousel }>
      <MDBCarouselInner>
        { pictures.map((x, i) =>
          <MyCarouselItem key={ i } url={ x.url } id={ i + 1 } isMain={ x.main } styles={ styles } />) }
      </MDBCarouselInner>
    </MDBCarousel>
  )
}

export default MyCarousel
