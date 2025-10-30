/**
 * 将中文博客文章添加到 Sanity CMS
 * 运行: node add-zh-blog-posts-to-sanity.js
 */

const { createClient } = require('@sanity/client')

// Sanity 配置
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVLqFpkcfbSL5Nusr5MT7kc0QRBdU49YLVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限 token
  useCdn: false
})

// 中文博客文章数据
const zhBlogPosts = [
  {
    _id: 'zh-blog-1758713619593',
    _type: 'blogPost',
    title: '红洋葱 vs 白洋葱：哪个更健康？（科学对比）',
    slug: {
      _type: 'slug',
      current: 'red-onion-vs-white-onion-health-benefits-zh'
    },
    excerpt: '红洋葱和白洋葱，哪个更健康？发现抗氧化剂、槲皮素、花青素、消化益处的关键差异，以及如何使用它们以获得最大健康效益。基于证据的中文指南。',
    publishedAt: '2025-01-27',
    readTime: 8,
    featured: true,
    status: 'published',
    author: '曾楚平 (Zeng Chuping)',
    category: '科学研究',
    tags: ['红洋葱vs白洋葱', '洋葱健康益处', '腌洋葱益处', '哪些人不应该吃洋葱', '洋葱降胆固醇', '洋葱抗氧化剂', '槲皮素', '花青素', '洋葱助消化', '自然疗法'],
    seoTitle: '红洋葱 vs 白洋葱：哪个更健康？（科学对比）| HerbScience',
    seoDescription: '红洋葱和白洋葱，哪个更健康？发现抗氧化剂、槲皮素、花青素、消化益处的关键差异，以及如何使用它们以获得最大健康效益。',
    seoKeywords: ['红洋葱', '白洋葱', '洋葱健康', '槲皮素', '花青素', '抗氧化剂', '降胆固醇', '消化健康'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '红洋葱 vs 白洋葱：营养价值对比' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '红洋葱富含花青素和更高浓度的槲皮素，这使其在抗氧化能力方面优于白洋葱。白洋葱则含有更多的硫化合物，有助于消化和抗菌作用。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '如何选择适合您的洋葱' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '如果您想获得更强的抗氧化保护和心血管健康支持，选择红洋葱。如果您需要消化支持和抗菌作用，白洋葱是更好的选择。两者都可以作为日常饮食的重要组成部分。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619592',
    _type: 'blogPost',
    title: '生姜片 vs 生姜软糖：哪种对恶心和腹胀更有效？',
    slug: {
      _type: 'slug',
      current: 'ginger-tablets-chews-nausea-bloating-guide-zh'
    },
    excerpt: '感觉腹胀或恶心？了解生姜片的益处、治疗恶心的生姜软糖，以及为什么这种古老的根茎是你肠胃的最佳朋友。包含DIY配方和真实效果的完整指南。',
    publishedAt: '2025-01-26',
    readTime: 8,
    featured: true,
    status: 'published',
    author: '曾楚平 (Zeng Chuping)',
    category: '生活方式',
    tags: ['生姜片益处', '生姜软糖治恶心', '生姜胶囊益处', '生姜补充剂治恶心', '喝姜茶的好处', '自然疗法', '消化健康', '晕动症', '腹胀缓解'],
    seoTitle: '生姜片 vs 生姜软糖：哪种对恶心和腹胀更有效？| HerbScience',
    seoDescription: '感觉腹胀或恶心？了解生姜片的益处、治疗恶心的生姜软糖，以及为什么这种古老的根茎是你肠胃的最佳朋友。',
    seoKeywords: ['生姜片', '生姜软糖', '生姜治恶心', '生姜胶囊', '姜茶', '消化健康', '晕动症', '腹胀'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '生姜为什么能缓解恶心？' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '生姜含有姜辣素和姜烯酚，这些化合物可以放松胃肠道肌肉，促进消化液分泌，并减少引发恶心的信号传递。临床研究表明，生姜对孕吐、晕车和化疗引起的恶心都有显著效果。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '生姜片 vs 生姜软糖：如何选择' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '生姜片适合需要快速吸收和标准化剂量的人群，而生姜软糖更适合不喜欢吞咽药片的人。两者都有效，选择取决于个人偏好和具体需求。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619591',
    _type: 'blogPost',
    title: '姜茶缓解痛经：真正有效的自然经期疼痛缓解方法',
    slug: {
      _type: 'slug',
      current: 'ginger-tea-menstrual-cramps-natural-relief-zh'
    },
    excerpt: '厌倦了被经期疼痛控制生活？了解姜茶如何提供自然缓解痛经的方法。发现何时喝姜茶、如何使用生姜缓解月经痉挛，以及为什么它的效果堪比布洛芬。',
    publishedAt: '2025-01-26',
    readTime: 7,
    featured: true,
    status: 'published',
    author: '曾楚平 (Zeng Chuping)',
    category: '生活方式',
    tags: ['姜茶缓解痛经', '经期喝姜茶', '生姜治疗经期疼痛', '自然经期疼痛缓解', '如何使用生姜缓解月经痉挛', '生姜根治痛经', '经期疼痛疗法', '女性健康', '自然疗法'],
    seoTitle: '姜茶缓解痛经：真正有效的自然经期疼痛缓解方法 | HerbScience',
    seoDescription: '了解姜茶如何自然缓解痛经。发现何时喝姜茶、如何使用它，以及为什么它的效果堪比布洛芬。药剂师提供的循证指南。',
    seoKeywords: ['姜茶', '痛经', '经期疼痛', '月经痉挛', '生姜', '女性健康', '自然疗法', '经期缓解'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '姜茶为什么能缓解痛经？' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '生姜含有天然的抗炎化合物，可以抑制前列腺素的产生——这是引起子宫收缩和疼痛的主要物质。研究显示，生姜在减轻经期疼痛方面的效果与非甾体抗炎药（如布洛芬）相当。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '如何正确饮用姜茶缓解痛经' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '在月经来临前2-3天开始饮用姜茶，每天2-3杯。使用新鲜生姜切片煮水，加入蜂蜜和柠檬调味。持续饮用整个经期，以获得最佳效果。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619590',
    _type: 'blogPost',
    title: '南非醉茄对女性的益处：荷尔蒙失衡、压力与功效',
    slug: {
      _type: 'slug',
      current: 'ashwagandha-for-women-hormone-balance-zh'
    },
    excerpt: '了解南非醉茄（Ashwagandha）对女性健康的益处：平衡荷尔蒙、减轻压力、改善睡眠。学习安全剂量、副作用，以及南非醉茄的功效。药剂师提供的循证指南。',
    publishedAt: '2025-01-26',
    readTime: 8,
    featured: true,
    status: 'published',
    author: '曾楚平 (Zeng Chuping)',
    category: '科学研究',
    tags: ['南非醉茄女性益处', '南非醉茄治荷尔蒙失衡', '南非醉茄对女性的副作用', '南非醉茄功效', '缓解压力焦虑的最佳草药', '南非醉茄女性', '适应原草药', '荷尔蒙平衡', '女性健康'],
    seoTitle: '南非醉茄对女性的益处：荷尔蒙失衡、压力与睡眠解决方案 | HerbScience',
    seoDescription: '了解南非醉茄对女性健康的益处：平衡荷尔蒙、减轻压力、改善睡眠。学习安全剂量和副作用。药剂师提供的循证指南。',
    seoKeywords: ['南非醉茄', '女性健康', '荷尔蒙平衡', '压力缓解', '适应原', '女性益处', '焦虑', '睡眠'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '南非醉茄如何帮助女性平衡荷尔蒙' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '南非醉茄是一种适应原草药，可以帮助身体适应压力并调节皮质醇水平。对于女性而言，它可以支持甲状腺功能、平衡性激素，并改善与荷尔蒙失衡相关的症状，如月经不规律、焦虑和疲劳。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '安全剂量和注意事项' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '建议剂量为每天300-600mg标准化提取物（含5%的醉茄内酯）。孕妇和哺乳期女性应避免使用。如果您正在服用甲状腺药物或免疫抑制剂，请在使用前咨询医生。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619589',
    _type: 'blogPost',
    title: '为什么红景天对某些人有效而对其他人无效 — 如何根据体质正确服用',
    slug: {
      _type: 'slug',
      current: 'why-rhodiola-works-body-type-zh'
    },
    excerpt: '发现为什么红景天（Rhodiola crenulata）的益处因人而异。学习如何根据中医体质正确服用红景天。包含剂量、时机和草药配伍的完整指南，以获得最佳效果。',
    publishedAt: '2025-01-23',
    readTime: 10,
    featured: true,
    status: 'published',
    author: '陈博士, HerbScience团队',
    category: '科学研究',
    tags: ['红景天益处', '红景天功效', '如何服用红景天', '服用红景天的最佳时间', '红景天剂量', '红景天补充剂益处', '中医体质', '适应原草药', '个性化补充剂'],
    seoTitle: '为什么红景天对某些人有效而对其他人无效 — 根据体质正确服用 | HerbScience',
    seoDescription: '发现为什么红景天的益处因人而异。学习如何根据中医体质正确服用红景天，以获得最佳效果。',
    seoKeywords: ['红景天', '红景天益处', '中医体质', '适应原', '如何服用', '红景天剂量', '个性化', '体质'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '红景天为什么不是对所有人都有效' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '红景天是一种适应原草药，其效果取决于个人的体质和能量状态。在中医理论中，红景天最适合"气虚"和"阳虚"体质的人群，但对于"阴虚火旺"体质可能会加重症状。了解自己的体质是获得最佳效果的关键。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '如何根据体质正确使用红景天' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '气虚体质：早晨服用200-400mg，持续6-8周。阳虚体质：与黄芪、党参配伍使用。阴虚体质：谨慎使用或选择其他草药如枸杞、麦冬。进行体质测试以获得个性化建议。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619588',
    _type: 'blogPost',
    title: '红景天茶配方：提升能量与专注力 — 找到适合您体质的最佳配方',
    slug: {
      _type: 'slug',
      current: 'rhodiola-tea-recipes-energy-focus-zh'
    },
    excerpt: '发现简单的红景天茶配方，提升能量、改善专注力并减轻疲劳。学习如何制作红景天茶，并使用中医启发的草药配伍定制适合您体质的配方。',
    publishedAt: '2025-01-22',
    readTime: 8,
    featured: true,
    status: 'published',
    author: 'HerbScience团队',
    category: '生活方式',
    tags: ['红景天茶', '红景天茶配方', '红景天茶益处', '适应原茶', '红景天提能量', '红景天提专注力', '草药茶配方', '中医', '红景天配人参', '红景天抗疲劳'],
    seoTitle: '红景天茶配方：提升能量与专注力 — 适合您体质的最佳配方 | HerbScience',
    seoDescription: '发现简单的红景天茶配方，提升能量、改善专注力。学习如何制作红景天茶，并定制适合您体质的配方。',
    seoKeywords: ['红景天茶', '红景天茶配方', '适应原茶', '提升能量', '改善专注力', '草药茶', '中医配方'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '基础红景天茶配方' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '将3-6克干红景天根放入250毫升水中，小火煮10-15分钟。每天早晨饮用一次。可以加入蜂蜜或枸杞增强风味和功效。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '红景天茶的草药配伍' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '红景天 + 人参：增强持久能量和耐力。红景天 + 枸杞：滋养肝肾，改善视力。红景天 + 虫草：提升运动表现和恢复能力。根据您的体质选择合适的配伍。' }]
      }
    ]
  },
  {
    _id: 'zh-blog-1758713619587',
    _type: 'blogPost',
    title: '聪明服用红景天的方法 — 日常习惯、配方与体质建议',
    slug: {
      _type: 'slug',
      current: 'rhodiola-smart-way-daily-rituals-zh'
    },
    excerpt: '学习服用红景天的最佳时间、提升能量的最佳剂量、简单配方，以及如何与其他草药配伍。有效使用红景天补充剂缓解压力和提升心智清晰度的完整指南。',
    publishedAt: '2025-01-22',
    readTime: 7,
    featured: true,
    status: 'published',
    author: 'HerbScience团队',
    category: '生活方式',
    tags: ['红景天', '适应原草药', '如何服用红景天', '红景天剂量', '红景天配方', '红景天茶', '自然能量', '压力缓解', '红景天配人参', '服用红景天的最佳时间'],
    seoTitle: '聪明服用红景天的方法 — 日常习惯、配方与体质建议 | HerbScience',
    seoDescription: '学习服用红景天的最佳时间、最佳剂量、简单配方，以及如何与其他草药配伍。有效使用红景天的完整指南。',
    seoKeywords: ['红景天', '适应原', '如何服用', '最佳时间', '剂量', '配方', '压力缓解', '自然能量'],
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '服用红景天的最佳时间' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '最佳服用时间是早晨或午餐前，因为红景天具有提升能量的作用。避免晚上服用，以免影响睡眠。空腹服用吸收效果更好，但如果胃部敏感，可以在饭后服用。' }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '红景天的循环使用方法' }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '连续使用6-8周后，休息1周以保持效果。这种循环使用方法可以防止身体对红景天产生耐受性，确保持续获得益处。' }]
      }
    ]
  }
]

