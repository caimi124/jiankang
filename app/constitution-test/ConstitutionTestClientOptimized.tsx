 'use client'

import React, { useState } from 'react'
import { questions, scoreOptions, calculateConstitution, constitutionInfo } from './questions'
import Header from '../../components/Header'

const QUIZ_DURATION = '2–3 minutes'

export default function ConstitutionTestClientOptimized() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0))
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [readyForResult, setReadyForResult] = useState(false)

  const totalQuestions = questions.length
  const progressPercent = Math.round(((currentQuestion + 1) / totalQuestions) * 100)

  const handleStartTest = () => {
    setCurrentStep('test')
    setCurrentQuestion(0)
    setAnswers(new Array(totalQuestions).fill(0))
    setSelectedAnswer(null)
    setReadyForResult(false)
  }

  const handleAnswerSelect = (score: number) => {
    if (isAnimating) return

    setSelectedAnswer(score)
    setIsAnimating(true)

    const newAnswers = [...answers]
    newAnswers[currentQuestion] = score
    setAnswers(newAnswers)

    if (currentQuestion === totalQuestions - 1) {
      setReadyForResult(true)
      setIsAnimating(false)
      return
    }

    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnimating(false)
    }, 250)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const handleSubmit = () => {
    if (!readyForResult) return
    setCurrentStep('results')
  }

  const handleRestartTest = () => {
    setCurrentStep('welcome')
    setCurrentQuestion(0)
    setAnswers(new Array(totalQuestions).fill(0))
    setSelectedAnswer(null)
    setReadyForResult(false)
    setIsAnimating(false)
  }

  if (currentStep === 'welcome') {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10 pt-28">
          <div className="mx-auto w-full max-w-4xl space-y-8">
            <section className="rounded-3xl border border-gray-100 bg-white/90 p-8 shadow-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-green-600">Body Constitution Test</p>
              <h1 className="mt-3 text-3xl font-semibold text-gray-900">
                Understand Your Body Constitution Before Choosing Herbs
              </h1>
              <p className="mt-4 text-gray-700">
                This short questionnaire identifies your body constitution patterns so you can see why the same herbs feel
                different for different people. It is designed to be calm, non-medical, and respectful of your time.
              </p>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-green-50/80 p-4 text-sm leading-tight text-gray-700">
                  <p className="text-xl font-semibold text-green-800">⏱️</p>
                  <p className="font-semibold text-gray-900">Takes about {QUIZ_DURATION}</p>
                  <p className="text-xs text-gray-500">so you can get clarity faster.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm leading-tight text-gray-700">
                  <p className="text-xl font-semibold text-green-800">🛡️</p>
                  <p className="font-semibold text-gray-900">No medical diagnosis</p>
                  <p className="text-xs text-gray-500">just thoughtful insight.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm leading-tight text-gray-700">
                  <p className="text-xl font-semibold text-green-800">🔒</p>
                  <p className="font-semibold text-gray-900">No personal data sold</p>
                  <p className="text-xs text-gray-500">Your answers stay within HerbScience.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white/90 p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">What you will receive</p>
              <div className="mt-4 space-y-3 text-gray-700">
                <div className="rounded-2xl border border-gray-200 bg-green-50/70 p-4">
                  <p className="text-sm font-semibold text-gray-900">Constitution type</p>
                  <p className="text-xs text-gray-600">A gentle portrait of your constitution profile.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-green-50/70 p-4">
                  <p className="text-sm font-semibold text-gray-900">Key tendencies</p>
                  <p className="text-xs text-gray-600">What your body naturally leans toward and why.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-green-50/70 p-4">
                  <p className="text-sm font-semibold text-gray-900">General herb direction</p>
                  <p className="text-xs text-gray-600">Guidance on what feels fitting and when to pause.</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white/90 p-8 text-left shadow-lg">
              <p className="text-sm text-gray-500">We keep the focus on clarity—no sales pressure, just a thoughtful tool.</p>
              <button
                onClick={handleStartTest}
                className="mt-6 w-full rounded-full bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-green-700"
              >
                Get My Constitution Insight
              </button>
            </section>
          </div>
        </div>
      </>
    )
  }

  if (currentStep === 'test') {
    const currentQ = questions[currentQuestion]
    const isMidway = currentQuestion >= Math.floor(totalQuestions / 2)
    const showResultAnticipation = currentQuestion <= 2

    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-green-100 px-4 py-10 pt-28">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500">What to expect</p>
              <h2 className="mt-3 text-2xl font-semibold text-gray-900">This is easy, safe, and worth finishing</h2>
              <p className="mt-3 text-gray-700">
                You’ll see which general directions tend to fit your constitution and why certain herbs feel different for you.
              </p>
              <p className="mt-2 text-sm text-gray-500">Your result will explain patterns—not prescriptions.</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-xl">
              <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                <span>Progress</span>
                <span>{progressPercent}% complete</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-gradient-to-r from-green-600 to-teal-500 transition-all" style={{ width: `${progressPercent}%` }} />
              </div>

              {showResultAnticipation && (
                <p className="mt-4 text-sm text-gray-600">
                  You’re building a clearer picture. Finish the test to see your constitution summary and key tendencies.
                </p>
              )}
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500">{currentQ.category}</p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">{currentQ.text}</h3>
              </div>

              <div className="space-y-3">
                {scoreOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(option.value)}
                    disabled={isAnimating}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedAnswer === option.value
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    } ${isAnimating ? 'pointer-events-none opacity-70' : ''}`}
                  >
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </button>
                ))}
              </div>

              {currentQuestion === totalQuestions - 1 && readyForResult && (
                <div className="mt-6 space-y-3 rounded-2xl border border-dashed border-green-200 bg-green-50 p-4 text-sm text-gray-700">
                  <p>Next, you’ll see your body constitution type and key tendencies.</p>
                  <button
                    onClick={handleSubmit}
                    className="w-full rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-700"
                  >
                    See My Constitution Result
                  </button>
                </div>
              )}

              {isMidway && currentQuestion < totalQuestions - 1 && (
                <p className="mt-3 text-sm text-gray-600 text-center">
                  You’re halfway there — results are coming up soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (currentStep === 'results') {
    const result = calculateConstitution(answers)
    const primaryInfo = constitutionInfo[result.primary]

    return (
      <>
        <Header />
        <div className="min-h-screen bg-white px-4 py-12 pt-28">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-emerald-50 p-8 shadow-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-green-700">Your constitution</p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-900">{primaryInfo.name}</h2>
              <p className="text-sm text-gray-600">{primaryInfo.englishName}</p>
              <p className="mt-4 text-gray-700">{primaryInfo.description}</p>
              <div className="mt-4 rounded-2xl border border-green-200 bg-white/80 p-4 text-sm text-green-900">
                {primaryInfo.modernInterpretation}
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-lg space-y-3">
              <p className="text-sm font-semibold text-gray-800">What you get next</p>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                <li>A clear explanation of why the usual advice behaves differently for you.</li>
                <li>Key tendencies to honor and situations where generic guidance falls short.</li>
                <li>Confidence that the next steps stay tied to your body constitution.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-green-50 p-6 text-gray-900 shadow">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-600">Ready when you are</p>
              <p className="mt-2 text-lg">
                Results are tailored to your constitution, with clear insights—not prescriptions.
              </p>
              <button
                onClick={handleRestartTest}
                className="mt-5 w-full rounded-full bg-white py-3 text-sm font-semibold text-green-800 shadow hover:bg-gray-100"
              >
                Retake the test
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return null
}