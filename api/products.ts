import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dbStorage } from './db-storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { category, search } = req.query;
      
      let products;
      if (search && typeof search === 'string') {
        products = await dbStorage.searchProducts(search);
      } else if (category && typeof category === 'string') {
        products = await dbStorage.getProductsByCategory(category);
      } else {
        products = await dbStorage.getProducts();
      }
      
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
