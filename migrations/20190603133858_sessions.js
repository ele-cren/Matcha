
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', table => {
    table.increments('id')
    table.string('user_id')
    table.string('socket_id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('session')
};
