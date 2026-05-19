import pool from '../../../database/pool.js';

class AuthenticationRepositories {
  constructor() {
    this.pool = pool;
  }

  async addToken(token, userId) {
    const query = {
      text: 'INSERT INTO authentications(token, user_id) VALUES($1, $2)',
      values: [token, userId],
    };
    await this.pool.query(query);
  }

  async verifyToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async deleteToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1 RETURNING token',
      values: [token],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default AuthenticationRepositories;
