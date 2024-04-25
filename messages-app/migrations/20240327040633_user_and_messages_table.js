/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments();
        table.string('name',32).notNullable();
        table.string('email',64).notNullable();
    })
    .createTable('messages',(table)=>{
        table.increments();
        table.integer('sender_id').unsigned().references('users.id')
        table.integer('reciever_id').unsigned().references('users.id')
        table.string('messages_content',1024).notNullable();
        table.dateTime('sent_at').notNullable()
        table.dateTime('recieved_at')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('messages')
    .dropTable('users')
  
};
