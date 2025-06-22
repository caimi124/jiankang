const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: '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'
});

async function checkDatabaseSchema() {
  try {
    console.log('🔍 Checking Notion database schema...');
    
    // Search for databases
    const databases = await notion.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    });
    
    console.log(`📊 Found ${databases.results.length} databases`);
    
    // Find herb database
    let herbDatabase = null;
    for (const db of databases.results) {
      if (db.title && db.title.length > 0) {
        const title = db.title[0].plain_text.toLowerCase();
        console.log(`🔍 Database: "${title}"`);
        if (title.includes('herb') || title.includes('草药') || title.includes('中药')) {
          herbDatabase = db;
          break;
        }
      }
    }
    
    if (herbDatabase) {
      console.log(`✅ Found herb database: ${herbDatabase.title[0].plain_text}`);
      console.log(`📝 Database ID: ${herbDatabase.id}`);
      
      // Get database schema
      const databaseInfo = await notion.databases.retrieve({
        database_id: herbDatabase.id
      });
      
      console.log('\n📋 Database Properties:');
      Object.entries(databaseInfo.properties).forEach(([name, property]) => {
        console.log(`  - ${name}: ${property.type}`);
        if (property.type === 'select' && property.select.options) {
          console.log(`    Options: ${property.select.options.map(opt => opt.name).join(', ')}`);
        }
        if (property.type === 'multi_select' && property.multi_select.options) {
          console.log(`    Options: ${property.multi_select.options.map(opt => opt.name).join(', ')}`);
        }
      });
      
      return databaseInfo.properties;
    } else {
      console.log('❌ No herb database found');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  }
}

// Run the script
checkDatabaseSchema()
  .then(properties => {
    if (properties) {
      console.log('\n✅ Database schema check completed');
    }
  })
  .catch(error => {
    console.error('❌ Script failed:', error);
  }); 