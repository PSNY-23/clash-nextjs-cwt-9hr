import { Job, Queue, Worker } from "bullmq";
import { defaultQueueOptions, redisConnection } from "../config/queue";
import { sendEmail } from "../config/mail";

export const emailQueueName = "emailQueue";

interface EmailJobDateType {
  to: string;
  subject: string;
  body: string;
}

export const emailQueue = new Queue(emailQueueName, {
  connection: redisConnection,
  defaultJobOptions: defaultQueueOptions,
});

//worker
export const queueWorker = new Worker(
  emailQueueName,
  async (job: Job) => {
    const data: EmailJobDateType = job.data;
    await sendEmail(data.to, data.subject, data.body);
  },
  {
    connection: redisConnection,
  }
);
