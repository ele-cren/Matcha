
exports.up = function(knex, Promise) {
  return knex.schema.createTable('love', table => {
    table.increments('id')
    table.string('user_id')
    table.string('user_target')
    table.boolean('view')
    table.boolean('like')
    table.boolean('match')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('love')
}