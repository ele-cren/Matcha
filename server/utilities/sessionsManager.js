import { connection } from '../app'

export const deleteSession = (userId, localIp) => {
  connection.query("DELETE FROM sessions WHERE user_id=? AND local_ip=?", [userId, localIp])
}

export const deleteSessions = (userId) => {
  connection.query("DELETE FROM sessions WHERE user_id=?", [userId])
}

export const createSession = (userId, remoteIp, localIp) => {
  connection.query("INSERT INTO `sessions` (`id`, `user_id`, `remote_ip`, `local_ip`)\
                    VALUES (NULL, ?, ?, ?)", [userId, remoteIp, localIp])
}