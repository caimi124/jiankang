import { Metadata } from 'next'
import DosageCalculatorClient from './DosageCalculatorClient'

// 🎯 完整的SEO元数据
export const metadata: Metadata = {
  title: 'Herbal Dosage Calculator - Personalized & Safe Recommendations | HerbScience',
  description: 'Calculate safe herbal supplement dosages based on your age, weight, health conditions, and experience level. Free tool by licensed pharmacist with evidence-based recommendations for Ashwagandha, Turmeric, Ginseng, Rhodiola and more.',
  keywords: [
    'herbal dosage calculator',
    'herb dosage guide',
    'personalized herbal dosage',
    'safe herbal dosage',
    'ashwagandha dosage calculator',
    'turmeric dosage calculator',
    'ginseng dosage calculator',
    'rhodiola dosage calculator',
    'herbal supplement dosage',
    'herb dosage recommendations',
    'safe supplement dosage',
    'personalized supplement calculator',
    'herbal medicine dosage',
    'TCM dosage calculator',
    'natural supplement dosage',
    'how much herbs to take',
    'herbal supplement safety',
    'licensed pharmacist herbal advice'
  ].join(', '),
  authors: [
    {
      name: 'Zeng Chuping',
      url: 'https://herbscience.shop/about'
    }
  ],
  openGraph: {
    title: 'Herbal Dosage Calculator - Personalized & Safe Recommendations',
    description: 'Free herbal dosage calculator by licensed pharmacist. Get personalized recommendations based on your age, weight, health conditions, and experience level. Evidence-based and safe.',
    type: 'website',
    url: 'https://herbscience.shop/dosage-calculator',
    siteName: 'HerbScience',
    images: [
      {
        url: 'https://herbscience.shop/images/dosage-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience Herbal Dosage Calculator Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herbal Dosage Calculator | Free & Personalized',
    description: 'Calculate safe herbal dosages based on your unique profile. Created by licensed pharmacist. Free forever.',
    images: ['https://herbscience.shop/images/dosage-calculator-og.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/dosage-calculator',
    languages: {
      'en': 'https://herbscience.shop/dosage-calculator',
      'zh': 'https://herbscience.shop/zh/dosage-calculator',
      'x-default': 'https://herbscience.shop/dosage-calculator'
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'tool-type': 'dosage calculator',
    'health-category': 'herbal medicine',
    'target-audience': 'adults seeking herbal supplements',
    'medical-review': 'Licensed Pharmacist Zeng Chuping',
    'last-updated': new Date().toISOString().split('T')[0]
  }
}

export default function DosageCalculatorPage() {
  // 🎯 WebApplication 结构化数据（让Google识别为工具）
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://herbscience.shop/dosage-calculator#webapp',
    name: 'Herbal Dosage Calculator',
    alternateName: 'HerbScience Dosage Calculator',
    url: 'https://herbscience.shop/dosage-calculator',
    description: 'Free personalized herbal dosage calculator that provides safe, evidence-based supplement recommendations based on individual age, weight, health conditions, and experience level. Created by licensed pharmacist.',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    author: {
      '@type': 'Person',
      name: 'Zeng Chuping',
      jobTitle: 'Licensed Pharmacist & TCM Expert',
      url: 'https://herbscience.shop/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop',
      logo: {
        '@type': 'ImageObject',
        url: 'https://herbscience.shop/logo.png'
      }
    },
    featureList: [
      'Personalized dosage calculation based on weight',
      'Age-adjusted recommendations',
      'Health condition screening',
      'Experience level adjustment',
      'Evidence-based guidelines',
      'Licensed pharmacist review',
      'Free to use forever',
      'No registration required'
    ],
    screenshot: {
      '@type': 'ImageObject',
      url: 'https://herbscience.shop/images/dosage-calculator-screenshot.jpg',
      description: 'Herbal Dosage Calculator Interface'
    }
  }

  // 🎯 MedicalWebPage 结构化数据（医疗相关页面）
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': 'https://herbscience.shop/dosage-calculator#webpage',
    url: 'https://herbscience.shop/dosage-calculator',
    name: 'Herbal Dosage Calculator - Personalized Supplement Recommendations',
    description: 'Calculate safe herbal supplement dosages with our evidence-based tool. Personalized recommendations by licensed pharmacist.',
    specialty: 'Herbal Medicine',
    audience: {
      '@type': 'PeopleAudience',
      audienceType: 'Adults seeking safe herbal supplement guidance',
      healthCondition: 'General wellness, specific health concerns'
    },
    reviewedBy: {
      '@type': 'Person',
      name: 'Zeng Chuping',
      jobTitle: 'Licensed Pharmacist',
      description: 'Licensed pharmacist with expertise in Traditional Chinese Medicine and herbal supplements'
    },
    lastReviewed: new Date().toISOString().split('T')[0],
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main'
    },
    relatedLink: [
      'https://herbscience.shop/constitution-test',
      'https://herbscience.shop/herb-finder',
      'https://herbscience.shop/blog'
    ]
  }

  // 🎯 HowTo 结构化数据（如何使用这个工具）
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Use the Herbal Dosage Calculator',
    description: 'Step-by-step guide to calculate safe, personalized herbal supplement dosages',
    image: 'https://herbscience.shop/images/dosage-calculator-howto.jpg',
    totalTime: 'PT3M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Web browser with JavaScript enabled'
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Your Herb',
        text: 'Choose the herb you want dosage recommendations for from the dropdown menu.',
        url: 'https://herbscience.shop/dosage-calculator#step1'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Your Weight and Age',
        text: 'Input your current weight in kilograms and your age to get personalized calculations.',
        url: 'https://herbscience.shop/dosage-calculator#step2'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Select Experience Level',
        text: 'Choose your experience level: Beginner, Intermediate, or Advanced user of herbal supplements.',
        url: 'https://herbscience.shop/dosage-calculator#step3'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Check Health Conditions',
        text: 'Select any applicable health conditions or medications that may affect dosage recommendations.',
        url: 'https://herbscience.shop/dosage-calculator#step4'
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Calculate Dosage',
        text: 'Click the Calculate button to receive your personalized, evidence-based dosage recommendation.',
        url: 'https://herbscience.shop/dosage-calculator#step5'
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Review Recommendations',
        text: 'Read your personalized dosage, timing suggestions, and safety considerations carefully before starting any supplement.',
        url: 'https://herbscience.shop/dosage-calculator#step6'
      }
    ]
  }

  // 🎯 FAQPage 结构化数据
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the herbal dosage calculator free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our herbal dosage calculator is completely free to use and requires no registration. It provides evidence-based recommendations created by a licensed pharmacist.'
        }
      },
      {
        '@type': 'Question',
        name: 'How accurate are the dosage recommendations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our dosage recommendations are based on clinical research, traditional use patterns, and established safety guidelines. However, individual needs may vary, so we recommend starting with the lowest suggested dose and consulting with your healthcare provider.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use this calculator if I take medications?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The calculator screens for common health conditions and medication interactions, but you should always consult your healthcare provider before combining herbal supplements with prescription medications.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which herbs are included in the calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Currently, the calculator includes Ashwagandha, Turmeric (Curcumin), Ginseng, and Rhodiola. We are continuously adding more herbs based on scientific evidence and user demand.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I start with the recommended dose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend starting with the lowest end of the suggested dose range to assess your tolerance, especially if you are new to herbal supplements. You can gradually increase as needed over several weeks.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is this calculator suitable for pregnant women?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If you select pregnancy as a health condition, the calculator will provide appropriate warnings and modified recommendations. However, pregnant and breastfeeding women should always consult their healthcare provider before taking any herbal supplements.'
        }
      }
    ]
  }

  // 🎯 BreadcrumbList 结构化数据
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://herbscience.shop/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dosage Calculator',
        item: 'https://herbscience.shop/dosage-calculator'
      }
    ]
  }

  return (
    <>
      {/* 🎯 所有结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* 客户端组件 */}
      <DosageCalculatorClient />
    </>
  )
}
