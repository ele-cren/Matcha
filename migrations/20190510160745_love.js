
exports.up = function(knex, Promise) {
  return knex.schema.createTable('love', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('user_target')
    table.boolean('view')
    table.boolean('like')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('love')
}
