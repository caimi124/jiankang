const fs = require('fs');
const path = require('path');

// Turmeric数据结构，与API路由中的格式保持一致
const turmericData = {
  id: 'turmeric',
  name: 'Turmeric',
  chinese_name: '姜黄',
  latin_name: 'Curcuma longa',
  slug: 'turmeric',
  category: 'Anti-inflammatory & Antioxidant',
  evidence_level: 'Strong',
  safety_level: 'high',
  
  overview: 'Turmeric (Curcuma longa) is a vibrant yellow spice and medicinal herb known worldwide for its potent anti-inflammatory and antioxidant effects. Traditionally used in Chinese and Ayurvedic medicine, turmeric helps support joint comfort, improve digestion, and promote overall wellness. The active ingredient, curcumin, is the key to its health benefits and is backed by numerous scientific studies.',
  
  benefits: [
    'Helps reduce joint pain and inflammation',
    'Supports healthy digestion and liver function',
    'Provides antioxidant protection against cellular damage',
    'May boost mood and cognitive health',
    'Supports natural detoxification processes'
  ],
  
  active_compounds: 'Turmeric\'s primary active compound, curcumin, works by blocking inflammatory molecules and neutralizing harmful free radicals. Curcumin also supports digestive health by stimulating bile production and may improve brain function by increasing levels of brain-derived neurotrophic factor (BDNF).',
  
  traditional_uses: 'In Traditional Chinese Medicine (TCM), turmeric is seen as a warming herb that promotes blood flow and relieves pain caused by stagnation or cold. It is traditionally used to improve circulation and relieve muscle and joint stiffness, ease digestive discomfort and bloating, and support menstrual health by reducing cramps.',
  
  suitable_for: [
    'People with joint pain, arthritis, or muscle soreness',
    'Individuals experiencing digestive issues like bloating or indigestion',
    'Anyone looking to reduce inflammation naturally',
    'Those wanting to support brain and mood health'
  ],
  
  not_suitable_for: [
    'People with gallstones or bile duct obstruction',
    'Those on blood-thinning medications (without medical supervision)',
    'Individuals with iron deficiency (may reduce iron absorption)',
    'Pregnant women (high doses may stimulate uterine contractions)'
  ],
  
  dosage_forms: [
    {
      form: 'Powder',
      dosage: '500–2000mg daily',
      usage: 'Preferably with black pepper for better absorption'
    },
    {
      form: 'Capsules',
      dosage: '500mg standardized curcumin extract',
      usage: '2–3 times daily with meals'
    },
    {
      form: 'Fresh Root',
      dosage: '1-3g daily',
      usage: 'Used in cooking or brewed as tea'
    },
    {
      form: 'Herbal Blends',
      dosage: 'As directed',
      usage: 'Combined with ginger, cinnamon, or black pepper'
    }
  ],
  
  safety_warnings: [
    'Generally safe but may cause mild stomach upset in some people',
    'May interact with blood thinners or diabetes medications',
    'Consult your doctor before use if pregnant, breastfeeding, or taking medications',
    'Avoid if you have gallstones or bile duct obstruction'
  ],
  
  interactions: [
    'Blood-thinning medications (warfarin)',
    'Diabetes medications (may affect blood sugar)',
    'Chemotherapy drugs (may interfere with some treatments)',
    'Iron supplements (may reduce absorption)'
  ],
  
  scientific_evidence: 'Research supports turmeric\'s role in reducing inflammation, easing arthritis symptoms, aiding digestion, and potentially improving brain function and mood. Curcumin is one of the most studied natural compounds for these benefits, with over 3,000 published studies.',
  
  constitution_match: [
    {
      type: 'Blood Stasis',
      suitable: 'yes',
      description: 'Excellent for improving circulation and reducing stagnation'
    },
    {
      type: 'Phlegm-Damp',
      suitable: 'yes',
      description: 'Helps transform dampness and support digestion'
    },
    {
      type: 'Cold Constitution',
      suitable: 'yes',
      description: 'Warming properties support those with cold symptoms'
    },
    {
      type: 'Heat Excess',
      suitable: 'warning',
      description: 'Use moderately; monitor for increased heat symptoms'
    }
  ],
  
  pairs_well_with: [
    'Black pepper (piperine) – to enhance absorption',
    'Ginger – to boost anti-inflammatory and digestive support',
    'Cinnamon and cardamom – in herbal formulas',
    'Healthy fats – to improve curcumin absorption'
  ],
  
  user_stories: [
    {
      quote: 'Turmeric capsules helped reduce my knee pain and gave me more mobility.',
      author: 'Anna W.',
      location: 'Chicago'
    },
    {
      quote: 'I drink turmeric tea daily to support my digestion and energy.',
      author: 'Mark L.',
      location: 'London'
    }
  ],
  
  faqs: [
    {
      question: 'Can turmeric replace my arthritis medication?',
      answer: 'Turmeric can complement treatment but should not replace prescribed medicines without doctor advice.'
    },
    {
      question: 'How can I improve turmeric absorption?',
      answer: 'Taking turmeric with black pepper or healthy fats enhances absorption significantly.'
    },
    {
      question: 'Is turmeric safe to use every day?',
      answer: 'Generally yes for most people, but consult your healthcare provider for personalized advice.'
    },
    {
      question: 'What\'s the difference between turmeric and curcumin?',
      answer: 'Turmeric is the whole spice, while curcumin is the active compound. Curcumin supplements are more concentrated.'
    }
  ],
  
  seo_keywords: ['turmeric benefits', 'curcumin supplement', 'natural anti-inflammatory', 'turmeric dosage', 'turmeric for joint pain'],
  properties: ['Anti-inflammatory', 'Antioxidant', 'Digestive Support', 'Joint Health']
};

