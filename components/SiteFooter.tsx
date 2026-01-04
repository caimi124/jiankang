import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const blogHighlights = [
  { title: 'Why Rhodiola Works for Some People', href: '/blog/why-rhodiola-works-body-type' },
  { title: 'Red Onion vs White Onion', href: '/blog/red-onion-vs-white-onion-health-benefits' },
  { title: 'Ashwagandha for Women', href: '/blog/ashwagandha-for-women-hormone-balance' },
  { title: 'Turmeric Gut Relief Guide', href: '/blog/turmeric-gut-relief-guide' }
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/herbscience', handle: '@herbscience' },
  { label: 'Twitter', href: 'https://twitter.com/herbscience', handle: '@herbscience' }
]

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-14 space-y-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-300">Blog highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              {blogHighlights.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex items-center gap-2 hover:text-white transition">
                    {item.title}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-300">Tools</p>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <Link href="/herb-finder" className="inline-flex items-center gap-2 hover:text-white">
                Herb Finder
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/constitution-test" className="inline-flex items-center gap-2 hover:text-white">
                Constitution Test
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-300">Contact</p>
            <p className="mt-4 text-sm text-gray-300">
              expert@herbscience.shop <br />
              Los Angeles & Guangzhou · Remote first
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              {socialLinks.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-white transition" target="_blank" rel="noreferrer">
                  {item.label} · {item.handle}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 border-t border-gray-900 pt-6">
          © {new Date().getFullYear()} HerbScience · Educational guidance only · No medical advice
        </div>
      </div>
    </footer>
  )
}

