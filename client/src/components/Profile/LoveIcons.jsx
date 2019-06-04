import { MDBIcon } from 'mdbreact'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import Radium from 'radium'

const LoveIcons = (props) => {
  const styles = props.styles
  const myText = props.text
  const eyeIcon = (
    <React.Fragment>
      <MDBIcon data-tip data-for='eye' className="mt-2 ml-2" far icon="eye" />
      <ReactTooltip id='eye' effect='solid' place="bottom">
        <span>{ myText["eye_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
  )
  const heartIcon = (
    <React.Fragment>
      <MDBIcon data-tip data-for='heart' className="mt-2 ml-2" far icon="heart" />
      <ReactTooltip id='heart' effect='solid' place="right">
        <span>{ myText["like_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
  )
  const fullHeartIcon = (
    <React.Fragment>
    <MDBIcon data-tip data-for='fullHeart' className="mt-2 ml-2" icon="heart" />
    <ReactTooltip id='fullHeart' effect='solid' place="rihgt">
      <span>{ myText["match_popup"] }</span>
    </ReactTooltip>
  </React.Fragment>
  )
  const loveIcons = props.loveInfos ? (
    <div style={ styles.loveIcons }>
      { props.loveInfos.userAboutMe.view ? eyeIcon : ''}
      { props.loveInfos.userAboutMe.like ? props.loveInfos.meAboutUser.like ? fullHeartIcon : heartIcon : '' }
    </div>
  ) : ''
  return loveIcons
}

export default Radium(LoveIcons)
