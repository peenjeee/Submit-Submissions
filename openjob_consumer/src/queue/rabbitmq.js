export const APPLICATION_QUEUE = 'openjob:applications';

export const getRabbitMqUrl = () => {
  if (process.env.AMQP_URL) return process.env.AMQP_URL;
  const host = process.env.RABBITMQ_HOST || 'localhost';
  const port = process.env.RABBITMQ_PORT || '5672';
  const user = process.env.RABBITMQ_USER || 'guest';
  const password = process.env.RABBITMQ_PASSWORD || 'guest';
  return `amqp://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}`;
};
