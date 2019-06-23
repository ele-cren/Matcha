import React from 'react'
import styles from './Chat_styles'
import Radium from 'radium'
import { isObjectEmpty } from '../../utilities/utilities'

const getMessagesWithUser = (messages, userId) => {
  let messagesISent = []
  let messagesIReceived = []
  messagesISent = messages.messagesISent.map(x => {
    if (x.to_user === userId) {
      return x
    }
  })
  messagesIReceived = messages.messagesIReceived.map(x => {
    if (x.from_user === userId) {
      return x
    }
  })
  messagesIReceived = messagesIReceived.filter(Boolean)
  messagesISent = messagesISent.filter(Boolean)
  return {
    messagesISent: messagesISent,
    messagesIReceived: messagesIReceived
  }
}

const getLastMessage = (messages) => {
  let lastMessage = {}
  let lastMessageDate = new Date('1970')
  let noRead = 0
  for (const msg of messages.messagesISent) {
    const msgDate = new Date(msg.message_date)
    if (lastMessageDate - msgDate < 0) {
      lastMessage = msg
      lastMessageDate = msgDate
    }
  }
  for (const msg of messages.messagesIReceived) {
    const msgDate = new Date(msg.message_date)
    if (lastMessageDate - msgDate < 0) {
      lastMessage = msg
      lastMessageDate = msgDate
    }
    if (!msg.view) {
      noRead++
    }
  }
  return isObjectEmpty(lastMessage) ? { message: 'No messages', empty: true, noRead: noRead } : { ...lastMessage, noRead: noRead }
}

const DisplayMatches = (props) => {
  const displayMatches = props.matches.map((x, i) => {
    const currentUser = x.userInfos.informations.user_id
    const messages = getMessagesWithUser(props.messages, currentUser)
    let lastMessage = getLastMessage(messages)
    let message = lastMessage.message
    const messageStyle = lastMessage.empty ? { fontStyle: 'italic' } : lastMessage.view ? {}
                        : lastMessage.from_user === currentUser ? { fontWeight: 'bold' } : {}
    let fullName = x.userInfos.mainInformations.first_name + ' ' + x.userInfos.mainInformations.last_name
    fullName = fullName.length > 30 ? x.userInfos.mainInformations.first_name
                + ' ' + x.userInfos.mainInformations.last_name.charAt(0) + '.' : fullName
    message = message.length > 22 ? message.substring(0, 22) + '...' : message
    return (
      <div key={ i } style={ styles.matchDisplay } >
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
