import { eq, like, desc, asc } from 'drizzle-orm';
import { db, schema } from '@shared/db';

const { products, categories } = schema;

export class DatabaseStorage {
  // Products
  async getProducts() {
    try {
      return await db.select().from(products).orderBy(asc(products.name));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async getProduct(id: string) {
    try {
      const result = await db.select().from(products).where(eq(products.id, id));
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  async getProductsByCategory(categorySlug: string) {
    try {
      return await db.select().from(products).where(eq(products.category, categorySlug));
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }

  async searchProducts(query: string) {
    try {
      const searchTerm = `%${query.toLowerCase()}%`;
      return await db.select().from(products).where(
        like(products.name, searchTerm)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  // Categories
  async getCategories() {
    try {
      return await db.select().from(categories).orderBy(asc(categories.name));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  async getCategory(slug: string) {
    try {
      const result = await db.select().from(categories).where(eq(categories.slug, slug));
      return result[0] || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw new Error('Failed to fetch category');
    }
  }

  // Newsletter
  async subscribeToNewsletter(email: string) {
    try {
      // For now, we'll just log the subscription
      // You can add a newsletter table to your schema later
      console.log('Newsletter subscription:', email);
      return { success: true, email };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw new Error('Failed to subscribe to newsletter');
    }
  }
}

export const dbStorage = new DatabaseStorage();
