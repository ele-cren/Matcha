import uuidv4 from 'uuid/v4'

export const getNotif = (type, userId, userTarget, userInfos) => {
  return {
    uuid: uuidv4(),
    type: type,
    user_id: userId,
    from_user: userTarget,
    view: 0,
    userInfos: userInfos
  }
}