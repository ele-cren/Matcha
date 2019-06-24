import React from 'react'
import styles from './Chat_styles'
import Radium from 'radium'
import { isObjectEmpty, getLocaleDate } from '../../utilities/utilities'

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

const getMessagesInfos = (messages) => {
  let lastMessage = {}
  let lastMessageDate = new Date('1970')
  let noRead = 0
  for (const msg of messages) {
    const msgDate = getLocaleDate(msg.message_date)
    if (lastMessageDate - msgDate < 0) {
      lastMessage = msg
      lastMessageDate = msgDate
    }
    if (!msg.sent && !msg.view) {
      noRead++
    }
  }
  return isObjectEmpty(lastMessage) ? { message: 'No messages', empty: true, noRead: noRead } : { ...lastMessage, noRead: noRead }
}

const DisplayMatches = (props) => {
  const displayMatches = props.matches.map((x, i) => {
    const currentUser = x.userInfos.informations.user_id
    const messages = getMessagesWithUser(props.messages, currentUser)
    let lastMessage = getMessagesInfos(messages)
    let message = lastMessage.message
    const messageStyle = lastMessage.empty ? { fontStyle: 'italic' } : lastMessage.view ? {}
                        : lastMessage.from_user === currentUser ? { fontWeight: 'bold' } : {}
    let fullName = x.userInfos.mainInformations.first_name + ' ' + x.userInfos.mainInformations.last_name
    fullName = fullName.length > 30 ? x.userInfos.mainInformations.first_name
                + ' ' + x.userInfos.mainInformations.last_name.charAt(0) + '.' : fullName
    message = message.length > 22 ? message.substring(0, 22) + '...' : message
    return (
      <div key={ i } style={ styles.matchDisplay } onClick={ () => props.openChat(x, messages) } >
        <img src={ x.userInfos.mainPicture } className="rounded-circle" style={ styles.picture } />
        <div style={ styles.messageInfosMatch }>
          <div style={ { fontSize: '12px' } }>
            { fullName }
          </div>
          <div style={ [styles.lastMessage, messageStyle] }>
            { message } { lastMessage.noRead > 0 ? <div style={ styles.countMsg }>{ lastMessage.noRead }</div> : '' }
          </div>
        </div>
      </div>
    )
  })
  return displayMatches
}

export default Radium(DisplayMatches)
