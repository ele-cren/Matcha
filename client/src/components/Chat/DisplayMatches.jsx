import React from 'react'
import styles from './Chat_styles'
import Radium from 'radium'

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
  if (messages.length === 0) {
    return { message: 'No messages', noRead: 0, empty: true }
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
  const displayMatches = props.matches.map((x, i) => {
    const currentUser = x.userInfos.informations.user_id
    let messages = getMessagesWithUser(props.messages, currentUser)
    messages = messages.sort((a, b) => {
      return new Date(a.message_date) - new Date(b.message_date)
    })
    let messagesInfos = getMessagesInfos(messages)
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
          <div style={ { fontSize: '12px' } }>
            { fullName }
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
