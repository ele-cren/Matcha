
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('username')
    table.string('email')
    table.string('password')
    table.boolean('confirmed')
    table.string('first_name')
    table.string('last_name')
    table.string('uuid')
    table.boolean('pass_changed')
    table.boolean('online')
    table.datetime('last_disconnect')
    table.string('ip', 15)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
