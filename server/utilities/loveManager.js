import { connection } from '../app'

const doesLoveExist = (userId, userTarget) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from love where user_id=? AND user_target=?', [userId, userTarget], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results.length > 0 ? true : false)
      }
    })
  })
}

export const meAboutUser = (userId, userTarget) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from love where user_id=? AND user_target=?', [userId, userTarget], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const userAboutMe = (userId, userTarget) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from love where user_id=? AND user_target=?', [userTarget, userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const createLove = (userId, userTarget, view, like) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO `love` (`id`, `user_id`, `user_target`, `view`, `like`)\
                      VALUES (NULL, ?, ?, ?, ?)", [userId, userTarget, view, like], (err) => {
       if (err) {
         reject(err)
       } else {
         resolve(true)
       }     
    })
  })
}

export const viewUser = async (userId, userTarget) => {
  const exist = await doesLoveExist(userId, userTarget)

  if (!exist) {
    createLove(userId, userTarget, 1, 0)
  } else {
    connection.query("UPDATE `love` SET `view`='1' WHERE `love`.`user_id`=? AND `love`.`user_target`=?", [userId, userTarget])
  }
}

export const dislikeUser = async (userId, userTarget) => {
  const userInfos = await userAboutMe(userId, userTarget)
  connection.query("UPDATE `love` SET `like`='0' WHERE `love`.`user_id`=? AND `love`.`user_target`=?", [userId, userTarget])
  return {
    userSawMe: userInfos.length > 0 && userInfos[0].view,
    iLoveUser: false,
    userLovesMe: userInfos.length > 0 && userInfos[0].like,
    match: false
  }
}

export const likeUser = async (userId, userTarget) => {
  const exist = await doesLoveExist(userId, userTarget)
  const userInfos = await userAboutMe(userId, userTarget)

  if (!exist) {
    await createLove(userId, userTarget, 0, 1)
  } else {
    connection.query("UPDATE `love` SET `like`='1' WHERE `love`.`user_id`=? AND `love`.`user_target`=?", [userId, userTarget])
  }
  return {
    userSawMe: userInfos.length > 0 && userInfos[0].view,
    iLoveUser: true,
    userLovesMe: userInfos.length > 0 && userInfos[0].like,
    match: userInfos.length > 0 && userInfos[0].like
  }
}