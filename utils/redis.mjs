import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => console.error(`Redis client error: ${error}`));
  }

 isAlive() {
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
    try {
        return await this.client.del(key);
    } catch (err) {
        console.error(err);
        return null;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient
