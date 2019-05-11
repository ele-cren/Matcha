import { connection } from '../app'

export const updateIp = (userId, ip) => {
  connection.query('UPDATE users SET ip = ? WHERE users.uuid = ?', [ip, userId])
}