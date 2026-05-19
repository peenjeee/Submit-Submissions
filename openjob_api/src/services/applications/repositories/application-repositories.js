import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

const applicationSelect = `
SELECT applications.*, users.name AS user_name, users.email AS user_email,
jobs.title AS job_title, companies.name AS company_name
FROM applications
JOIN users ON users.id = applications.user_id
JOIN jobs ON jobs.id = applications.job_id
JOIN companies ON companies.id = jobs.company_id`;

const applicationListSelect = `
SELECT applications.*, users.name AS user_name, users.email AS user_email,
jobs.title AS job_title, jobs.company_id, jobs.category_id, jobs.created_by AS job_owner_id,
companies.name AS company_name
FROM applications
JOIN users ON users.id = applications.user_id
JOIN jobs ON jobs.id = applications.job_id
JOIN companies ON companies.id = jobs.company_id`;

const applicationUserSelect = `
SELECT applications.*, users.name AS user_name, users.email AS user_email,
jobs.title AS job_title, jobs.company_id, jobs.category_id, jobs.created_by AS job_owner_id,
companies.name AS company_name, companies.location AS company_location,
categories.name AS category_name
FROM applications
JOIN users ON users.id = applications.user_id
JOIN jobs ON jobs.id = applications.job_id
JOIN companies ON companies.id = jobs.company_id
JOIN categories ON categories.id = jobs.category_id`;

class ApplicationRepositories {
  constructor() {
    this.pool = pool;
  }

  async createApplication({ userId, jobId, status }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO applications(id, user_id, job_id, status) VALUES($1, $2, $3, $4) RETURNING *',
      values: [id, userId, jobId, status],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getApplications() {
    const result = await this.pool.query(`${applicationListSelect} ORDER BY applications.created_at DESC`);
    return result.rows;
  }

  async getApplicationById(id) {
    const query = {
      text: `${applicationSelect} WHERE applications.id = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getApplicationsByUser(userId) {
    const query = {
      text: `${applicationUserSelect} WHERE applications.user_id = $1 ORDER BY applications.created_at DESC`,
      values: [userId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getApplicationsByJob(jobId) {
    const query = {
      text: `${applicationSelect} WHERE applications.job_id = $1 ORDER BY applications.created_at DESC`,
      values: [jobId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async updateApplication(id, payload) {
    const columns = ['status'];
    const entries = Object.entries(payload).filter(([key]) => columns.includes(key));
    const assignments = entries.map(([key], index) => `${key} = $${index + 1}`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE applications SET ${assignments.join(', ')}, updated_at = current_timestamp WHERE id = $${values.length} RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async deleteApplication(id) {
    const query = {
      text: 'DELETE FROM applications WHERE id = $1 RETURNING *',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default ApplicationRepositories;
