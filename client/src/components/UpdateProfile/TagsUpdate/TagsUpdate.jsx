import React from 'react'
import Radium from 'radium'
import styles from './TagsUpdate_styles'
import { MDBInput, MDBBtn, MDBIcon } from 'mdbreact'
import { connect } from 'react-redux'
import { updateInformations } from '../../../actions/profileActions/profileActions'
import { addTag as reqAddTag, removeTag as reqRemoveTag } from '../../../requests/profile'
const Text = require('../../../../languageLocalisation/texts.json')
import { isObjectEmpty } from '../../../utilities/utilities'

class TagsUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTag: '',
      message: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.hadleSubmit.bind(this)
    this.verifyData = this.verifyData.bind(this)
    this.removeTag = this.removeTag.bind(this)
  }

  handleChange (currentTag) {
    this.setState({ currentTag })
  }

  verifyData (currentTag) {
    const errors = {}
    if (!currentTag) {
      errors.tag = 'empty'
    } else {
      for (const tag of this.props.profile.tags) {
        if (tag.tag === currentTag) {
          errors.tag = 'exists'
        }
      }
    }
    return errors
  }

  hadleSubmit (e) {
    const tag = this.state.currentTag.toLowerCase()
    e.preventDefault()
    this.setState({ message: '' })
    const errors = this.verifyData(tag)
    this.setState({ errors })
    if (isObjectEmpty(errors)) {
      const newProfile = Object.assign({}, this.props.profile)
      newProfile.tags = [...newProfile.tags, { tag: tag }]
      this.props.updateProfile(newProfile)
      reqAddTag(tag)
      this.setState({ currentTag: '', message: 'success' })
    }
  }

  removeTag (tag) {
    const newProfile = Object.assign({}, this.props.profile)
    newProfile.tags = newProfile.tags.filter(x => x.tag !== tag)
    this.props.updateProfile(newProfile)
    reqRemoveTag(tag)
  }

  render () {
    const myText = Text[this.props.language]
    const tags = this.props.profile.tags.map((x, i) => {
      return (
        <div key={ i } style={ styles.tag } className="hoverable">
          { x.tag }
          <MDBIcon style={ styles.deleteCross } far icon="times-circle" onClick={ () => this.removeTag(x.tag) } />
        </div>
      )
    })
    return (
      <div style={ styles.container }>
        <form>
          <div>
            <MDBInput type="text" label="Tag" size="md" value={ this.state.currentTag } getValue={ (value) => this.handleChange(value) } />
            <p className="text-center text-danger m-0 small">
              { this.state.errors.tag ? this.state.errors.tag === 'empty' ? myText["need_tag"] : myText["tag_exists"] : '' }
            </p>
          </div>
          <div style={ { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }>
            <MDBBtn className="text-center" type="submit" color="unique" size="sm" onClick={ this.handleSubmit }>{ myText["add_btn"] }</MDBBtn>
            <p className="text-center text-success m-0 small">{ this.state.message ? myText["success_tag"] : '' }</p>
          </div>
        </form>
        <div style={ styles.tagsContainer }>
          { tags }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    language: state.language
  }
}

const mapDispatchToProps = {
  updateProfile: updateInformations
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(TagsUpdate))
