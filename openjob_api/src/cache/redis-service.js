import { createClient } from 'redis';

class CacheService {
  constructor() {
    this.client = createClient({ socket: { host: process.env.REDIS_HOST || 'localhost' } });
    this.client.on('error', (error) => console.error(error));
    this.connected = this.client.connect().catch((error) => console.error(error));
  }

  async set(key, value, expirationInSecond = 3600) {
    await this.connected;
    return this.client.set(key, JSON.stringify(value), { EX: expirationInSecond });
  }

  async get(key) {
    await this.connected;
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async delete(key) {
    await this.connected;
    return this.client.del(key);
  }
}

export default new CacheService();
