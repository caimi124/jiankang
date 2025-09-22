const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});

// SEO-optimized blog articles with TCM constitution focus
const blogArticles = [
  {
    title: "Why Personalized Herbal Supplements Work Better Than One-Size-Fits-All Remedies",
    slug: "personalized-herbal-supplements-constitution-based",
    excerpt: "Discover why some herbs work for you while others don't, and how TCM constitution testing can help you choose the right herbal remedies for your unique body type.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Walk into any supplement store and you\'ll see shelves stacked with herbal capsules and teas: ginseng for energy, echinacea for immunity, valerian for sleep. Sounds simple, right? Take the herb, feel the benefit.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'But reality isn\'t that straightforward.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Some people swear ginseng makes them feel amazing.\n• Others take it and feel nothing.\n• A few even feel worse—more jittery, more tired, or off balance.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'It\'s just like coffee: some people get a boost, others feel anxious, and some can drink a cup before bed and still sleep soundly. Herbs are the same—your body\'s response depends on your '
          },
          {
            _type: 'span',
            text: 'individual constitution and body type',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: '.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Problem With "One-Size-Fits-All" Herbal Remedies'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Most people in the West use '
          },
          {
            _type: 'span',
            text: 'natural supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' in a one-size-fits-all way. Buy a bottle, follow the label, hope it works.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'But your body isn\'t "average." Giving everyone the same herb for fatigue is like giving everyone the same dose of caffeine—it helps some, hurts others, and leaves many unaffected.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'What\'s missing is a systematic way to match the right herb to the right person—a way to choose '
          },
          {
            _type: 'span',
            text: 'personalized herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' based on your body\'s patterns and needs.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How a Constitution Test Helps You Find the Right Herbal Remedies'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'For over 2,000 years, Traditional Chinese Medicine has used a method called syndrome differentiation to choose herbs scientifically. Instead of guessing, practitioners observe your body and lifestyle:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Are you prone to fatigue, feeling cold, or low energy?\n• Do you tend to feel restless, hot, or over-stimulated?\n• Are you naturally more sluggish or more energetic?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Based on these observations through a '
          },
          {
            _type: 'span',
            text: 'constitution test or body type test',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ', herbs are chosen to fit your personal constitution.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Real Examples: Same Herb, Different Effects'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Ginseng',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' often helps people with low energy, sluggishness, or weakened immunity—but can overstimulate those who are naturally high-energy or anxious.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Valerian and chamomile',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' are classic '
          },
          {
            _type: 'span',
            text: 'stress relief herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that support those struggling with stress or insomnia, but may feel sedating for people who are already calm sleepers.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Turmeric',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' is excellent for inflammation and digestive support, but its warming nature may not suit those with heat-type constitutions.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Safe Herbal Use: Why Personalization Matters'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ever wonder why your friend swears by an herb that did nothing for you? That\'s why. '
          },
          {
            _type: 'span',
            text: 'Safe herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' aren\'t just about avoiding side effects—they\'re about finding what actually works for your unique body.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• The '
          },
          {
            _type: 'span',
            text: 'right herb',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' can restore balance, boost energy, and improve focus.\n• The '
          },
          {
            _type: 'span',
            text: 'wrong one',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' might leave you jittery, tired, or out of balance.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How to Choose Herbs for Focus and Energy Based on Your Constitution'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The good news? You don\'t need a medical degree to start. Simple constitution tests can help identify your needs:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Look for '
          },
          {
            _type: 'span',
            text: 'herbs for focus and energy',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that match your pattern—whether you need gentle stimulation or calming focus support.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Choose '
          },
          {
            _type: 'span',
            text: 'immune boosting herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' based on whether you tend toward deficiency (need building) or excess (need clearing) patterns.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Pay attention to safety: even natural supplements have side effects if they don\'t match your body through proper '
          },
          {
            _type: 'span',
            text: 'safe herbal use',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' principles.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Takeaway: Pattern-Based Herbal Selection'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Herbs are powerful—but only when they fit your body. Forget one-size-fits-all. Think '
          },
          {
            _type: 'span',
            text: 'personalized herbal supplements, safe herbal guidance, and pattern-based herbal use',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: '. By aligning herbs with your constitution through a proper body type test, you unlock their real potential—for energy, immunity, stress relief, and focus.'
          }
        ]
      }
    ],
    seoTitle: "Personalized Herbal Supplements: Why Constitution Testing Works Better",
    seoDescription: "Discover why some herbs work for you while others don't. Learn how TCM constitution testing helps you choose the right herbal remedies for your unique body type.",
    seoKeywords: [
      "personalized herbal supplements",
      "herbal remedies",
      "constitution test",
      "body type test",
      "safe herbal supplements",
      "TCM constitution",
      "herbs for focus and energy",
      "stress relief herbs",
      "immune boosting herbs",
      "natural supplements",
      "pattern-based herbal use"
    ],
    category: "lifestyle",
    tags: ["TCM", "constitution types", "personalized medicine", "herbal safety"],
    readTime: 8,
    featured: true
  },
  {
    title: "The 9 TCM Constitution Types: Your Personal Guide to Herbal Selection",
    slug: "tcm-constitution-types-herbal-guide",
    excerpt: "Learn about the 9 constitution types in Traditional Chinese Medicine and how they guide personalized herb selection for optimal health and wellness.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In Traditional Chinese Medicine, your constitution is like your body\'s blueprint—it determines how you respond to foods, herbs, stress, and even weather. Understanding your constitution type helps you choose the right '
          },
          {
            _type: 'span',
            text: 'herbal remedies',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that work with your body, not against it.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'What Are TCM Constitution Types?'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'TCM recognizes 9 distinct constitution types, each with unique characteristics, strengths, and vulnerabilities. This system helps practitioners prescribe '
          },
          {
            _type: 'span',
            text: 'personalized herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that address your specific needs rather than following a one-size-fits-all approach.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The 9 Constitution Types and Their Herbal Matches'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '1. Balanced Constitution (Ping He)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Good energy, stable mood, normal sleep, healthy digestion\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Gentle tonics like goji berries, jujube dates, moderate ginseng\n• '
          },
          {
            _type: 'span',
            text: 'Focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Maintenance and prevention rather than strong intervention'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '2. Qi Deficiency (Qi Xu)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Chronic fatigue, weak voice, frequent colds, poor digestion\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' '
          },
          {
            _type: 'span',
            text: 'Immune boosting herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' like astragalus, codonopsis, American ginseng\n• '
          },
          {
            _type: 'span',
            text: 'Avoid:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Overly stimulating herbs that can further deplete energy'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '3. Yang Deficiency (Yang Xu)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Always cold, low energy, sluggish digestion, frequent urination\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Warming herbs like cinnamon, ginger, Korean ginseng, deer antler\n• '
          },
          {
            _type: 'span',
            text: 'Focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Building internal warmth and metabolic fire'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '4. Yin Deficiency (Yin Xu)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Hot flashes, dry skin, insomnia, night sweats, anxiety\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Cooling, nourishing herbs like rehmannia, lily bulb, tremella mushroom\n• '
          },
          {
            _type: 'span',
            text: 'Avoid:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Warming, drying herbs that increase internal heat'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '5. Phlegm-Dampness (Tan Shi)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Weight gain, bloating, fatigue after eating, foggy thinking\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Drying, moving herbs like tangerine peel, hawthorn, poria\n• '
          },
          {
            _type: 'span',
            text: 'Focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Transforming dampness and supporting metabolism'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '6. Damp-Heat (Shi Re)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Skin issues, bitter taste, irritability, digestive inflammation\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Clearing herbs like dandelion, burdock, gentian, turmeric\n• '
          },
          {
            _type: 'span',
            text: 'Avoid:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Greasy, warming foods and supplements'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '7. Blood Stasis (Xue Yu)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Dark circles, poor circulation, chronic pain, irregular periods\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Blood-moving herbs like turmeric, safflower, red peony, salvia\n• '
          },
          {
            _type: 'span',
            text: 'Focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Improving circulation and reducing inflammation'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '8. Qi Stagnation (Qi Yu)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Mood swings, PMS, digestive issues triggered by stress\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' '
          },
          {
            _type: 'span',
            text: 'Stress relief herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' like bupleurum, rose petals, jasmine, passionflower\n• '
          },
          {
            _type: 'span',
            text: 'Focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Moving stagnant energy and emotional balance'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: '9. Special Constitutions (Te Bing)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Characteristics:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Allergies, sensitivities, autoimmune tendencies\n• '
          },
          {
            _type: 'span',
            text: 'Best herbs:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Mild, regulating herbs like reishi mushroom, schisandra, licorice\n• '
          },
          {
            _type: 'span',
            text: 'Approach:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Extra caution with '
          },
          {
            _type: 'span',
            text: 'safe herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' and gradual introduction'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'How to Take a Constitution Test'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'A proper '
          },
          {
            _type: 'span',
            text: 'body type test',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' evaluates multiple factors:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• Energy patterns (morning vs. evening, seasonal changes)\n• Temperature preferences (always cold, always hot, comfortable)\n• Digestive patterns (strong appetite, bloating, food sensitivities)\n• Sleep quality and stress response\n• Emotional tendencies and mental clarity'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Practical Application: Choosing Your Herbal Program'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Once you know your constitution, choosing '
          },
          {
            _type: 'span',
            text: 'natural supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' becomes much more targeted:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'For energy and focus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Yang deficiency types need warming '
          },
          {
            _type: 'span',
            text: 'herbs for focus and energy',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ', while Yin deficiency types need gentle, cooling options'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'For immune support:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Qi deficiency needs building immunity, while Damp-heat needs clearing inflammation'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'For stress relief:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Qi stagnation types benefit from moving herbs, while Yang deficiency types need nourishing support'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Bottom Line: Pattern-Based Herbal Selection'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Understanding your TCM constitution transforms how you approach '
          },
          {
            _type: 'span',
            text: 'herbal remedies',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: '. Instead of trial and error, you get a systematic approach to '
          },
          {
            _type: 'span',
            text: 'personalized herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that work with your body\'s natural patterns.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'This isn\'t just theory—it\'s a practical framework used by millions of people for thousands of years. Take a '
          },
          {
            _type: 'span',
            text: 'constitution test',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ', understand your patterns, and choose herbs that actually fit your unique constitution.'
          }
        ]
      }
    ],
    seoTitle: "9 TCM Constitution Types: Complete Guide to Herbal Selection",
    seoDescription: "Learn the 9 TCM constitution types and how they guide personalized herbal selection. Take our constitution test to find the right herbs for your body type.",
    seoKeywords: [
      "TCM constitution types",
      "constitution test",
      "body type test",
      "personalized herbal supplements",
      "Traditional Chinese Medicine",
      "herbal remedies",
      "qi deficiency",
      "yang deficiency",
      "yin deficiency",
      "natural supplements",
      "herbs for focus and energy",
      "stress relief herbs",
      "immune boosting herbs"
    ],
    category: "lifestyle",
    tags: ["TCM", "constitution types", "traditional medicine", "personalized health"],
    readTime: 12,
    featured: true
  },
  {
    title: "Best Immune Boosting Herbs: Science-Based Guide for Each Constitution Type",
    slug: "immune-boosting-herbs-constitution-guide",
    excerpt: "Discover which immune boosting herbs work best for your constitution type. Evidence-based guide to echinacea, astragalus, elderberry and more.",
    content: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Not all '
          },
          {
            _type: 'span',
            text: 'immune boosting herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' work the same for everyone. Some people thrive on echinacea while others feel worse. Some need gentle, building support while others need strong, clearing herbs. Understanding your constitution helps you choose the right immune support for your body.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Problem with "One-Size-Fits-All" Immune Support'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Most people approach immune support the same way: when they feel run down, they reach for echinacea or vitamin C. But immune weakness has different root causes:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Deficiency patterns:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Low energy, frequent colds, slow recovery\n• '
          },
          {
            _type: 'span',
            text: 'Excess patterns:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Inflammation, autoimmune reactivity, overactive immune responses'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Using the wrong approach can backfire—stimulating an already overactive immune system or trying to "boost" when you need to "regulate."'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Constitution-Based Immune Support'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'For Qi Deficiency (Low Energy, Frequent Illness)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'If you catch every cold, feel tired often, and have a weak voice, you likely need building, not stimulating, immune support.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Astragalus:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Gentle immune builder, safe for long-term use\n• '
          },
          {
            _type: 'span',
            text: 'Codonopsis:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Builds energy and respiratory strength\n• '
          },
          {
            _type: 'span',
            text: 'American Ginseng:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Supports immune function without overstimulation\n• '
          },
          {
            _type: 'span',
            text: 'Reishi Mushroom:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Adaptogenic immune modulator'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Avoid:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Echinacea (too stimulating), goldenseal (too drying)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'For Yang Deficiency (Always Cold, Sluggish)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'If you\'re always cold, have low energy, and slow metabolism, you need warming immune support.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Korean Ginseng:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Warming immune and energy support\n• '
          },
          {
            _type: 'span',
            text: 'Ginger:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Digestive and respiratory warming\n• '
          },
          {
            _type: 'span',
            text: 'Cinnamon:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Circulatory and metabolic warming\n• '
          },
          {
            _type: 'span',
            text: 'Cordyceps:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Energy and respiratory function'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'For Excess/Heat Patterns (Inflammation, Overactivity)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'If you tend toward inflammation, skin issues, or autoimmune reactivity, you need regulating, not stimulating herbs.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Elderberry:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Gentle immune modulation, antiviral\n• '
          },
          {
            _type: 'span',
            text: 'Green Tea:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Anti-inflammatory, cooling\n• '
          },
          {
            _type: 'span',
            text: 'Turmeric:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Anti-inflammatory, immune regulating\n• '
          },
          {
            _type: 'span',
            text: 'Andrographis:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Cooling antimicrobial support'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Avoid:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Warming, stimulating herbs like Korean ginseng'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Evidence-Based Immune Herbs: What Science Says'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Astragalus (Astragalus membranaceus)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Research:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Studies show astragalus enhances white blood cell function and reduces cold frequency\n• '
          },
          {
            _type: 'span',
            text: 'Best for:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Prevention, not acute treatment\n• '
          },
          {
            _type: 'span',
            text: 'Dosage:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' 9-30g daily as decoction, or standardized extract'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Elderberry (Sambucus canadensis)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Research:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Multiple studies show reduced duration and severity of flu symptoms\n• '
          },
          {
            _type: 'span',
            text: 'Best for:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Viral infections, particularly influenza\n• '
          },
          {
            _type: 'span',
            text: 'Dosage:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' 15ml standardized syrup 4x daily during illness'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Echinacea (Echinacea purpurea)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Research:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Mixed results; most effective when taken at first signs of illness\n• '
          },
          {
            _type: 'span',
            text: 'Best for:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Acute upper respiratory infections\n• '
          },
          {
            _type: 'span',
            text: 'Caution:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Not suitable for autoimmune conditions or prolonged use'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Seasonal Immune Support Strategies'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Fall/Winter (Prevention Phase)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Qi Deficiency:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Daily astragalus + reishi\n• '
          },
          {
            _type: 'span',
            text: 'Yang Deficiency:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Korean ginseng + warming foods\n• '
          },
          {
            _type: 'span',
            text: 'Balanced:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Moderate immune support as needed'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h3',
        children: [
          {
            _type: 'span',
            text: 'Acute Illness (Treatment Phase)'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Early stages:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Elderberry + echinacea (if suitable constitution)\n• '
          },
          {
            _type: 'span',
            text: 'Heat symptoms:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Cooling herbs like andrographis\n• '
          },
          {
            _type: 'span',
            text: 'Weak constitution:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Gentle support, avoid strong stimulation'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Safe Herbal Use: Important Considerations'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Even '
          },
          {
            _type: 'span',
            text: 'natural supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' can have side effects when used incorrectly:'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '• '
          },
          {
            _type: 'span',
            text: 'Drug interactions:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Ginseng with blood thinners, echinacea with immunosuppressants\n• '
          },
          {
            _type: 'span',
            text: 'Autoimmune conditions:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Avoid immune-stimulating herbs\n• '
          },
          {
            _type: 'span',
            text: 'Pregnancy:',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' Many immune herbs are contraindicated'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'The Bottom Line: Personalized Immune Support'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Effective immune support isn\'t about taking the "strongest" herb—it\'s about choosing '
          },
          {
            _type: 'span',
            text: 'safe herbal supplements',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' that match your constitution and needs. A proper '
          },
          {
            _type: 'span',
            text: 'body type test',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ' helps you understand whether you need building, regulating, or clearing approaches to immune health.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Start with understanding your constitution, choose appropriate '
          },
          {
            _type: 'span',
            text: 'immune boosting herbs',
            marks: ['strong']
          },
          {
            _type: 'span',
            text: ', and use them consistently during appropriate seasons for the best results.'
          }
        ]
      }
    ],
    seoTitle: "Best Immune Boosting Herbs by Constitution Type: Science-Based Guide",
    seoDescription: "Learn which immune boosting herbs work best for your constitution. Evidence-based guide to astragalus, elderberry, echinacea and more based on TCM principles.",
    seoKeywords: [
      "immune boosting herbs",
      "astragalus",
      "elderberry",
      "echinacea",
      "natural supplements",
      "safe herbal supplements",
      "constitution based herbs",
      "TCM immune support",
      "herbal remedies",
      "body type test",
      "personalized herbal supplements"
    ],
    category: "science",
    tags: ["immune support", "evidence-based", "TCM", "herbal safety"],
    readTime: 10,
    featured: true
  }
];

