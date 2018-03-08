exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id')
      table.string('user_name').notNullable()
      table.string('user_email').notNullable()
    }),
    knex.schema.createTable('events', function (table) {
      table.increments('id')
      table.string('event_title').notNullable()
      table.string('event_description').notNullable()
      table.string('event_meeting').notNullable()
      table.string('event_url').notNullable()
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
    }),
    knex.schema.createTable('slots', function (table) {
      table.increments('id')
      table.date('slot_date').notNullable()
      table.string('slot_start').notNullable()
      table.string('slot_end').notNullable()
      table.integer('event_id')
      table.foreign('event_id').references('events.id')
    }),
    knex.schema.createTable('attendance', function (table) {
      table.increments('id')
      table.boolean('available').notNullable()
      table.integer('slot_id')
      table.foreign('slot_id').references('slots.id')
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('slots'),
    knex.schema.dropTable('attendance')
  ])
};
