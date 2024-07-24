import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT } from "consts";

// Create a Redis client
const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

client.on("connect", async () => {
  // eslint-disable-next-line
  console.log("Connected to Redis");
});
client.on("error", async (err) => {
  // eslint-disable-next-line
  console.log("REDIS ERRROR", err);
});

export default client;
