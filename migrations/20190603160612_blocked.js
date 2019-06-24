
exports.up = function(knex, Promise) {
  return knex.schema.createTable('blocked', table => {
    table.increments('id').primary()
    table.string('user_id')
    table.string('blocked_user')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blocked')
};
