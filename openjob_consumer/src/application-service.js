import pool from './database/pool.js';

class ApplicationService {
  constructor() {
    this.pool = pool;
  }

  async getApplicationNotification(applicationId) {
    const result = await this.pool.query({
      text: `SELECT applications.created_at AS application_date,
        applicant.name AS applicant_name,
        applicant.email AS applicant_email,
        owner.email AS owner_email
      FROM applications
      JOIN users applicant ON applicant.id = applications.user_id
      JOIN jobs ON jobs.id = applications.job_id
      JOIN users owner ON owner.id = jobs.created_by
      WHERE applications.id = $1`,
      values: [applicationId],
    });
    return result.rows[0];
  }
}

export default ApplicationService;
