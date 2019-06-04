
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reported', table => {
    table.increments('id')
    table.string('user_id')
    table.string('reported_user')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reported')
};
