
exports.up = function(knex, Promise) {
  return knex.schema.createTable('informations', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.integer('age')
    table.integer('gender')
    table.integer('orientation').defaultTo(2)
    table.text('bio')
    table.integer('score')
    table.float('longitude')
    table.float('latitude')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('informations')
}
