// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 's-1.g0v.pw',
      database: 'matcha',
      user: 'matcha',
      password: 'CouCouCou!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
