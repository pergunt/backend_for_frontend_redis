import { createClient } from "redis";

// Create a Redis client
const client = createClient({
  url: "redis://redis:6379",
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
