exports.up = function(knex, Promise) {
  return knex.schema.createTable('notifications', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('from_user')
    table.integer('type')
    table.string('uuid')
    table.boolean('view').defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notifications')
}