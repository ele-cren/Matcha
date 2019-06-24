export const GET = 'messages:get'
export const ADD_SENT = 'messages:add_sent'
export const ADD_RECEIVED = 'messages:add_received'
export const VIEW = 'messages:view'

/*
  message = {
    from_user:
    to_user:
    view:
    message_date:
  }
*/

export const viewMessages = (messages) => {
  return {
    type: VIEW,
    payload: messages
  }
}

export const sendMessage = (message) => {
  return {
    type: ADD_SENT,
    payload: message
  }
}

export const receiveMessage = (message) => {
  return {
    type: ADD_RECEIVED,
    payload: message
  }
}

export const getMessagesRequest = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/messages')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        dispatch(getMessages(xhr.response))
      }
    }
  }
}

const getMessages = (messages) => {
  return {
    type: GET,
    payload: messages
  }
}