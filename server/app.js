import Server from './server'
import Api from './api/api'
import mysql from 'mysql'
import Mailer from './utilities/mailer'
require('dotenv').config()

const server = new Server()
server.start()

export const mailer = new Mailer()
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'matcha',
  dateStrings: true
});

connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected to database')
  const api = new Api(server.app)
  api.setRoutes()
});

process.on('SIGINT', () => {
  connection.query("DELETE FROM sessions")
  connection.query("UPDATE `users` SET `online` = 0")
  connection.end()
  server.stop()
  process.exit(0)
})