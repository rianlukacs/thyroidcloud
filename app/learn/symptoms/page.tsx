'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { ThyroidToggle } from '../../components/ThyroidToggle'
import { getSymptoms } from '@/lib/supabase'

interface Symptom {
  id: string;
  name: string;
  description: string;
  overview: string;
  management_tips: string[];
  when_to_seek_help: string[];
  related_symptoms: string[];
  condition: 'hypothyroidism' | 'hyperthyroidism';
}

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism'

export default function SymptomsPage() {
  const [thyroidCondition, setThyroidCondition] = useState<ThyroidCondition>('hypothyroidism');
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSymptoms() {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching symptoms for condition:', thyroidCondition);
        const data = await getSymptoms(thyroidCondition);
        console.log('Fetched symptoms:', data);
        setSymptoms(data);
      } catch (err) {
        console.error('Error fetching symptoms:', err);
        setError('Failed to load symptoms. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchSymptoms();
  }, [thyroidCondition]);

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
              Thyroid Symptoms
            </h1>
            <p className="text-blue-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Understanding signs of thyroid imbalance
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <ThyroidToggle onChange={setThyroidCondition} />
        
        <section className="space-y-6 mt-8">
          {loading ? (
            <div className="text-center text-white py-8">
              Loading...
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-8">
              {error}
            </div>
          ) : symptoms.length === 0 ? (
            <div className="text-center text-white py-8">
              No symptoms found for this condition.
            </div>
          ) : (
            symptoms.map((symptom) => (
              <Link 
                key={symptom.id} 
                href={`/learn/symptoms/${thyroidCondition}/${symptom.id}`}
                className="block"
              >
                <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-6 bg-blue-50 flex flex-row justify-between items-center">
                    <CardTitle className="text-lg font-bold text-blue-800">{symptom.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      <ArrowRight className="h-5 w-5 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-blue-600">{symptom.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </section>

        <div className="mt-10 p-6 bg-yellow-100 rounded-lg text-yellow-800 text-sm">
          <p className="font-bold mb-2">Important Note:</p>
          <p>
            These symptoms can be associated with many conditions. If you're experiencing these symptoms, 
            please consult with a healthcare professional for proper diagnosis and treatment.
          </p>
        </div>
      </ScrollArea>
      <div className="mt-10 p-4 text-center">
        <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
          <Link href="/learn">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
          </Link>
        </Button>
      </div>
    </main>
  )
}

