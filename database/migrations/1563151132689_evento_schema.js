"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventoSchema extends Schema {
  up() {
    this.create("eventos", table => {
      table.increments();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");

      table.string("title").notNullable();

      table.string("where");

      table.timestamp("when");

      table.timestamps();
    });
  }

  down() {
    this.drop("eventos");
  }
}

module.exports = EventoSchema;
