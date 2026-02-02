import { Redis } from '@upstash/redis';

// Vercel/Upstash will automatically provide these environment variables
const redis = Redis.fromEnv();

export default async function handler(request, response) {
  const DATA_KEY = 'gcse_science_tracker_data';

  try {
    if (request.method === 'GET') {
      const data = await redis.get(DATA_KEY);
      // Upstash returns the object directly, but let's ensure it's JSON
      return response.status(200).json(data || {});
    } 
    else if (request.method === 'POST') {
      const body = request.body;
      await redis.set(DATA_KEY, body);
      return response.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Redis Error:', error);
    return response.status(500).json({ error: 'Database error' });
  }
}
