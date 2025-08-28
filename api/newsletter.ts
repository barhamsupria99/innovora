import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dbStorage } from './db-storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required' });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Subscribe to newsletter using database storage
      const result = await dbStorage.subscribeToNewsletter(email);
      
      res.status(200).json({ 
        message: 'Successfully subscribed to newsletter',
        email: result.email 
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
