const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.error(`Redis client error: ${error}`));

  }

  async isAlive() {
    await this.client.connect();
    return this.client.isReady;
  }

  async get(key) {
    try {
    return await this.client.get(key);
  } catch (err) {
    console.error(`Error getting key "${key}":`, err);
    return null;
  }
  }

  async set(key, value, duration) {
    try {
    await this.client.set(key, value, { EX: duration });
  } catch (err) {
    console.error(`Error setting key "${key}":`, err);
  }
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient
