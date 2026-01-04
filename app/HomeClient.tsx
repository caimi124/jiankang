'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, ShieldCheck, Sparkles, Activity, HelpCircle } from 'lucide-react'
import type { ReactNode } from 'react'

const Header = dynamic(() => import('../components/Header'), { ssr: false })

const faqItems: { question: string; answer: ReactNode }[] = [
  {
    question: '为什么先做体质测试？',
    answer: (
      <>
        <p className="text-sm text-gray-600">
          同一味补充剂，在寒凉体质和燥热体质身上会产生完全不同的结果。先搞清楚体质，才能判断“该不该用”。
        </p>
        <p className="mt-3 text-sm text-gray-700">
          <Link href="/constitution-test" className="text-green-700 underline">
            进行体质测试
          </Link>
          ，先确认你属于哪一种模式。
        </p>
      </>
    )
  },
  {
    question: '测试多久？要准备什么？',
    answer: (
      <>
        <p className="text-sm text-gray-600">
          2 分钟内完成的个人评估，不需要账号、不收取费用、更不会推销补剂。全部问题都围绕你的体感，而不是冷冰冰的数字。
        </p>
        <p className="mt-3 text-sm text-gray-700">
          <Link href="/constitution-test" className="text-green-700 underline">
            现在开始
          </Link>
          ，随时可中断、结果即时呈现。
        </p>
      </>
    )
  },
  {
    question: '测完之后会发生什么？',
    answer: (
      <>
        <p className="text-sm text-gray-600">
          你会拿到一句话体质描述、一条常见“补不上”的原因，以及下一步推荐（去 Herb Finder 看适配草药，或预约更深入解读）。
        </p>
        <p className="mt-3 text-sm text-gray-700">
          结果页里的所有按钮都会带你回到体质判断的核心动作。
        </p>
      </>
    )
  }
]

const trustBadges = [
  { label: 'Personal assessment, not a quiz', icon: <ShieldCheck className="w-5 h-5" /> },
  { label: 'Guided by licensed pharmacist', icon: <Sparkles className="w-5 h-5" /> },
  { label: '50,000+ constitution reads', icon: <Activity className="w-5 h-5" /> }
]

const trackHomeInteraction = (action: string) => {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: 'home_interaction', action })
}

export default function HomeClient() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-white">
          <div className="max-w-5xl mx-auto px-4 py-20 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-green-700 mb-4">
              Supplements don’t fail.
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
              They fail when they’re not matched to your body.
            </h1>
            <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
              HerbScience helps you understand what works for <span className="italic">your</span> constitution.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link
                href="/constitution-test"
                onClick={() => trackHomeInteraction('hero_cta')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg transition hover:bg-green-700"
              >
                Take the Constitution Test
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-gray-600">Based on TCM logic, explained in modern terms.</p>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold">Why constitution matching matters</h2>
              <p className="text-gray-600 mt-3">任何“随便补”的方式，都会在这里失灵。</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 p-6">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-widest">Common pattern</p>
                <h3 className="text-2xl font-semibold mt-3 mb-4">“我看了很多科普，但用完都没感觉。”</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>同一种草药，对寒的人是“火”，对燥的人是“风扇”。</li>
                  <li>博客越看越多，动作却越做越慢，因为缺少“这是给谁用”的判断。</li>
                  <li>最后大家都把草药当成百科，而不是决策工具。</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-gray-200 p-6 bg-green-50/60">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-widest">What HerbScience does</p>
                <h3 className="text-2xl font-semibold mt-3 mb-4">先判断，再谈补充</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>体质测试输出一句话诊断 + 常见踩坑场景。</li>
                  <li>下一步动作只有两个：去 Herb Finder 查证，或预约更深入的拆解。</li>
                  <li>所有页面围绕“体质判断”单线运行，没有旁枝末节。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3 rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
                    {badge.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-800">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold">FAQ · 全部指向体质测试</h2>
            </div>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                  {item.answer}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