// Helper function to create references
async function createCategoryReference(categoryName) {
  try {
    const existingCategory = await client.fetch(`*[_type == "category" && title == $title][0]`, {
      title: categoryName
    });

    if (existingCategory) {
      return { _type: 'reference', _ref: existingCategory._id };
    }

    const category = await client.create({
      _type: 'category',
      title: categoryName,
      slug: {
        _type: 'slug',
        current: categoryName.toLowerCase().replace(/\s+/g, '-')
      },
      description: `Articles about ${categoryName.toLowerCase()}`
    });

    return { _type: 'reference', _ref: category._id };
  } catch (error) {
    console.error(`Error creating category reference for ${categoryName}:`, error);
    return null;
  }
}

async function createTagReferences(tags) {
  const tagRefs = [];

  for (const tagName of tags) {
    try {
      let existingTag = await client.fetch(`*[_type == "tag" && title == $title][0]`, {
        title: tagName
      });

      if (!existingTag) {
        existingTag = await client.create({
          _type: 'tag',
          title: tagName,
          slug: {
            _type: 'slug',
            current: tagName.toLowerCase().replace(/\s+/g, '-')
          }
        });
      }

      tagRefs.push({ _type: 'reference', _ref: existingTag._id });
    } catch (error) {
      console.error(`Error creating tag reference for ${tagName}:`, error);
    }
  }

  return tagRefs;
}

