import React from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { cleanErrors } from '../../actions/errorsActions/errorsActions'
import { MDBCarousel, MDBCardText, MDBBtn, MDBIcon, MDBCarouselInner, MDBCarouselItem, MDBCardTitle, MDBView, MDBCardBody, MDBContainer, MDBCarouselCaption, MDBCard, MDBCol } from
"mdbreact"
import Loader from '../../components/Loader'
import styles from './ProfilePage_styles'
import MatchaNav from '../../components/MatchaNav'

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
        return ['Male', '#a1c9ed']
      case 2:
        return ['Female', '#cea1ea']
      default:
        return ['Male', '#a1c9ed']
    }
  }

  getOrientation (orientationNum) {
    switch (orientationNum) {
      case 1:
        return ['Straight', '#e0d0b8']
      case 2:
        return ['Bisexual', '#a19ee9']
      case 3:
        return ['Lesbian', '#cea1ea']
      case 4:
        return ['Gay', '#a1c9ed']
      default:
        return ['Bisexual', '#a19ee9']
    }
  }

  render () {
    const genre = this.getGenre(this.props.profile.informations.genre)
    const orientation = this.getOrientation(this.props.profile.informations.orientation)
    return (
      <React.Fragment>
        <MatchaNav />
        <MDBContainer style={ styles.container }>
          <MDBCol md="8">
            <MDBCard style={ styles.card }>
              <MDBCarousel
                activeItem={1}
                length={ this.props.profile.pictures.length }
                showIndicators={true}
                showControls={ true }
                className="z-depth-1"
                style={ styles.carousel }>
                <MDBCarouselInner>
                  { this.props.profile.pictures.map((x, i) =>
                    <MyCarouselItem key={ i } url={ x.url } id={ i + 1 } isMain={ x.main } />) }
                </MDBCarouselInner>
              </MDBCarousel>
              <h2 className='mt-3'>
                { this.props.profile.mainInformations.first_name + ' ' + this.props.profile.mainInformations.last_name }
              </h2>
              <MDBCardBody className="text-center">
                <MDBCardText style={ styles.bio }>
                  { this.props.profile.informations.bio }
                </MDBCardText>
                <div style={ styles.personalInfos }>
                  <p
                    className="shadow-box-example hoverable"
                    style={ [styles.genre, { backgroundColor: genre[1] }] }>
                    { genre[0] }
                  </p>
                  <p
                    className="shadow-box-example hoverable"
                    style={ [styles.orientation, { backgroundColor: orientation[1] }] }>
                    { orientation[0] }
                  </p>
                </div>
                <div style={ styles.tagsContainer }>
                  { this.props.profile.tags.map((x, i) =>
                      <p key={ i } className="shadow-box-example hoverable" style={ styles.tag }>{ x.tag }</p>) }
                </div>
                <MDBBtn color="elegant" className="mt-4"><Link to='profile/update'>Edit</Link></MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </React.Fragment>
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
        style={ styles.picture }
        />
      </MDBView>
      { props.isMain ? 
        <MDBCarouselCaption style={ styles.caption }>
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

ProfilePage = Radium(ProfilePage)

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
