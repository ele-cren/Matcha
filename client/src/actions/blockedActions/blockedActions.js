export const ADD = 'blocked:add'
export const REMOVE = 'blocked:remove'
export const GET = 'blocked:get'

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

export const getBlocked = () => {
  return dispatch => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/api/blocked')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = () => {
      console.log(xhr.reponse)
      if (xhr.status === 200) {
        xhr.response.blockedUsers.forEach(x => {
          dispatch(blockUser(x.blocked_user))
        })
      }
    }
  }
}