async function updateHerbsDatabase() {
  try {
    console.log('🌿 Starting herbs database update...');
    
    // 检查是否有现有的数据库文件
    const dbFiles = [
      'herbs-database-2025-06-19.json',
      'herbs-database-fixed-2025-06-19.json',
      'lib/herbs-data-complete.ts'
    ];
    
    let updated = false;
    
    for (const file of dbFiles) {
      if (fs.existsSync(file)) {
        console.log(`📁 Found database file: ${file}`);
        
        if (file.endsWith('.json')) {
          // 处理JSON文件
          const data = JSON.parse(fs.readFileSync(file, 'utf8'));
          
          // 检查是否已存在turmeric
          const existingTurmeric = data.find(herb => herb.slug === 'turmeric' || herb.id === 'turmeric');
          
          if (!existingTurmeric) {
            data.push(turmericData);
            fs.writeFileSync(file, JSON.stringify(data, null, 2));
            console.log(`✅ Added Turmeric to ${file}`);
            updated = true;
          } else {
            console.log(`ℹ️  Turmeric already exists in ${file}`);
          }
        } else if (file.endsWith('.ts')) {
          // 处理TypeScript文件
          const content = fs.readFileSync(file, 'utf8');
          
          if (!content.includes('turmeric') && !content.includes('Turmeric')) {
            // 在文件末尾添加turmeric数据
            const turmericTs = `
  turmeric: ${JSON.stringify(turmericData, null, 2).replace(/"([^"]+)":/g, '$1:')},`;
            
            // 找到export语句前的位置
            const exportIndex = content.lastIndexOf('export');
            if (exportIndex > 0) {
              const beforeExport = content.substring(0, exportIndex);
              const afterExport = content.substring(exportIndex);
              
              // 在最后一个条目后添加turmeric
              const newContent = beforeExport.replace(/};(\s*)$/, `  ${turmericTs}\n};\n$1`) + afterExport;
              
              fs.writeFileSync(file, newContent);
              console.log(`✅ Added Turmeric to ${file}`);
              updated = true;
            }
          } else {
            console.log(`ℹ️  Turmeric already exists in ${file}`);
          }
        }
      }
    }
    
    if (updated) {
      console.log('🎉 Database update completed successfully!');
      console.log('📋 Turmeric herb data:');
      console.log(`   - Name: ${turmericData.name} (${turmericData.chinese_name})`);
      console.log(`   - Category: ${turmericData.category}`);
      console.log(`   - Safety Level: ${turmericData.safety_level}`);
      console.log(`   - Evidence Level: ${turmericData.evidence_level}`);
      console.log(`   - Benefits: ${turmericData.benefits.length} listed`);
      console.log(`   - FAQs: ${turmericData.faqs.length} questions`);
      console.log(`   - SEO Keywords: ${turmericData.seo_keywords.join(', ')}`);
    } else {
      console.log('ℹ️  No updates needed - Turmeric data already present');
    }
    
  } catch (error) {
    console.error('❌ Error updating herbs database:', error.message);
    throw error;
  }
}

// 运行更新函数
if (require.main === module) {
  updateHerbsDatabase()
    .then(() => {
      console.log('✨ Update completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Update failed:', error);
      process.exit(1);
    });
}

module.exports = { updateHerbsDatabase, turmericData }; 