import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

const jobSelect = `
SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
FROM jobs
JOIN companies ON companies.id = jobs.company_id
JOIN categories ON categories.id = jobs.category_id`;

const jobListSelect = `
SELECT jobs.id, jobs.company_id, jobs.category_id, jobs.title, jobs.description,
jobs.job_type, jobs.experience_level, jobs.location_type, jobs.location_city,
jobs.is_salary_visible, jobs.status, companies.name AS company_name,
categories.name AS category_name
FROM jobs
JOIN companies ON companies.id = jobs.company_id
JOIN categories ON categories.id = jobs.category_id`;

class JobRepositories {
  constructor() {
    this.pool = pool;
  }

  async createJob({ companyId, categoryId, createdBy, title, description, jobType, experienceLevel, locationType, locationCity, salaryMin, salaryMax, isSalaryVisible, status }) {
    const id = nanoid(16);
    const query = {
      text: `INSERT INTO jobs(id, company_id, category_id, created_by, title, description, job_type, experience_level, location_type, location_city, salary_min, salary_max, is_salary_visible, status)
         VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
      values: [id, companyId, categoryId, createdBy, title, description, jobType, experienceLevel, locationType, locationCity, salaryMin, salaryMax, isSalaryVisible, status],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getJobs({ title, companyName } = {}) {
    const clauses = [];
    const values = [];

    if (title) {
      values.push(`%${title}%`);
      clauses.push(`jobs.title ILIKE $${values.length}`);
    }
    if (companyName) {
      values.push(`%${companyName}%`);
      clauses.push(`companies.name ILIKE $${values.length}`);
    }

    const where = clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '';
    const result = await this.pool.query(`${jobListSelect}${where} ORDER BY jobs.created_at DESC`, values);
    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: `${jobSelect} WHERE jobs.id = $1`,
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getJobsByCompany(companyId) {
    const query = {
      text: `${jobSelect} WHERE jobs.company_id = $1 ORDER BY jobs.created_at DESC`,
      values: [companyId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getJobsByCategory(categoryId) {
    const query = {
      text: `${jobSelect} WHERE jobs.category_id = $1 ORDER BY jobs.created_at DESC`,
      values: [categoryId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async updateJob(id, payload) {
    const columns = ['company_id', 'category_id', 'title', 'description', 'job_type', 'experience_level', 'location_type', 'location_city', 'salary_min', 'salary_max', 'is_salary_visible', 'status'];
    const entries = Object.entries(payload).filter(([key]) => columns.includes(key));
    const assignments = entries.map(([key], index) => `${key} = $${index + 1}`);
    const values = entries.map(([, value]) => value);
    values.push(id);

    const query = `UPDATE jobs SET ${assignments.join(', ')}, updated_at = current_timestamp WHERE id = $${values.length} RETURNING *`;
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async deleteJob(id) {
    const query = {
      text: 'DELETE FROM jobs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default JobRepositories;
