import { connection } from '../app'

export const updatePassChanged = (userId, hasChanged) => {
  connection.query("UPDATE users SET pass_changed = ? WHERE users.uuid = ?", [hasChanged, userId])
}