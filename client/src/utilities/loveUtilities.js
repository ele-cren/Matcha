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