'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Book, FlaskRoundIcon as Flask, Pill, Search, Stethoscope, Zap, Brain, Thermometer, Scale, Heart, Clock, Moon, Droplets } from 'lucide-react'
import { ThyroidToggle } from '../components/ThyroidToggle'
import { getQuickFacts } from '@/lib/supabase'

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism'

export default function LearnPage() {
  const [thyroidCondition, setThyroidCondition] = useState<ThyroidCondition>('hypothyroidism')
  const [randomFacts, setRandomFacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFacts() {
      try {
        const facts = await getQuickFacts(thyroidCondition)
        const shuffled = [...facts].sort(() => 0.5 - Math.random())
        setRandomFacts(shuffled.slice(0, 3))
      } catch (error) {
        console.error('Error loading quick facts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFacts()
  }, [thyroidCondition])

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#A7C7E7' }} />
                  <stop offset="100%" style={{ stopColor: '#D4B6E2' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,100 60,150 100,150
                   C150,150 180,100 200,100
                   C220,100 250,150 300,150
                   C340,150 370,100 400,100
                   V0 H0 Z"
                fill="url(#cloud-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Learn
            </h1>
            <p className="text-blue-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Expand your thyroid knowledge
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <ThyroidToggle onChange={setThyroidCondition} />
        
        <section className="space-y-8 mt-8">
          <Card className="bg-gradient-to-br from-[#A7C7E7] to-[#D4B6E2] rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="secondary" className="h-24 flex flex-col items-center justify-center text-[#4A4A4A] bg-white hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
                  <Link href="/learn/vitamins">
                    <Pill className="h-8 w-8 mb-2" />
                    <span className="text-sm font-semibold">Vitamins</span>
                  </Link>
                </Button>
                <Button variant="secondary" className="h-24 flex flex-col items-center justify-center text-[#4A4A4A] bg-white hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
                  <Link href="/learn/articles">
                    <Flask className="h-8 w-8 mb-2" />
                    <span className="text-sm font-semibold">Articles</span>
                  </Link>
                </Button>
                <Button variant="secondary" className="h-24 flex flex-col items-center justify-center text-[#4A4A4A] bg-white hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
                  <Link href="/learn/symptoms">
                    <Stethoscope className="h-8 w-8 mb-2" />
                    <span className="text-sm font-semibold">Symptoms</span>
                  </Link>
                </Button>
                <Button variant="secondary" className="h-24 flex flex-col items-center justify-center text-[#4A4A4A] bg-white hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
                  <Link href="/learn/glossary">
                    <Book className="h-8 w-8 mb-2" />
                    <span className="text-sm font-semibold">Thyroid Glossary</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-[30px] border-0 shadow-lg overflow-hidden">
            <CardHeader className="px-6 pt-6 pb-2">
              <CardTitle className="text-[#4A4A4A] text-2xl">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul className="space-y-4">
                  {randomFacts.map((fact, index) => {
                    const IconComponent = {
                      Zap, Brain, Pill, Thermometer, Scale, 
                      Heart, Clock, Moon, Droplets
                    }[fact.icon] || Zap;
                    
                    return (
                      <li key={index} className="flex items-start text-[#4A4A4A]">
                        <IconComponent className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-base leading-relaxed">{fact.text}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#A7C7E7] to-[#B6D7A8] rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }}>
                Explore More
              </h2>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full justify-start text-[#4A4A4A] bg-white hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
                  <Link href="/learn/faq">
                    <Search className="h-5 w-5 mr-2" />
                    <span>Frequently Asked Questions</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </ScrollArea>
    </main>
  )
}

