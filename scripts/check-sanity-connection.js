const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

async function checkConnection() {
  try {
    console.log('🔗 Testing Sanity connection...');
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);

    const result = await client.fetch('*[_type == "blogPost"] | order(_createdAt desc) [0...3] { title, slug, _createdAt }');
    console.log('✅ Connection successful!');
    console.log('📄 Recent blog posts:', result);

    const categoriesResult = await client.fetch('*[_type == "category"] { title, _id }');
    console.log('🏷️ Categories:', categoriesResult);

    const authorsResult = await client.fetch('*[_type == "author"] { name, _id }');
    console.log('👨‍⚕️ Authors:', authorsResult);

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

checkConnection();