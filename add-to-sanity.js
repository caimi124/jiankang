// 直接向Sanity CMS添加博客文章
const { createClient } = require('@sanity/client');

// 使用提供的编辑权限API token
const client = createClient({
  projectId: '13rzzwgz',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sk7J8olzdUL0U66G5UXJXrhATzLAQ8LxVgSbgryxhk4gEmqUghhZ5haAym9DvhTubA2Hu7Z2nnG18zOXN0oDegpO8t6MhPcEzRsniIwiRgPSQQsZlqgjJZ6aX7YqiFlH67iH6pC9vWEontHNkWAp', // 编辑权限token
});

async function addBlogPostToSanity() {
  try {
    console.log('=== 向Sanity CMS添加博客文章 ===\n');

    // 首先检查是否已存在相同slug的文章
    const existingPost = await client.fetch(
      `*[_type == "blogPost" && slug.current == "why-some-herbs-work-for-you-and-others-dont"][0]`
    );

    if (existingPost) {
      console.log('⚠️ 该文章已存在于Sanity中');
      console.log('文章标题:', existingPost.title);
      console.log('文章ID:', existingPost._id);
      console.log('状态:', existingPost.status);
      return;
    }

    // 准备文章数据
    const articleDoc = {
      _type: 'blogPost',
      title: 'Why Some Herbs Work for You and Others Do Not',
      slug: {
        _type: 'slug',
        current: 'why-some-herbs-work-for-you-and-others-dont'
      },
      excerpt: 'Discover the fascinating science behind individual herb effectiveness. Learn why the same herb can work wonders for some people but not others, and how to find what works best for your unique body chemistry.',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Have you ever wondered why your friend swears by ashwagandha for stress relief, but when you try it, you feel no different? Or why turmeric seems to work miracles for some people\'s joint pain, while others see no improvement at all?'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The answer lies in the fascinating world of personalized herbal medicine—a field that\'s revolutionizing how we understand plant-based healing.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h2',
          children: [
            {
              _type: 'span',
              text: 'Your Unique Biological Blueprint'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Every person\'s body is like a unique biochemical fingerprint. Several factors determine how your body responds to herbs:'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: '1. Genetic Variations'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Your genes control how your body processes compounds. For example, some people have genetic variants that make them "fast metabolizers" of certain compounds, while others are "slow metabolizers." This affects how quickly herbs are absorbed, used, and eliminated from your system.'
            }
          ]
        },
        {
          _type: 'block',
          style: 'h3',
          children: [
            {
              _type: 'span',
              text: '2. Gut Microbiome'
            }
          ]
        },
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'The trillions of bacteria in your digestive system play a crucial role in breaking down herbal compounds. Different people have vastly different gut bacteria compositions, which can dramatically affect how well they absorb and utilize herbal nutrients.'
            }
          ]
        }
      ],
      author: {
        _type: 'reference',
        _ref: 'author-dr-sarah-chen' // 需要确保这个作者存在
      },
      category: {
        _type: 'reference',
        _ref: 'category-science' // 需要确保这个分类存在
      },
      tags: [
        {
          _type: 'reference',
          _ref: 'tag-personalized-medicine'
        },
        {
          _type: 'reference',
          _ref: 'tag-herb-effectiveness'
        }
      ],
      featured: true,
      publishedAt: '2024-01-15T00:00:00.000Z',
      readTime: 9,
      seoTitle: 'Why Some Herbs Work for You and Others Do Not | HerbScience',
      seoDescription: 'Discover the fascinating science behind individual herb effectiveness. Learn why the same herb can work wonders for some people but not others.',
      seoKeywords: ['personalized medicine', 'herb effectiveness', 'genetic factors', 'individual response', 'herbal science'],
      status: 'published'
    };

    console.log('正在创建博客文章...');

    // 创建文章
    const result = await client.create(articleDoc);

    console.log('✅ 文章创建成功！');
    console.log('文章ID:', result._id);
    console.log('文章标题:', result.title);
    console.log('Slug:', result.slug.current);
    console.log('状态:', result.status);

    console.log('\n🎉 文章现在应该在Sanity CMS中可见');
    console.log('🌐 前端博客页面应该可以显示这篇文章');

    return result;

  } catch (error) {
    console.error('❌ 创建文章失败:', error.message);

    if (error.statusCode === 401) {
      console.error('认证失败 - 请检查API token是否正确');
    } else if (error.statusCode === 403) {
      console.error('权限不足 - 请确保token有写入权限');
    } else if (error.details) {
      console.error('详细错误:', error.details);
    }

    return null;
  }
}

// 创建必需的引用文档（如果不存在）
async function ensureReferences() {
  try {
    console.log('检查并创建必要的引用文档...\n');

    // 检查并创建作者
    const existingAuthor = await client.fetch(
      `*[_type == "author" && _id == "author-dr-sarah-chen"][0]`
    );

    if (!existingAuthor) {
      console.log('创建作者: Dr. Sarah Chen');
      await client.create({
        _type: 'author',
        _id: 'author-dr-sarah-chen',
        name: 'Dr. Sarah Chen',
        bio: 'Herbal medicine researcher and practitioner specializing in evidence-based phytotherapy.',
        expertise: ['herbal medicine', 'nutrigenomics', 'personalized health']
      });
    } else {
      console.log('✅ 作者已存在: Dr. Sarah Chen');
    }

    // 检查并创建分类
    const existingCategory = await client.fetch(
      `*[_type == "category" && _id == "category-science"][0]`
    );

    if (!existingCategory) {
      console.log('创建分类: Science');
      await client.create({
        _type: 'category',
        _id: 'category-science',
        title: 'science',
        description: 'Research, safety studies, and evidence-based insights'
      });
    } else {
      console.log('✅ 分类已存在: Science');
    }

    // 检查并创建标签
    const tags = [
      { id: 'tag-personalized-medicine', title: 'personalized medicine' },
      { id: 'tag-herb-effectiveness', title: 'herb effectiveness' },
      { id: 'tag-genetic-factors', title: 'genetic factors' },
      { id: 'tag-individual-response', title: 'individual response' },
      { id: 'tag-herbal-science', title: 'herbal science' }
    ];

    for (const tag of tags) {
      const existingTag = await client.fetch(
        `*[_type == "tag" && _id == "${tag.id}"][0]`
      );

      if (!existingTag) {
        console.log(`创建标签: ${tag.title}`);
        await client.create({
          _type: 'tag',
          _id: tag.id,
          title: tag.title
        });
      } else {
        console.log(`✅ 标签已存在: ${tag.title}`);
      }
    }

  } catch (error) {
    console.error('创建引用文档时出错:', error.message);
  }
}

// 执行添加流程
async function main() {
  console.log('=== Sanity博客文章添加流程 ===\n');

  // 首先创建必要的引用文档
  await ensureReferences();

  console.log('\n=== 添加博客文章 ===');

  // 然后创建博客文章
  const result = await addBlogPostToSanity();

  if (result) {
    console.log('\n🚀 部署建议:');
    console.log('1. 文章已添加到Sanity CMS');
    console.log('2. 本地代码也已更新（作为备用）');
    console.log('3. 重新部署网站以查看更改');
    console.log('4. 访问 https://herbscience.shop/blog 查看文章列表');
    console.log('5. 访问 https://herbscience.shop/blog/why-some-herbs-work-for-you-and-others-dont 查看文章详情');
  }
}

main();