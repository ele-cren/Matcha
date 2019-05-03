import React from 'react'
import { connect } from 'react-redux'
import { cleanErrors } from '../actions/errorsActions/errorsActions'
import { confirmUser } from '../actions/userActions/confirmationAction'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardHeader, MDBBtn, MDBContainer, MDBCol } from 'mdbreact'
import { isObjectEmpty } from '../utilities/utilities'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

class ConfirmUser extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.cleanErrors()
    this.props.confirmUser(this.props.match.params.userId)
  }

  render () {
    const color = isObjectEmpty(this.props.errors.errors) ? 'success-color-dark' : 'danger-color-dark'
    const panel = (
      <MDBContainer>
        <MDBCol md="12">
          <MDBCard className="text-center mt-5">
            <MDBCardHeader color={ color }>{ this.props.errors.message }</MDBCardHeader>
            <MDBCardBody>
              <MDBCardTitle>{ this.props.errors.errors.user ? this.props.errors.errors.user : 'You can now Log In' }</MDBCardTitle>
              <Link to='/login' style={ { color: 'black' } }>
                <MDBBtn color={ null } size="md">
                  Log In
                </MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBContainer>
    )
    return this.props.user.fetching ? <Loader /> : panel
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    user: state.user
  }
}

const mapDispatchToProps = {
  cleanErrors: cleanErrors,
  confirmUser: confirmUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUser)
