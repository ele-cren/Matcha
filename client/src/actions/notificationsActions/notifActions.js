import { ADD, DELETE, UPDATE } from './notifConsts'

export const getNotifications = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/notifications')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        for (const notif of xhr.response.notifications) {
          dispatch(addNotification(notif))
        }
      }
    }
  }
}

export const addNotification = (notif) => {
  return {
    type: ADD,
    payload: notif
  }
}

export const deleteNotif = (notifId) => {
  return {
    type: DELETE,
    payload: notifId
  }
}

export const updateNotif = (notifId) => {
  return {
    type: UPDATE,
    payload: notifId
  }
}