// 辅助函数：创建或更新作者
async function ensureAuthor(authorName) {
  try {
    // 检查作者是否已存在
    const existingAuthor = await client.fetch(
      `*[_type == "author" && name == $name][0]`,
      { name: authorName }
    )

    if (existingAuthor) {
      console.log(`✅ 作者已存在: ${authorName}`)
      return existingAuthor._id
    }

    // 创建新作者
    const newAuthor = await client.create({
      _type: 'author',
      name: authorName,
      bio: `${authorName} 是 HerbScience 的专业撰稿人，专注于草药研究和中医养生。`,
      expertise: ['中医', '草药学', '营养学']
    })

    console.log(`✅ 创建新作者: ${authorName}`)
    return newAuthor._id
  } catch (error) {
    console.error(`❌ 处理作者时出错: ${authorName}`, error.message)
    return null
  }
}

// 辅助函数：创建或获取分类
async function ensureCategory(categoryName) {
  try {
    // 检查分类是否已存在
    const existingCategory = await client.fetch(
      `*[_type == "category" && title == $title][0]`,
      { title: categoryName }
    )

    if (existingCategory) {
      console.log(`✅ 分类已存在: ${categoryName}`)
      return existingCategory._id
    }

    // 创建新分类
    const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    const newCategory = await client.create({
      _type: 'category',
      title: categoryName,
      slug: {
        _type: 'slug',
        current: slugify(categoryName)
      },
      description: `${categoryName}相关文章`
    })

    console.log(`✅ 创建新分类: ${categoryName}`)
    return newCategory._id
  } catch (error) {
    console.error(`❌ 处理分类时出错: ${categoryName}`, error.message)
    return null
  }
}

