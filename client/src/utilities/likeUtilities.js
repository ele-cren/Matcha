import { getUser, getLoveInfosFromProfile } from './loveUtilities'

const updateLike = (users, userId, value) => {
  const newUsers = users.map(x => {
    if (x.userId === userId) {
      x.like = value
    }
    return x
  })
  return newUsers
}

const addLike = (users, newUser) => {
  return [...users, newUser]
}

export const getLike = (users, userId, userProfile, value = 1) => {
  const user = getUser(users, userId)
  let loveInfos
  let newUser
  if (!user) {
    loveInfos = getLoveInfosFromProfile(userProfile)
    newUser = { userId: userId, view: 0, like: 1, userInfos: loveInfos }
  }
  users = user ? updateLike(users, userId, value) : addLike(users, newUser)
  return users
}