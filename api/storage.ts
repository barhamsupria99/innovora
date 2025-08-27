import { randomUUID } from 'crypto';

// This is a simplified storage that works with Vercel serverless functions
// In production, you should use a proper database like PostgreSQL, MongoDB, etc.
class VercelStorage {
  private static instance: VercelStorage;
  private categories: Map<string, any>;
  private products: Map<string, any>;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.seedData();
  }

  public static getInstance(): VercelStorage {
    if (!VercelStorage.instance) {
      VercelStorage.instance = new VercelStorage();
    }
    return VercelStorage.instance;
  }

  private seedData() {
    const categoriesData = [
      {
        name: "Feminine Care",
        slug: "feminine-care",
        description: "Organic, sustainable feminine hygiene products",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop"
      },
      {
        name: "Gaming & Tech",
        slug: "gaming-tech",
        description: "Premium phone and gaming accessories",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop"
      },
      {
        name: "Kids Learning",
        slug: "kids-learning",
        description: "Educational toys and books for children",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop"
      },
      {
        name: "Fitness Gear",
        slug: "fitness-gear",
        description: "Premium workout equipment and accessories",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
      }
    ];

    categoriesData.forEach(cat => {
      const category = {
        ...cat,
        id: randomUUID()
      };
      this.categories.set(category.id, category);
    });

    const productsData = [
      {
        name: "Organic Cotton Pads",
        description: "100% organic cotton feminine hygiene pads for sensitive skin. Biodegradable and plastic-free.",
        price: 24.99,
        category: "feminine-care",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
        inStock: 50,
        features: ["100% Organic Cotton", "Biodegradable", "Plastic-Free", "Hypoallergenic"]
      },
      {
        name: "Menstrual Cup Set",
        description: "Eco-friendly reusable menstrual cup with sterilizing case and cleaning brush.",
        price: 32.99,
        category: "feminine-care",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
        inStock: 30,
        features: ["Medical Grade Silicone", "Reusable", "Eco-Friendly", "Includes Case"]
      },
      {
        name: "Pro Gaming Controller",
        description: "Wireless gaming controller for mobile devices with customizable buttons and ergonomic design.",
        price: 79.99,
        category: "gaming-tech",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
        inStock: 25,
        features: ["Wireless", "Customizable Buttons", "Ergonomic Design", "Mobile Compatible"]
      },
      {
        name: "Educational Building Blocks",
        description: "STEM-focused building blocks that teach engineering principles through play.",
        price: 45.99,
        category: "kids-learning",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
        inStock: 40,
        features: ["STEM Learning", "Durable", "Creative Play", "Educational"]
      },
      {
        name: "Premium Yoga Mat",
        description: "Non-slip yoga mat with alignment lines for perfect poses and meditation.",
        price: 89.99,
        category: "fitness-gear",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        inStock: 35,
        features: ["Non-Slip", "Alignment Lines", "Premium Material", "Portable"]
      }
    ];

    productsData.forEach(prod => {
      const product = {
        ...prod,
        id: randomUUID()
      };
      this.products.set(product.id, product);
    });
  }

  async getProducts() {
    return Array.from(this.products.values());
  }

  async getProduct(id: string) {
    return this.products.get(id);
  }

  async getProductsByCategory(categorySlug: string) {
    return Array.from(this.products.values()).filter(
      product => product.category === categorySlug
    );
  }

  async searchProducts(query: string) {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
  }

  async getCategories() {
    return Array.from(this.categories.values());
  }

  async getCategory(slug: string) {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }
}

export const storage = VercelStorage.getInstance();
