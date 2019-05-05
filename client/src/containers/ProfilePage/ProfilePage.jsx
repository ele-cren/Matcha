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
        length={2}
        showIndicators={true}
        showControls={ true }
        className="z-depth-1"
        style={ style.carousel }
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                className="d-block"
                src={ this.props.profile.pictures[0].url }
                alt="First slide"
                style={ style.picture }
                />
              </MDBView>
              <MDBCarouselCaption style={ style.caption }>
                <MDBIcon icon="star" />
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
              <img
              className="d-block"
              src={ this.props.profile.pictures[1].url }
              alt="Second slide"
              style={ style.picture }
              />
              </MDBView>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    )
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
