import { Metadata } from 'next'
import React from 'react'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About HerbScience | Licensed Pharmacist & TCM Expert | Evidence-Based Herbal Medicine',
  description: 'Meet Zeng Chuping, Licensed Pharmacist (China) & Certified TCM Dispenser. Learn why thousands trust HerbScience for safe, evidence-based herbal medicine guidance combining traditional wisdom with modern science.',
  keywords: [
    'licensed pharmacist herbal medicine',
    'TCM expert herbal supplements',
    'evidence based herbal medicine',
    'qualified herbal consultant',
    'traditional chinese medicine expert',
    'herbal medicine safety',
    'herb supplement expert',
    'natural health professional',
    'herbal medicine credentials',
    'certified herbal specialist'
  ],
  authors: [
    {
      name: 'Zeng Chuping',
      url: 'https://herbscience.shop/about'
    }
  ],
  openGraph: {
    title: 'About HerbScience | Licensed Pharmacist & TCM Expert',
    description: 'Meet our expert team led by Licensed Pharmacist Zeng Chuping. Discover why professionals and individuals worldwide trust HerbScience for evidence-based herbal medicine guidance.',
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
    canonical: 'https://herbscience.shop/about'
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
      
      <AboutClient />
    </>
  )
} 