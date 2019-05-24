export const getLoveInfosFromProfile = (profile) => {
  let mainPicture
  profile.pictures.map(x => {
    if (x.main) {
      mainPicture = x.url
    }
  })
  return {
    mainInformations: profile.mainInformations,
    informations: profile.informations,
    mainPicture: mainPicture
  }
}

export const getUser = (users, userId) => {
  let user
  for (const aUser of users) {
    if (aUser.userId === userId) {
      user = aUser
      break
    }
  }
  return user
}

export const updateView = (users, userId) => {
  const newUsers = users.map(x => {
    if (x.userId === userId) {
      x.view = 1
    }
    return x
  })
  return newUsers
}

export const addView = (users, newUser) => {
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