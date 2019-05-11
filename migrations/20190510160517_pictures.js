
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', table => {
    table.increments('id')
    table.string('user_id')
    table.string('url')
    table.boolean('main')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures')
}
