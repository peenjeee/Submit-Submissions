import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

class CategoryRepositories {
  constructor() {
    this.pool = pool;
  }

  async createCategory(name) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO categories(id, name) VALUES($1, $2) RETURNING id',
      values: [id, name],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getCategories() {
    const result = await this.pool.query('SELECT * FROM categories ORDER BY created_at DESC');
    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: 'SELECT * FROM categories WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async updateCategory(id, payload) {
    const columns = ['name'];
    const entries = Object.entries(payload).filter(([key]) => columns.includes(key));
    const assignments = entries.map(([key], index) => `${key} = $${index + 1}`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE categories SET ${assignments.join(', ')}, updated_at = current_timestamp WHERE id = $${values.length} RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async deleteCategory(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default CategoryRepositories;
