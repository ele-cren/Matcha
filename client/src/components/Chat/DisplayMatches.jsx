import React from 'react'
import styles from './Chat_styles'
import Radium from 'radium'
import ReactTooltip from 'react-tooltip'
import { getLocaleDate, formatDate } from '../../utilities/utilities'
import { MDBIcon } from 'mdbreact'
const Text = require('../../../languageLocalisation/texts.json')

const getMessagesWithUser = (messages, userId) => {
  let newMessages = []
  messages.messagesISent.forEach(x => {
    if (x.to_user === userId) {
      x.sent = 1
      newMessages = [...newMessages, x]
    }
  })
  messages.messagesIReceived.forEach(x => {
    if (x.from_user === userId) {
      newMessages = [...newMessages, x]
    }
  })
  newMessages = newMessages.filter(Boolean)
  return newMessages
}

const getMessagesInfos = (messages, text) => {
  if (messages.length === 0) {
    return { message: text["no_messages"], noRead: 0, empty: true }
  }
  const lastMessage = messages[messages.length - 1]
  let noRead = 0
  for (const msg of messages) {
    if (!msg.sent && !msg.view) {
      noRead++
    }
  }
  return {
    message: lastMessage.message,
    noRead: noRead,
    bold: !lastMessage.sent && !lastMessage.view
  }
}

const DisplayMatches = (props) => {
  const myText = Text[props.language]
  const displayMatches = props.matches.map((x, i) => {
    const currentUser = x.userInfos.informations.user_id
    const lastDisconnect = getLocaleDate(x.userInfos.mainInformations.last_disconnect)
    const formatedDate = formatDate(lastDisconnect, props.language)
    const dotStyle = {
      color: x.userInfos.mainInformations.online ? '#81ad64' : '#ad1838',
      fontSize: '8px',
      marginLeft: 5
    }
    const dotOnline = x.userInfos.mainInformations.online ? <MDBIcon icon="circle" style={ dotStyle } /> : (
      <React.Fragment>
        <MDBIcon data-tip data-for={ 'online' + i } icon="circle" style={ dotStyle } />
        <ReactTooltip id={ 'online' + i } effect='solid' place="left">
          <span>{ myText["offline_since"] }</span><br />
          <span>{ formatedDate }</span>
        </ReactTooltip>
      </React.Fragment>
    )
    let messages = getMessagesWithUser(props.messages, currentUser)
    messages = messages.sort((a, b) => {
      return new Date(a.message_date) - new Date(b.message_date)
    })
    let messagesInfos = getMessagesInfos(messages, myText)
    let message = messagesInfos.message
    const messageStyle = messagesInfos.empty ? { fontStyle: 'italic' } : messagesInfos.bold ? { fontWeight: 'bold' } : {}
    let fullName = x.userInfos.mainInformations.first_name + ' ' + x.userInfos.mainInformations.last_name
    fullName = fullName.length > 30 ? x.userInfos.mainInformations.first_name
                + ' ' + x.userInfos.mainInformations.last_name.charAt(0) + '.' : fullName
    message = message.length > 22 ? message.substring(0, 22) + '...' : message
    return (
      <div key={ i } style={ styles.matchDisplay } onClick={ () => props.openChat(x, messages) } >
        <img src={ x.userInfos.mainPicture } className="rounded-circle" style={ styles.picture } />
        <div style={ styles.messageInfosMatch }>
          <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
            <div style={ { fontSize: '12px' } }>
              { fullName }
            </div>
            { dotOnline }
          </div>
          <div style={ [styles.lastMessage, messageStyle] }>
            { message } { messagesInfos.noRead > 0 ? <div style={ styles.countMsg }>{ messagesInfos.noRead }</div> : '' }
          </div>
        </div>
      </div>
    )
  })
  return displayMatches
}

export default Radium(DisplayMatches)
