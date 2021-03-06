
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('url')
    table.boolean('main').defaultTo(0)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures')
}
