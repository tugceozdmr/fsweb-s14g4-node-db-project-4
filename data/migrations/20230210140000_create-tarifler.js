/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarifler", (tbl) => {
      tbl.increments("tarif_id");
      tbl.string("tarif_adi", 128).notNullable().unique();
      tbl.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (tbl) => {
      tbl.increments("adim_id");
      tbl.integer("adim_sirasi").unsigned().notNullable();
      tbl.string("adim_talimati", 256).notNullable();
      tbl .integer("tarif_id").unsigned() .notNullable()
        .references("tarif_id")
        .inTable("tarifler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("malzemeler", (tbl) => {
      tbl.increments("malzeme_id");
      tbl.string("malzeme_adi", 128).notNullable();
      tbl.string("birim",32).notNullable();
    })

    .createTable("adimlar_malzemeler", (tbl) => {
      tbl.increments("adimlar_malzemeler_id");
      tbl.float("miktar").unsigned();
      tbl
        .integer("adim_id")
        .unsigned()
        .notNullable()
        .references("adim_id")
        .inTable("adimlar")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("malzeme_id")
        .unsigned()
        .notNullable()
        .references("malzeme_id")
        .inTable("malzemeler")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("adimlar_malzemeler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("malzemeler")
    .dropTableIfExists("tarifler");
};
