import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export function withCache<T>(key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get<T>(key);
  if (hit !== undefined) return Promise.resolve(hit);
  return fn().then((value) => {
    cache.set(key, value, ttl);
    return value;
  });
}