// 辅助函数：创建或获取标签
async function ensureTag(tagName) {
  try {
    // 检查标签是否已存在
    const existingTag = await client.fetch(
      `*[_type == "tag" && title == $title][0]`,
      { title: tagName }
    )

    if (existingTag) {
      return existingTag._id
    }

    // 创建新标签
    const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
    const newTag = await client.create({
      _type: 'tag',
      title: tagName,
      slug: {
        _type: 'slug',
        current: slugify(tagName)
      }
    })

    console.log(`✅ 创建新标签: ${tagName}`)
    return newTag._id
  } catch (error) {
    console.error(`❌ 处理标签时出错: ${tagName}`, error.message)
    return null
  }
}

// 主函数：添加中文博客文章
async function addZhBlogPosts() {
  console.log('🚀 开始添加中文博客文章到 Sanity...\n')

  for (const post of zhBlogPosts) {
    try {
      console.log(`\n📝 处理文章: ${post.title}`)

      // 检查文章是否已存在
      const existingPost = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]`,
        { slug: post.slug.current }
      )

      if (existingPost) {
        console.log(`⚠️  文章已存在，跳过: ${post.slug.current}`)
        continue
      }

      // 确保作者存在
      const authorId = await ensureAuthor(post.author)
      
      // 确保分类存在
      const categoryId = await ensureCategory(post.category)

      // 确保标签存在
      const tagIds = []
      for (const tagName of post.tags) {
        const tagId = await ensureTag(tagName)
        if (tagId) tagIds.push({ _type: 'reference', _ref: tagId })
      }

      // 准备博客文章数据
      const blogPostData = {
        _id: post._id,
        _type: 'blogPost',
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        readTime: post.readTime,
        featured: post.featured,
        status: post.status,
        author: authorId ? { _type: 'reference', _ref: authorId } : post.author,
        category: categoryId ? { _type: 'reference', _ref: categoryId } : undefined,
        tags: tagIds,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords
      }

      // 创建博客文章
      const result = await client.create(blogPostData)
      console.log(`✅ 成功添加文章: ${post.title} (ID: ${result._id})`)

    } catch (error) {
      console.error(`❌ 添加文章失败: ${post.title}`)
      console.error(`   错误信息: ${error.message}`)
    }
  }

  console.log('\n🎉 中文博客文章添加完成！')
  console.log('\n📊 统计信息:')
  console.log(`   - 处理文章数: ${zhBlogPosts.length}`)
  console.log(`   - 成功添加: 请查看上方日志`)
}

// 执行脚本
addZhBlogPosts().catch(error => {
  console.error('❌ 脚本执行失败:', error)
  process.exit(1)
})

