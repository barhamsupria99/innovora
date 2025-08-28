import { db, schema } from '@shared/db';
import { randomUUID } from 'crypto';

const { products, categories } = schema;

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed Categories
    const categoriesData = [
      {
        id: randomUUID(),
        name: "Feminine Care",
        slug: "feminine-care",
        description: "Organic, sustainable feminine hygiene products",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop"
      },
      {
        id: randomUUID(),
        name: "Gaming & Tech",
        slug: "gaming-tech",
        description: "Premium phone and gaming accessories",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop"
      },
      {
        id: randomUUID(),
        name: "Kids Learning",
        slug: "kids-learning",
        description: "Educational toys and books for children",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop"
      },
      {
        id: randomUUID(),
        name: "Fitness Gear",
        slug: "fitness-gear",
        description: "Premium workout equipment and accessories",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop"
      }
    ];

    console.log('📚 Inserting categories...');
    for (const category of categoriesData) {
      await db.insert(categories).values(category);
      console.log(`✅ Inserted category: ${category.name}`);
    }

    // Seed Products
    const productsData = [
      {
        id: randomUUID(),
        name: "Organic Cotton Pads",
        description: "100% organic cotton feminine hygiene pads for sensitive skin. Biodegradable and plastic-free.",
        price: "24.99",
        category: "feminine-care",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
        inStock: 50,
        features: ["100% Organic Cotton", "Biodegradable", "Plastic-Free", "Hypoallergenic"]
      },
      {
        id: randomUUID(),
        name: "Menstrual Cup Set",
        description: "Eco-friendly reusable menstrual cup with sterilizing case and cleaning brush.",
        price: "32.99",
        category: "feminine-care",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
        inStock: 30,
        features: ["Medical Grade Silicone", "Reusable", "Eco-Friendly", "Includes Case"]
      },
      {
        id: randomUUID(),
        name: "Pro Gaming Controller",
        description: "Wireless gaming controller for mobile devices with customizable buttons and ergonomic design.",
        price: "79.99",
        category: "gaming-tech",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop",
        inStock: 25,
        features: ["Wireless", "Customizable Buttons", "Ergonomic Design", "Mobile Compatible"]
      },
      {
        id: randomUUID(),
        name: "Educational Building Blocks",
        description: "STEM-focused building blocks that teach engineering principles through play.",
        price: "45.99",
        category: "kids-learning",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop",
        inStock: 40,
        features: ["STEM Learning", "Durable", "Creative Play", "Educational"]
      },
      {
        id: randomUUID(),
        name: "Premium Yoga Mat",
        description: "Non-slip yoga mat with alignment lines for perfect poses and meditation.",
        price: "89.99",
        category: "fitness-gear",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        inStock: 35,
        features: ["Non-Slip", "Alignment Lines", "Premium Material", "Portable"]
      }
    ];

    console.log('🛍️ Inserting products...');
    for (const product of productsData) {
      await db.insert(products).values(product);
      console.log(`✅ Inserted product: ${product.name}`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Inserted ${categoriesData.length} categories and ${productsData.length} products`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
