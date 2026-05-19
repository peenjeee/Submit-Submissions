import 'dotenv/config';
import amqp from 'amqplib';
import { APPLICATION_QUEUE, getRabbitMqUrl } from './queue/rabbitmq.js';
import ApplicationService from './application-service.js';
import MailSender from './mail-sender.js';
import Listener from './listener.js';

const init = async () => {
  const connection = await amqp.connect(getRabbitMqUrl());
  const channel = await connection.createChannel();
  await channel.assertQueue(APPLICATION_QUEUE, { durable: true });
  channel.prefetch(1);

  const listener = new Listener(new ApplicationService(), new MailSender());
  await channel.consume(APPLICATION_QUEUE, (message) => listener.listen(message, channel), { noAck: false });
  console.log(`Consumer berjalan dan mendengarkan antrean ${APPLICATION_QUEUE}...`);
};

init().catch((error) => {
  console.error(error);
  process.exit(1);
});
