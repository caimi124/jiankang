'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface GinsengData {
  herbName: string;
  latinName: string;
  tags: string[];
  overview: string;
  activeCompounds: string;
  mechanismOfAction: string;
  benefitsConditions: string;
  contraindications: string;
  recommendedConstitution: string[];
  notRecommendedConstitution: string[];
  constitutionExplanation: string;
  usageTips: string;
  dailyDoseGuide: string;
  medicalStudiesSummary: string;
  faq: string;
  internalLinks: string;
  safetyLevel: string;
  categories: string[];
}

const GinsengDetailPage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['overview']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // 这里的数据通常从Notion API获取
  const ginsengData: GinsengData = {
    herbName: "Ginseng",
    latinName: "Panax ginseng",
    tags: ["Energy Booster", "Cognitive Support", "Immune Support", "Adaptogenic"],
    overview: "Ginseng (Panax ginseng) is one of the most renowned herbs in traditional Chinese and Korean medicine. Known as a powerful adaptogen, it helps the body resist physical, emotional, and environmental stress. Modern studies support its benefits in improving energy, brain function, immunity, and even blood sugar control.",
    activeCompounds: "Ginsenosides (boost cellular energy via AMPK activation, anti-fatigue), Rg1 (calms nervous system by regulating GABA, reduces anxiety), Ginseng polysaccharides (enhances immune cell activity in the lungs), Maltol (powerful antioxidant; clears free radicals more effectively than Vitamin C)",
    mechanismOfAction: "Ginsenosides activate AMPK pathways to boost cellular energy production and reduce fatigue. Rg1 compounds regulate GABA neurotransmitter activity in the brain, promoting calmness and reducing anxiety. Polysaccharides enhance immune cell function, particularly in respiratory tissues. Maltol provides potent antioxidant protection, neutralizing free radicals more effectively than traditional antioxidants.",
    benefitsConditions: "✅ EFFECTIVE FOR: Chronic fatigue, Burnout, Weak immunity, Physical decline in older adults, High stress professionals, Mild diabetes support, Memory improvement, Sleep quality enhancement\n⚠️ USE WITH CAUTION: Heat-type symptoms (irritability, dry mouth), High blood pressure, Heart palpitations, Autoimmune diseases\n❌ AVOID: Pregnancy, Children (without healthcare provider), Severe hypertension, Active inflammatory conditions",
    contraindications: "Avoid in individuals with heat-type symptoms including irritability, dry mouth, and constipation. Not recommended for those with high blood pressure, heart palpitations, or autoimmune diseases (lupus, multiple sclerosis). Pregnant women and children should consult healthcare providers before use. Potential side effects include insomnia, irritability, nervousness, elevated blood pressure, and hormonal imbalance.",
    recommendedConstitution: ["Qi-deficient", "Yang-deficient", "Cold-prone", "Blood-deficient"],
    notRecommendedConstitution: ["Heat-excess", "Yang-excess", "Inflammation-prone", "Hypertension"],
    constitutionExplanation: "Ginseng is ideal for people with qi-deficiency who experience chronic fatigue, weak digestion, or low energy. The warming and tonifying properties help boost yang qi and improve circulation. However, it should be avoided by those with heat-excess constitutions who already have symptoms like flushed face, irritability, or high blood pressure, as ginseng may overstimulate their system.",
    usageTips: "• Slice & Chew: 1-2g ginseng slices in the morning on empty stomach for busy professionals\n• Ginseng Stew: 3g ginseng + goji berries + black chicken stew for older adults, especially in winter\n• Ginseng Tea: 2g ginseng + Ophiopogon root + hot water for fatigue and summer sweating\n• Cycling: 5 days on, 2 days off to prevent overstimulation\n• Avoid with: Radish, green tea, stimulants as they may reduce effectiveness",
    dailyDoseGuide: "Fresh ginseng slices: 1-2g daily (morning, empty stomach)\nGinseng powder: 0.5-1g daily\nStandardized extract: 100-200mg daily\nTea preparation: 2-3g steeped for 10-15 minutes\nDuration: Cycle usage - 5 days on, 2 days off to prevent tolerance\nTiming: Best taken in morning to avoid sleep disruption",
    medicalStudiesSummary: "Nutrients 2020: Ginseng significantly enhanced endurance and reduced fatigue in athletes over 8 weeks\nFrontiers in Neuroscience 2020: Daily ginseng improved memory, attention, and sleep quality in adults aged 40-65\nInt'l Immunopharmacology 2019: Ginseng polysaccharides protected lung function and reduced infection risk\nJ. Diabetes Research 2019: Ginseng slowed glucose absorption and reduced post-meal blood sugar spikes by 23%",
    faq: "Q: Can I take ginseng every day?\nA: Yes, in small doses (1-2g), but cycle use: 5 days on, 2 days off to prevent overstimulation.\n\nQ: How do I know if it's too much?\nA: Insomnia, restlessness, and gum pain may be early signs of overstimulation. Reduce dose or take a break.\n\nQ: What type of ginseng is better for hot constitutions?\nA: American ginseng (Panax quinquefolius) is cooling and more suitable for people with heat symptoms.\n\nQ: Can I take ginseng with coffee?\nA: It's better to separate them by 2-3 hours to avoid excessive stimulation.",
    internalLinks: "Take Constitution Test | Explore Adaptogenic Herbs | View Energy Boosting Herbs | American Ginseng Comparison | Stress Management Guide",
    safetyLevel: "Medium",
    categories: ["Adaptogenic Herbs", "Nervous System Herbs", "Immune Herbs"]
  };

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatBenefitsConditions = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.includes('✅ EFFECTIVE FOR:')) {
        return (
          <div key={index} className="mb-3">
            <h4 className="font-semibold text-green-700 mb-2">✅ Effective For:</h4>
            <p className="text-gray-700 ml-4">{line.replace('✅ EFFECTIVE FOR:', '').trim()}</p>
          </div>
        );
      } else if (line.includes('⚠️ USE WITH CAUTION:')) {
        return (
          <div key={index} className="mb-3">
            <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Use With Caution:</h4>
            <p className="text-gray-700 ml-4">{line.replace('⚠️ USE WITH CAUTION:', '').trim()}</p>
          </div>
        );
      } else if (line.includes('❌ AVOID:')) {
        return (
          <div key={index} className="mb-3">
            <h4 className="font-semibold text-red-700 mb-2">❌ Avoid:</h4>
            <p className="text-gray-700 ml-4">{line.replace('❌ AVOID:', '').trim()}</p>
          </div>
        );
      }
      return null;
    });
  };

  const formatFAQ = (text: string) => {
    const qaBlocks = text.split('\n\n');
    return qaBlocks.map((block, index) => {
      const lines = block.split('\n');
      const question = lines[0];
      const answer = lines[1];
      
      if (question?.startsWith('Q:') && answer?.startsWith('A:')) {
        return (
          <div key={index} className="mb-4">
            <h4 className="font-semibold text-blue-700 mb-2">{question}</h4>
            <p className="text-gray-700 ml-4">{answer.substring(2).trim()}</p>
          </div>
        );
      }
      return null;
    });
  };

  const Section: React.FC<{ 
    title: string; 
    id: string; 
    children: React.ReactNode;
    icon?: string;
  }> = ({ title, id, children, icon }) => {
    const isExpanded = expandedSections.has(id);
    
    return (
      <div className="bg-white rounded-lg shadow-md mb-6">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-t-lg"
        >
          <div className="flex items-center">
            {icon && <span className="mr-3 text-2xl">{icon}</span>}
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{ginsengData.herbName}</h1>
            <p className="text-xl italic mb-4">{ginsengData.latinName}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {ginsengData.tags.map((tag, index) => (
                <span key={index} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getSafetyLevelColor(ginsengData.safetyLevel)}`}>
              Safety: {ginsengData.safetyLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <Section title="Overview" id="overview" icon="🌿">
        <p className="text-gray-700 leading-relaxed">{ginsengData.overview}</p>
      </Section>

      {/* Active Compounds Section */}
      <Section title="Active Compounds & Mechanism" id="compounds" icon="🧬">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Key Compounds:</h4>
            <p className="text-gray-700">{ginsengData.activeCompounds}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">How It Works:</h4>
            <p className="text-gray-700">{ginsengData.mechanismOfAction}</p>
          </div>
        </div>
      </Section>

      {/* Benefits & Conditions Section */}
      <Section title="Benefits & Applications" id="benefits" icon="✅">
        <div className="space-y-4">
          {formatBenefitsConditions(ginsengData.benefitsConditions)}
        </div>
      </Section>

      {/* Constitution Matching Section */}
      <Section title="TCM Constitution Matching" id="constitution" icon="☯️">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-3">✅ Recommended For:</h4>
            <div className="space-y-2">
              {ginsengData.recommendedConstitution.map((constitution, index) => (
                <span key={index} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {constitution}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-3">❌ Not Recommended For:</h4>
            <div className="space-y-2">
              {ginsengData.notRecommendedConstitution.map((constitution, index) => (
                <span key={index} className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  {constitution}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-gray-700">{ginsengData.constitutionExplanation}</p>
        </div>
      </Section>

      {/* Usage Guide Section */}
      <Section title="Usage Guide & Dosage" id="usage" icon="📋">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Practical Usage Tips:</h4>
            <div className="space-y-2">
              {ginsengData.usageTips.split('\n').map((tip, index) => (
                <p key={index} className="text-gray-700">{tip}</p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Daily Dose Guide:</h4>
            <div className="space-y-2">
              {ginsengData.dailyDoseGuide.split('\n').map((dose, index) => (
                <p key={index} className="text-gray-700">{dose}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Scientific Evidence Section */}
      <Section title="Scientific Evidence" id="studies" icon="📚">
        <div className="space-y-3">
          {ginsengData.medicalStudiesSummary.split('\n').map((study, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{study}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Safety & Contraindications Section */}
      <Section title="Safety & Contraindications" id="safety" icon="⚠️">
        <div className="p-4 bg-orange-50 border-l-4 border-orange-500">
          <p className="text-gray-700">{ginsengData.contraindications}</p>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section title="Frequently Asked Questions" id="faq" icon="❓">
        <div className="space-y-4">
          {formatFAQ(ginsengData.faq)}
        </div>
      </Section>

      {/* Related Links Section */}
      <Section title="Related Resources" id="links" icon="🔗">
        <div className="flex flex-wrap gap-3">
          {ginsengData.internalLinks.split(' | ').map((link, index) => (
            <a
              key={index}
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">Categories:</h4>
        <div className="flex flex-wrap gap-2">
          {ginsengData.categories.map((category, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GinsengDetailPage; 