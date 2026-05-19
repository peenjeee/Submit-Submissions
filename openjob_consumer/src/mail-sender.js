import nodemailer from 'nodemailer';

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 587),
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASSWORD },
    });
  }

  sendApplicationNotification(targetEmail, payload) {
    return this.transporter.sendMail({
      from: process.env.MAIL_USER,
      to: targetEmail,
      subject: 'Lamaran baru di OpenJob',
      text: `Ada lamaran baru untuk lowongan Anda.\n\nEmail pelamar: ${payload.applicantEmail}\nNama pelamar: ${payload.applicantName}\nTanggal lamaran: ${payload.applicationDate}`,
    });
  }
}

export default MailSender;