async function createAuthorReference() {
  try {
    let author = await client.fetch(`*[_type == "author" && name == "HerbScience Expert Team"][0]`);

    if (!author) {
      author = await client.create({
        _type: 'author',
        name: 'HerbScience Expert Team',
        slug: {
          _type: 'slug',
          current: 'herbscience-expert-team'
        },
        bio: 'Our team of TCM practitioners, herbalists, and researchers dedicated to evidence-based herbal education.',
        expertise: ['Traditional Chinese Medicine', 'Herbal Safety', 'Constitution Assessment', 'Evidence-Based Herbalism']
      });
    }

    return { _type: 'reference', _ref: author._id };
  } catch (error) {
    console.error('Error creating author reference:', error);
    return null;
  }
}

async function addBlogArticles() {
  console.log('🌿 Starting to add SEO-optimized blog articles to Sanity...');

  for (const article of blogArticles) {
    try {
      console.log(`\n📝 Processing: ${article.title}`);

      // Create references
      const categoryRef = await createCategoryReference(article.category);
      const tagRefs = await createTagReferences(article.tags);
      const authorRef = await createAuthorReference();

      // Check if article already exists
      const existingArticle = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]`,
        { slug: article.slug }
      );

      if (existingArticle) {
        console.log(`⚠️  Article with slug "${article.slug}" already exists. Skipping...`);
        continue;
      }

      // Create the blog post
      const blogPost = {
        _type: 'blogPost',
        title: article.title,
        slug: {
          _type: 'slug',
          current: article.slug
        },
        excerpt: article.excerpt,
        content: article.content,
        author: authorRef,
        category: categoryRef,
        tags: tagRefs,
        featured: article.featured,
        publishedAt: new Date().toISOString(),
        readTime: article.readTime,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        seoKeywords: article.seoKeywords,
        status: 'published'
      };

      const result = await client.create(blogPost);
      console.log(`✅ Successfully created: ${result.title} (ID: ${result._id})`);

    } catch (error) {
      console.error(`❌ Error creating article "${article.title}":`, error);
    }
  }

  console.log('\n🎉 Blog content creation completed!');
}

// Run the script
addBlogArticles().catch(console.error);