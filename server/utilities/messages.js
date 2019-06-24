import { connection } from '../app'

export const getMessagesISent = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM messages WHERE from_user = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const getMessagesIReceived = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM messages WHERE to_user = ?', [userId], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const viewMessages = (fromUser, toUser) => {
  connection.query('UPDATE messages SET view = 1 WHERE from_user = ? AND to_user = ?', [fromUser, toUser])
}

export const sendMessage = (message) => {
  const arrayData = [
    message.from_user,
    message.to_user,
    message.message,
    message.view
  ]
  connection.query('INSERT INTO messages (id, from_user, to_user, message, message_date, view)\
                    VALUES (NULL, ?, ?, ?, now(), ?)', arrayData)
}