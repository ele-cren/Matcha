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