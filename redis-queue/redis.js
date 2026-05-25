const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URI,
});

client.on('error', (err) => {
  console.log(`Redis error: ${err}`)
});

client.on('connect', () => {
  console.log('Redis Socket Connected');
});

client.on('ready', () => {
  console.log("Redis Connected Successfully")
});

async function connectRedis(){
  try {
    await client.connect();
    console.log("Redis Connected Successfully")
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

connectRedis()

module.exports = client;
