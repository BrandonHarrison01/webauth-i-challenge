
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()

      tbl
        .string('username', 30)
        .notNullable()
        .unique()
      tbl
        .string('password', 30)
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
