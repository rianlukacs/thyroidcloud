'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { ThyroidToggle } from '../../components/ThyroidToggle'
import { getVitamins } from '@/lib/supabase'

const normalizeVitaminKey = (vitaminId: string): string => {
  return vitaminId;
};

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism'

export default function VitaminsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [thyroidCondition, setThyroidCondition] = useState<ThyroidCondition>('hypothyroidism');
  const [vitamins, setVitamins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVitamins() {
      try {
        const data = await getVitamins(thyroidCondition)
        setVitamins(data)
      } catch (error) {
        console.error('Error fetching vitamins:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVitamins()
  }, [thyroidCondition]);

  const filteredVitamins = vitamins.filter(vitamin =>
    vitamin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
              Thyroid Vitamins
            </h1>
            <p className="text-blue-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Essential nutrients for thyroid health
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <ThyroidToggle onChange={setThyroidCondition} />
        
        <div className="mt-8 mb-8">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search vitamins..." 
              className="pl-10 bg-white text-[#4A4A4A]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4A4A4A] h-5 w-5" />
          </div>
        </div>

        <section className="space-y-6">
          {loading ? (
            <p className="text-center text-white">Loading vitamins...</p>
          ) : filteredVitamins.length === 0 ? (
            <p className="text-center text-white">No vitamins found matching your search.</p>
          ) : (
            filteredVitamins.map((vitamin, index) => (
              <Link href={`/learn/vitamins/${vitamin.id}`} key={vitamin.id} className="block mb-4">
                <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-6 bg-[#F1E1C6] flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-bold text-[#4A4A4A]">{vitamin.name}</CardTitle>
                    <ArrowRight className="h-5 w-5 text-[#4A4A4A]" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-[#4A4A4A]">{vitamin.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </section>

        <div className="mt-10 text-center">
          <Button variant="outline" className="text-[#4A4A4A] border-[#4A4A4A] hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
            <Link href="/learn">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </>
  )
}

