/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user",(table)=>{
        table.increments(),
        table.string("name",32).notNullable(),
        table.string("email",32).notNullable(),
        table.string("contact",32)
    })
    .createTable("task",(table)=>{
        table.increments(),
        table.string('name',32).notNullable(),
        table.integer("user_id").unsigned().references("user.id"),
        table.string("description",1024).notNullable(),
        table.string("status",32)
        table.dateTime("date").notNullable()
    })
    .createTable("expenses",(table)=>{
        table.increments(),
        table.integer("user_id").unsigned().references("user.id"),
        table.decimal("amount").notNullable(),
        table.dateTime("created_at")
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable("expenses")
    .dropTable("task")
    .dropTable("user")
};
