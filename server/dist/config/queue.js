"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultQueueOptions = exports.redisConnection = void 0;
exports.redisConnection = {
    host: process.env.REDIS_HOST,
    port: 6379,
};
exports.defaultQueueOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60,
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 3000
    },
    removeOnFail: false,
};
