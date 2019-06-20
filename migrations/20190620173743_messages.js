
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', table => {
    table.increments('id').primary()
    table.string('from_user')
    table.string('to_user')
    table.boolean('view')
    table.datetime('message_date')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
};
