export const ADD = 'ban:add'
export const REMOVE = 'ban:remove'
export const GET = 'ban:get'
export const REPORT = 'ban:report'

export const blockUser = (blockedUser) => {
  return {
    type: ADD,
    payload: blockedUser
  }
}

export const removeBlocked = (blockedUser) => {
  return {
    type: REMOVE,
    payload: blockedUser
  }
}

export const reportUser = (reportedUser) => {
  return {
    type: REPORT,
    payload: reportedUser
  }
}

export const getBlocked = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/ban/block')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        xhr.response.blockedUsers.forEach(x => {
          dispatch(blockUser(x.blocked_user))
        })
      }
    }
  }
}

export const getReported = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/ban/report')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      if (xhr.status === 200) {
        xhr.response.reportedUsers.forEach(x => {
          dispatch(reportUser(x.reported_user))
        })
      }
    }
  }
}