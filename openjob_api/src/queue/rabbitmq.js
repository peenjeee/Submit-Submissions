import amqp from 'amqplib';

export const APPLICATION_QUEUE = 'openjob:applications';

export const getRabbitMqUrl = () => {
  if (process.env.AMQP_URL) return process.env.AMQP_URL;
  const host = process.env.RABBITMQ_HOST || 'localhost';
  const port = process.env.RABBITMQ_PORT || '5672';
  const user = process.env.RABBITMQ_USER || 'guest';
  const password = process.env.RABBITMQ_PASSWORD || 'guest';
  return `amqp://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}`;
};

export const publishApplicationCreated = async (applicationId) => {
  const connection = await amqp.connect(getRabbitMqUrl());
  const channel = await connection.createChannel();
  await channel.assertQueue(APPLICATION_QUEUE, { durable: true });
  channel.sendToQueue(
    APPLICATION_QUEUE,
    Buffer.from(JSON.stringify({ application_id: applicationId })),
    { persistent: true, contentType: 'application/json' },
  );
  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 500);
};
