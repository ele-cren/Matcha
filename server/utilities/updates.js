import { connection } from '../app'

export const updateIp = (userId, ip) => {
  connection.query('UPDATE users SET ip = ? WHERE users.uuid = ?', [ip, userId])
}

export const updateLastActive = (userId) => {
  const date = new Date(Date.now())
  connection.query('UPDATE users SET last_active = ? WHERE users.uuid = ?', [date, userId])
}