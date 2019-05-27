import { connection } from '../app'

export const updateNotif = (notifId) => {
  connection.query("UPDATE `notifications` SET `view` = '1' WHERE `notifications`.`uuid` = ?", [notifId])
}

export const deleteNotif = (notifId) => {
  connection.query("DELETE FROM `notifications` WHERE `notifications`.`uuid` = ?", [notifId])
}

export const addNotif = (notif) => {
  connection.query("INSERT INTO `notifications` (`id`, `user_id`, `from_user`, `type`, `uuid`, `view`)\
                    VALUES (NULL, ?, ?, ?, ?, ?)", [notif.user_id, notif.from_user, notif.type, notif.uuid, notif.view])
}