import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // We will use a hardcoded key since this is a personal tracker.
  // If you wanted multiple users, you'd need a login system.
  const DATA_KEY = 'gcse_science_tracker_data';

  try {
    if (request.method === 'GET') {
      // Load data
      const data = await kv.get(DATA_KEY);
      return response.status(200).json(data || {});
    } 
    else if (request.method === 'POST') {
      // Save data
      const body = request.body;
      await kv.set(DATA_KEY, body);
      return response.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Database error' });
  }
}
