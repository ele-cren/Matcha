import { connection } from '../app'

export const updateIp = (userId, ip) => {
  connection.query('UPDATE users SET ip = ? WHERE users.uuid = ?', [ip, userId])
}

export const updateScore = (userId, score) => {
  connection.query('SELECT score from informations where user_id=?', [userId], (err, res) => {
    if (!err) {
      const newScore = res[0].score + score
      connection.query("UPDATE `informations` SET `score` = ? WHERE `informations`.`user_id` = ?", [newScore, userId])
    }
  })
}

export const addSession = (userId, socketId) => {
  connection.query("INSERT INTO `sessions` (`id`, `user_id`, `socket_id`) VALUES (NULL, ?, ?)", [userId, socketId])
  connection.query("UPDATE `users` SET `online` = '1' WHERE `users`.`uuid` = ?", [userId])
}

export const updateLastDisconnect = (userId) => {
  connection.query("UPDATE `users` SET `last_disconnect` = now() WHERE `users`.`uuid` = ?", [userId])
}

export const removeSession = (userId, socketId) => {
  connection.query("DELETE FROM `sessions` WHERE `sessions`.`socket_id` = ?", [socketId], (err, res) => {
    if (!err) {
      connection.query("SELECT * FROM sessions WHERE user_id = ?", [userId], (err, res) => {
        if (!err && res.length === 0) {
          connection.query("UPDATE `users` SET `online` = '0' WHERE `users`.`uuid` = ?", [userId])
        }
      })
    }
  })
}