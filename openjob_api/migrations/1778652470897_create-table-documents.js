/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('documents', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    user_id: {
      type: 'VARCHAR(50)',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    original_name: { type: 'VARCHAR(255)', notNull: true },
    file_name: { type: 'VARCHAR(255)', notNull: true },
    mime_type: { type: 'VARCHAR(120)', notNull: true },
    file_path: { type: 'TEXT', notNull: true },
    size: { type: 'INTEGER', notNull: true },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('documents');
};
