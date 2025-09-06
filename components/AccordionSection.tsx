'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionSectionProps {
  title: string
  icon: React.ComponentType<any>
  children: React.ReactNode
  defaultOpen?: boolean
  sectionId: string
}

export default function AccordionSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = false,
  sectionId
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left bg-gradient-to-r from-gray-50 to-white hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
        aria-expanded={isOpen}
        aria-controls={`section-${sectionId}`}
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Icon className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        id={`section-${sectionId}`}
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  )
}