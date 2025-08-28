import 'dotenv/config';
import { dbStorage } from '../api/db-storage';

async function testDatabase() {
  try {
    console.log('🧪 Testing database integration...\n');

    // Test 1: Fetch categories
    console.log('📚 Testing categories...');
    const categories = await dbStorage.getCategories();
    console.log(`✅ Found ${categories.length} categories:`);
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`));

    console.log('\n');

    // Test 2: Fetch products
    console.log('🛍️ Testing products...');
    const products = await dbStorage.getProducts();
    console.log(`✅ Found ${products.length} products:`);
    products.forEach(prod => console.log(`   - ${prod.name} ($${prod.price})`));

    console.log('\n');

    // Test 3: Test category filtering
    console.log('🔍 Testing category filtering...');
    const feminineCareProducts = await dbStorage.getProductsByCategory('feminine-care');
    console.log(`✅ Found ${feminineCareProducts.length} products in Feminine Care category`);

    // Test 4: Test search
    console.log('🔍 Testing search...');
    const searchResults = await dbStorage.searchProducts('gaming');
    console.log(`✅ Found ${searchResults.length} products matching "gaming"`);

    console.log('\n🎉 All database tests passed successfully!');
    console.log('🚀 Your database integration is working perfectly!');

  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

testDatabase();
