import getDistance from 'geolib/es/getDistance'

export const addDistanceToProfiles = (myProfile, profiles) => {
  const newProfiles = profiles.map(x => {
    if (!x.informations.latitude || !x.informations.longitude) {
      x.distance = 10000
    } else {
      x.distance = parseInt(getDistance({
        latitude: myProfile.informations.latitude,
        longitude: myProfile.informations.longitude
      }, {
        latitude: x.informations.latitude,
        longitude: x.informations.longitude
      }) / 1000)
    }
    return x
  })
  return newProfiles
}

export const addMatchingTagsToProfiles = (myProfile, profiles) => {
  const myTags = myProfile.tags.map(x => x.tag)
  const newProfiles = profiles.map(x => {
    let matchingTags = 0
    x.tags.forEach(y => {
      if (myTags.includes(y.tag)) {
        matchingTags++
      }
    })
    x.matchingTags = matchingTags
    return x
  })
  return newProfiles
}