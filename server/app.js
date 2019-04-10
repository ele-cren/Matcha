import Server from './server'
import Api from './api/api'
import mysql from 'mysql'
require('dotenv').config()

const server = new Server()

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'matcha'
});

connection.connect()

server.start()

const api = new Api(server.app)
api.setRoutes()

process.on('SIGINT', () => {
  connection.end()
  server.stop()
  process.exit(0)
})