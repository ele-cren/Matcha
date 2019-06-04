import { MDBIcon } from 'mdbreact'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import Radium from 'radium'

const BanIcons = (props) => {
  const myText = props.text
  const styles = props.styles
  const ban = props.ban
  const profile = props.profile
  const reportIcon = (
    <React.Fragment>
      <MDBIcon
        data-tip data-for='angry'
        className="mt-2 ml-2"
        icon="angry"
        onClick={ () => props.reportUser() }
        style={ styles.banIcon } />
      <ReactTooltip id='angry' effect='solid' place="left">
        <span>{ myText["angry_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
  )
  const blockIcon = (
    <React.Fragment>
      <MDBIcon
        data-tip data-for='block'
        className="mt-2 ml-2"
        icon="ban"
        onClick={ () => props.blockUser(1) }
        style={ styles.banIcon } />
      <ReactTooltip id='block' effect='solid' place="left">
        <span>{ myText["block_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
  )
  const unblockIcon = (
    <React.Fragment>
      <MDBIcon
        data-tip data-for='unblock'
        className="mt-2 ml-2"
        far icon="check-circle"
        onClick={ () => props.blockUser(0) }
        style={ styles.banIcon } />
      <ReactTooltip id='unblock' effect='solid' place="left">
        <span>{ myText["unblock_popup"] }</span>
      </ReactTooltip>
    </React.Fragment>
  )
  const banIcons = (
    <div style={ styles.banIcons }>
      { ban && ban.reportedUsers && ban.reportedUsers.includes(profile.informations.user_id) ? '' : reportIcon }
      { ban && ban.blockedUsers && ban.blockedUsers.includes(profile.informations.user_id) ? unblockIcon : blockIcon }
    </div>
  )
  return banIcons
}

export default Radium(BanIcons)
