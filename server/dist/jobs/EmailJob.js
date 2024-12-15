"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueWorker = exports.emailQueue = exports.emailQueueName = void 0;
const bullmq_1 = require("bullmq");
const queue_1 = require("../config/queue");
const mail_1 = require("../config/mail");
exports.emailQueueName = "emailQueue";
exports.emailQueue = new bullmq_1.Queue(exports.emailQueueName, {
    connection: queue_1.redisConnection,
    defaultJobOptions: queue_1.defaultQueueOptions,
});
//worker
exports.queueWorker = new bullmq_1.Worker(exports.emailQueueName, (job) => __awaiter(void 0, void 0, void 0, function* () {
    const data = job.data;
    yield (0, mail_1.sendEmail)(data.to, data.subject, data.body);
}), {
    connection: queue_1.redisConnection,
});
