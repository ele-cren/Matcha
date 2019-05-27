import { getLoveInfosFromProfile, getUser } from './loveUtilities'

const updateView = (users, userId) => {
  const newUsers = users.map(x => {
    if (x.userId === userId) {
      x.view = 1
    }
    return x
  })
  return newUsers
}

const addView = (users, newUser) => {
  return [...users, newUser]
}

export const getView = (users, userId, userProfile) => {
  const user = getUser(users, userId)
  let loveInfos
  let newUser
  if (!user) {
    loveInfos = getLoveInfosFromProfile(userProfile)
    newUser = { userId: userId, view: 1, like: 0, userInfos: loveInfos }
  }
  users = user ? updateView(users, userId) : addView(users, newUser)
  return users
}