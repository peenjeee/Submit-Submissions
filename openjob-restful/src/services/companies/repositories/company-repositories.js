import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

class CompanyRepositories {
  constructor() {
    this.pool = pool;
  }

  async createCompany({ name, location, description, createdBy }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO companies(id, name, location, description, created_by) VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, location, description, createdBy],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getCompanies() {
    const result = await this.pool.query('SELECT * FROM companies ORDER BY created_at DESC');
    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: 'SELECT * FROM companies WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async updateCompany(id, payload) {
    const columns = ['name', 'location', 'description'];
    const entries = Object.entries(payload).filter(([key]) => columns.includes(key));
    const assignments = entries.map(([key], index) => `${key} = $${index + 1}`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE companies SET ${assignments.join(', ')}, updated_at = current_timestamp WHERE id = $${values.length} RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async deleteCompany(id) {
    const query = {
      text: 'DELETE FROM companies WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default CompanyRepositories;
