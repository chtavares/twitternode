export const up = (knex, Promise) =>
  knex.schema
  .createTable('users', (table) => {
    table.uuid('id').unique().primary().notNullable()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.text('password').notNullable()
    table.timestamps()
  })
  .createTable('posts', (table) => {
    table.uuid('id').unique().primary().notNullable()
    table.string('content').notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.timestamps()
  })
  .createTable('comments', (table) => {
    table.uuid('id').unique().primary().notNullable()
    table.string('content').notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.uuid('post_id').notNullable()
    table.foreign('post_id').references('id').inTable('posts')
    table.timestamps()
  })

export const down = (knex, Promise) =>
  knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('comments')
  .dropTableIfExists('posts')