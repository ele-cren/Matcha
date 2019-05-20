import { connection } from '../app'
import { getLoveUserInfos } from '../utilities/userInfos'

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

export const getMeAboutUserEntries = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from love where user_id=?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const getUserAboutMeEntries = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from love where user_target=?', [userId], (err, results) => {
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
  connection.query("UPDATE `love` SET `like`='0' WHERE `love`.`user_id`=? AND `love`.`user_target`=?", [userId, userTarget])
}

export const likeUser = async (userId, userTarget) => {
  const exist = await doesLoveExist(userId, userTarget)

  if (!exist) {
    await createLove(userId, userTarget, 0, 1)
  } else {
    connection.query("UPDATE `love` SET `like`='1' WHERE `love`.`user_id`=? AND `love`.`user_target`=?", [userId, userTarget])
  }
}

export const getMeAboutUsersInfos = async (userId) => {
  const entries = await getMeAboutUserEntries(userId)
  let users = []
  for (const entry of entries) {
    const userInfos = await getLoveUserInfos(entry.user_target)
    users = [
      ...users,
      {
        user_id: entry.user_target,
        view: entry.view,
        like: entry.like,
        userInfos: userInfos
      }
    ]
  }
  return users
}

export const getUsersAboutMeInfos = async (userId) => {
  const entries = await getUserAboutMeEntries(userId)
  let users = []
  for (const entry of entries) {
    const userInfos = await getLoveUserInfos(entry.user_id)
    users = [
      ...users,
      {
        user_id: entry.user_id,
        view: entry.view,
        like: entry.like,
        userInfos: userInfos
      }
    ]
  }
  return users
}