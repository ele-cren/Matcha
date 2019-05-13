
exports.up = function(knex, Promise) {
  return knex.schema.createTable('informations', table => {
    table.increments('id')
    table.string('user_id')
    table.integer('age')
    table.integer('gender')
    table.integer('orientation')
    table.text('bio')
    table.integer('score')
    table.float('longitude')
    table.float('latitude')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('informations')
}
