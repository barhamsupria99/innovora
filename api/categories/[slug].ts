import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dbStorage } from '../db-storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ message: 'Category slug is required' });
      }

      const category = await dbStorage.getCategory(slug);
      
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json(category);
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
