import { connection } from '../app'

export const getUserFromUsername = username => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM `users` WHERE username=" + `'${username}'`, (err, results, field) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(results)
      }
      resolve(null)
    })
  })
}

export const getUserFromEmail = email => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM `users` WHERE email=" + `'${email}'`, (err, results, field) => {
      if (err) {
        reject(err)
      }
      if (results.length > 0) {
        resolve(results)
      }
      resolve(null)
    })
  })
}