import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../../actions/errorsActions/errorsActions'
import { MDBCarousel, MDBCardText, MDBBtn, MDBIcon, MDBCarouselInner, MDBCarouselItem, MDBCardTitle, MDBView, MDBCardBody, MDBContainer, MDBCarouselCaption, MDBCard, MDBCol } from
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
  
  getGenre (genreNum) {
    switch (genreNum) {
      case 1:
        return 'Male'
      case 2:
        return 'Female'
      default:
        return 'Male'
    }
  }

  getOrientation (orientationNum) {
    switch (orientationNum) {
      case 1:
        return 'Straight'
      case 2:
        return 'Bisexual'
      case 3:
        return 'Lesbian'
      case 4:
        return 'Gay'
      default:
        return 'Bisexual'
    }
  }

  render () {
    return (
      <MDBContainer style={ style.container }>
        <MDBCol md="8">
          <MDBCard style={ style.card }>
            <MDBCarousel
              activeItem={1}
              length={ this.props.profile.pictures.length }
              showIndicators={true}
              showControls={ true }
              className="z-depth-1"
              style={ style.carousel }>
              <MDBCarouselInner>
                { this.props.profile.pictures.map((x, i) => <MyCarouselItem key={ i } url={ x.url } id={ i + 1 } isMain={ x.main } />) }
              </MDBCarouselInner>
            </MDBCarousel>
            <h2 className='mt-3'>{ this.props.profile.mainInformations.first_name + ' ' + this.props.profile.mainInformations.last_name }</h2>
            <MDBCardBody className="text-center">
              <MDBCardText style={ style.bio }>
                { this.props.profile.informations.bio }
              </MDBCardText>
              <div style={ style.personalInfos }>
                <p style={ style.genre }>{ this.getGenre(this.props.profile.informations.genre) }</p>
                <p style={ style.orientation }>{ this.getOrientation(this.props.profile.informations.orientation) }</p>
              </div>
              <MDBBtn color="elegant" className="mt-4">Edit</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
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
