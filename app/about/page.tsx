import { Metadata } from 'next'
import React from 'react'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About HerbScience – Licensed Pharmacist & TCM Expert | Evidence-Based Herbal Medicine',
  description: 'HerbScience provides professional, evidence-based herbal guidance from licensed pharmacist Zeng Chuping. Get safe herbal supplement advice, herb-drug interaction safety, and proven herbal recommendations. 50,000+ people helped with 98% safety success rate.',
  keywords: [
    'evidence-based herbal medicine',
    'licensed pharmacist herbal advice', 
    'safe herbal supplement advice',
    'herb-drug interaction safety',
    'professional herbal guidance',
    'TCM expert consultation',
    'herbal medicine safety assessment',
    'qualified herbal consultant',
    'traditional chinese medicine expert',
    'herbal supplement safety',
    'natural health professional',
    'certified herbal specialist',
    'herbal safety checks',
    'professional herbal recommendations',
    'herbal medicine credentials',
    'pharmacy herbal expertise'
  ],
  authors: [
    {
      name: 'Zeng Chuping',
      url: 'https://herbscience.shop/about'
    }
  ],
  openGraph: {
    title: 'About HerbScience – Licensed Pharmacist & TCM Expert | Evidence-Based Herbal Medicine', 
    description: 'HerbScience provides safe herbal supplement advice from licensed pharmacist Zeng Chuping. Get evidence-based herbal guidance, herb-drug interaction safety, and professional herbal recommendations.',
    type: 'website',
    url: 'https://herbscience.shop/about',
    siteName: 'HerbScience',
    images: [
      {
        url: 'https://herbscience.shop/images/about/team-expertise.jpg',
        width: 1200,
        height: 630,
        alt: 'HerbScience Team - Licensed Pharmacist and TCM Experts'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HerbScience | Licensed Pharmacist & TCM Expert',
    description: 'Meet our expert team led by Licensed Pharmacist Zeng Chuping. Evidence-based herbal medicine guidance you can trust.',
    images: ['https://herbscience.shop/images/about/team-expertise.jpg']
  },
  alternates: {
    canonical: 'https://herbscience.shop/about',
    languages: {
      'en': 'https://herbscience.shop/about',
      'zh': 'https://herbscience.shop/zh/about',
      'x-default': 'https://herbscience.shop/about'
    }
  },
  other: {
    'article:author': 'Zeng Chuping',
    'article:section': 'About',
    'og:type': 'website',
    'og:locale': 'en_US',
    'expertise': 'Licensed Pharmacist, TCM Expert, Herbal Medicine Specialist',
    'credentials': 'Licensed Pharmacist (China), Certified TCM Dispenser, Southern Medical University Graduate'
  }
}

export default function AboutPage() {
  // Professional credentials structured data for E-A-T
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://herbscience.shop/#organization',
    name: 'HerbScience',
    url: 'https://herbscience.shop',
    logo: 'https://herbscience.shop/logo.png',
    description: 'Evidence-based herbal medicine platform led by licensed pharmacist and TCM expert Zeng Chuping, providing safe, reliable guidance on herbal supplements and traditional medicine.',
    founder: {
      '@type': 'Person',
      '@id': 'https://herbscience.shop/about#zeng-chuping',
      name: 'Zeng Chuping',
      jobTitle: 'Licensed Pharmacist & TCM Expert',
      description: 'Licensed pharmacist in China with expertise in traditional Chinese medicine. Graduate of Southern Medical University with professional certifications in pharmacy and TCM dispensing.',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Southern Medical University',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Guangzhou',
          addressCountry: 'China'
        }
      },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Licensed Pharmacist',
          credentialCategory: 'Professional License',
          recognizedBy: {
            '@type': 'Organization',
            name: 'China Food and Drug Administration'
          }
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Certified Traditional Chinese Medicine Dispenser',
          credentialCategory: 'Professional Certification',
          recognizedBy: {
            '@type': 'Organization',
            name: 'Traditional Chinese Medicine Board'
          }
        }
      ],
      knowsAbout: [
        'Pharmacology',
        'Traditional Chinese Medicine',
        'Herbal Medicine Safety',
        'Drug-Herb Interactions',
        'Evidence-Based Medicine',
        'Natural Health Products'
      ]
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'expert@herbscience.shop',
      availableLanguage: ['English', 'Chinese']
    },
    sameAs: [
      'https://herbscience.shop',
      'https://herbscience.shop/about'
    ]
  }

  

  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://herbscience.shop/about',
    url: 'https://herbscience.shop/about',
    name: 'About HerbScience - Licensed Pharmacist & TCM Expert',
    description: 'Learn about HerbScience team led by licensed pharmacist Zeng Chuping, our mission to provide evidence-based herbal medicine guidance, and why professionals worldwide trust our expertise.',
    mainEntity: {
      '@id': 'https://herbscience.shop/#organization'
    },
    breadcrumb: {
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
          name: 'About Us',
          item: 'https://herbscience.shop/about'
        }
      ]
    }
  }

  const professionalSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://herbscience.shop/about#zeng-chuping',
    name: 'Zeng Chuping',
    givenName: 'Chuping',
    familyName: 'Zeng',
    jobTitle: 'Licensed Pharmacist & Traditional Chinese Medicine Expert',
    description: 'Licensed pharmacist in China with dual expertise in modern pharmacology and traditional herbal medicine. Graduated from Southern Medical University with professional certifications in pharmacy and TCM dispensing.',
    worksFor: {
      '@type': 'Organization',
      name: 'HerbScience',
      url: 'https://herbscience.shop'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Southern Medical University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Guangzhou',
        addressRegion: 'Guangdong',
        addressCountry: 'China'
      }
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Licensed Pharmacist',
        credentialCategory: 'Professional License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'China Food and Drug Administration'
        }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Traditional Chinese Medicine Dispenser',
        credentialCategory: 'Professional Certification'
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor of Pharmacy',
        credentialCategory: 'Degree',
        educationalLevel: 'Bachelor',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: 'Southern Medical University'
        }
      }
    ],
    knowsAbout: [
      'Pharmacology',
      'Traditional Chinese Medicine',
      'Herbal Medicine Safety',
      'Drug-Herb Interactions',
      'Evidence-Based Medicine',
      'Natural Health Products',
      'Herbal Quality Assessment',
      'Patient Safety'
    ],
    expertise: 'Combining modern pharmaceutical knowledge with traditional Chinese medicine to provide evidence-based herbal health guidance'
  }

  // FAQPage JSON-LD for rich results
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes HerbScience evidence-based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our recommendations are guided by peer-reviewed research, safety data, and clinical experience, led by a licensed pharmacist and TCM expert.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do you ensure herb-drug interaction safety?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We screen for known interactions and contraindications, and encourage users to consult healthcare providers when combining herbs with prescription medications.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where should I start if I am new to herbs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Begin with our TCM Constitution Test to identify your body type, browse the Herb Finder for evidence-based profiles, and read our blog for practical safety guidance.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the advice personalized?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide educational guidance aligned with body constitution patterns and safety best practices; for medical advice, consult your clinician.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you cover supplement quality and purity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We highlight standardized extracts, third-party testing, and quality indicators to help you choose reliable products.'
        }
      }
    ]
  }

  return (
    <>
      {/* Enhanced structured data for E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <AboutClient />
    </>
  )
} 