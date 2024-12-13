'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { ThyroidToggle } from '../../../components/ThyroidToggle'
import { getGlossary } from '@/lib/supabase'

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  details: string;
  normal_range?: string;
  condition: 'hypothyroidism' | 'hyperthyroidism';
}

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism'

export default function TermPage({ params }: { params: { term: string } }) {
  const [thyroidCondition, setThyroidCondition] = useState<ThyroidCondition>('hypothyroidism');
  const [termData, setTermData] = useState<GlossaryTerm | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTerm() {
      setLoading(true);
      try {
        // First try hypothyroidism
        console.log('Fetching terms for hypothyroidism...');
        let terms = await getGlossary('hypothyroidism');
        console.log('Fetched hypothyroid terms:', terms);
        
        let term = terms.find(item => {
          const normalizedItemTerm = item.term.toLowerCase().replace(/\s+/g, '-');
          const normalizedParamTerm = params.term.toLowerCase();
          console.log('Comparing:', normalizedItemTerm, 'with:', normalizedParamTerm);
          return normalizedItemTerm === normalizedParamTerm;
        });

        // If not found, try hyperthyroidism
        if (!term) {
          console.log('Term not found in hypothyroidism, trying hyperthyroidism...');
          terms = await getGlossary('hyperthyroidism');
          console.log('Fetched hyperthyroid terms:', terms);
          
          term = terms.find(item => {
            const normalizedItemTerm = item.term.toLowerCase().replace(/\s+/g, '-');
            const normalizedParamTerm = params.term.toLowerCase();
            console.log('Comparing:', normalizedItemTerm, 'with:', normalizedParamTerm);
            return normalizedItemTerm === normalizedParamTerm;
          });

          if (term) {
            setThyroidCondition('hyperthyroidism');
          }
        }

        setTermData(term || null);
      } catch (error) {
        console.error('Error fetching term:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTerm();
  }, [params.term]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!termData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Term not found</h1>
          <p className="mt-2">Please check the URL or select a valid term from the glossary.</p>
          <Button variant="outline" className="mt-4 text-white border-white hover:bg-blue-700" asChild>
            <Link href="/learn/glossary">Back to Glossary</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-8 pb-20">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2563eb' }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
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
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {termData.term}
            </h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-12 relative z-20 max-w-md mx-auto w-full">
        <ThyroidToggle onChange={setThyroidCondition} />

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6 mt-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Definition</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600">{termData.definition}</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600">{termData.details}</p>
          </CardContent>
        </Card>

        {termData.normal_range && (
          <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
            <CardHeader className="p-4 bg-blue-50">
              <CardTitle className="text-xl font-bold text-blue-800">Normal Range</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-blue-600">{termData.normal_range}</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" className="text-white border-white hover:bg-blue-700" asChild>
            <Link href="/learn/glossary">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Glossary
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </main>
  )
}

