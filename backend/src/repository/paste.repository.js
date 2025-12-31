import { redis } from "../config/redis.js";

export const pasteRepository = {
  // Stores or updates a paste
  async set(paste, id) {
    return await redis.set(`paste:${id}`, JSON.stringify(paste));
  },

  // Fetches a paste by id
  async get(id) {
    const res = await redis.get(`paste:${id}`);
    return res;
  },
};
