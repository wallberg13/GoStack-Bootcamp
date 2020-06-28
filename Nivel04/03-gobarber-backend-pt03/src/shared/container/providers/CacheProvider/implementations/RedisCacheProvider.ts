import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";
import ICacheProvider from "../models/ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async save(key: string, value: any): Promise<void> {
    console.log(`Salvando o Cache ${key}`);
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    return data ? JSON.parse(data) : null;
  }

  public async invalidate(key: string): Promise<void> {
    console.log(`Invalidado o Cache ${key}`);
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    // Criando um pipeline (basicamente, eu entendi que seja uma fila),
    const pipeline = this.client.pipeline();

    // Ai percorrendo todo mundo que gerou o cache, estou adicionando aquela key no
    // pipeline
    keys.forEach(key => pipeline.del(key));

    // E agora estou executando aquela função del para todo mundo que eu tinha
    // adicionado no mesmo.
    await pipeline.exec();

    console.log("Cache invalidado");
  }
}
