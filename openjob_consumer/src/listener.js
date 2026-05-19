class Listener {
  constructor(applicationService, mailSender) {
    this.applicationService = applicationService;
    this.mailSender = mailSender;
    this.listen = this.listen.bind(this);
  }

  async listen(message, channel) {
    if (!message) return;
    try {
      const { application_id: applicationId } = JSON.parse(message.content.toString());
      const data = await this.applicationService.getApplicationNotification(applicationId);
      if (data?.owner_email) {
        await this.mailSender.sendApplicationNotification(data.owner_email, {
          applicantEmail: data.applicant_email,
          applicantName: data.applicant_name,
          applicationDate: data.application_date,
        });
      }
      channel.ack(message);
    } catch (error) {
      console.error(error);
      channel.nack(message, false, false);
    }
  }
}

export default Listener;
