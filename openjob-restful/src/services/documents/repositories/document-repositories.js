import pool from '../../../database/pool.js';
import { nanoid } from 'nanoid';

class DocumentRepositories {
  constructor() {
    this.pool = pool;
  }

  async createDocument({ userId, originalName, fileName, mimeType, filePath, size }) {
    const id = nanoid(16);
    const query = {
      text: `INSERT INTO documents(id, user_id, original_name, file_name, mime_type, file_path, size)
         VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      values: [id, userId, originalName, fileName, mimeType, filePath, size],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getDocuments() {
    const result = await this.pool.query('SELECT * FROM documents ORDER BY created_at DESC');
    return result.rows;
  }

  async getDocumentById(id) {
    const query = {
      text: 'SELECT * FROM documents WHERE id = $1',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async deleteDocument(id) {
    const query = {
      text: 'DELETE FROM documents WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default DocumentRepositories;
