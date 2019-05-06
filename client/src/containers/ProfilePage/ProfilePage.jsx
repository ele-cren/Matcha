import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../../actions/errorsActions/errorsActions'
import { MDBCarousel, MDBIcon, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer, MDBCarouselCaption } from
"mdbreact"
import Loader from '../../components/Loader'
import * as style from './ProfilePage_style'

class ProfilePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPageLoading: true,
      isLoadingNeeded: false
    }
  }

  componentDidMount () {
    if (!this.props.profile.fetching) {
      this.setState({
        isPageLoading: false
      })
    } else {
      this.setState({
        isLoadingNeeded: true
      })
      setTimeout(() => {
        this.setState({
          isPageLoading: false
        })
      }, 700)
    }
  }
  

  render () {
    return (
      <MDBContainer style={ style.container } className="mt-3" >
        <MDBCarousel
          activeItem={1}
          length={ this.props.profile.pictures.length }
          showIndicators={true}
          showControls={ true }
          className="z-depth-1"
          style={ style.carousel }
        >
          <MDBCarouselInner>
            { this.props.profile.pictures.map((x, i) => <MyCarouselItem key={ i } url={ x.url } id={ i + 1 } isMain={ x.main } />) }
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    )
  }
}

const MyCarouselItem = (props) => {
  return (
    <MDBCarouselItem itemId={ props.id }>
      <MDBView>
        <img
        className="d-block"
        src={ props.url }
        alt="First slide"
        style={ style.picture }
        />
      </MDBView>
      { props.isMain ? 
        <MDBCarouselCaption style={ style.caption }>
          <MDBIcon icon="star" />
        </MDBCarouselCaption> : '' }
    </MDBCarouselItem>
  )
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
