import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

const bookmarkSelect = `
SELECT bookmarks.*, jobs.title AS job_title, companies.name AS company_name,
categories.name AS category_name
FROM bookmarks
JOIN jobs ON jobs.id = bookmarks.job_id
JOIN companies ON companies.id = jobs.company_id
JOIN categories ON categories.id = jobs.category_id`;

class BookmarkRepositories {
  constructor() {
    this.pool = pool;
  }

  async createBookmark({ userId, jobId }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO bookmarks(id, user_id, job_id) VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, jobId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getBookmarksByUser(userId) {
    const query = {
      text: `${bookmarkSelect} WHERE bookmarks.user_id = $1 ORDER BY bookmarks.created_at DESC`,
      values: [userId],
    };
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getBookmarkById({ id, jobId, userId }) {
    const query = {
      text: `${bookmarkSelect} WHERE bookmarks.id = $1 AND bookmarks.job_id = $2 AND bookmarks.user_id = $3`,
      values: [id, jobId, userId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async deleteBookmark({ jobId, userId }) {
    const query = {
      text: 'DELETE FROM bookmarks WHERE job_id = $1 AND user_id = $2 RETURNING id',
      values: [jobId, userId],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default BookmarkRepositories;
