'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { hypothyroidismSymptoms, Symptom as HypoSymptom } from '../../../../lib/symptoms-hypo'
import { hyperthyroidismSymptoms, Symptom as HyperSymptom } from '../../../../lib/symptoms-hyper'

type Symptom = HypoSymptom | HyperSymptom

function getSymptomById(condition: 'hypothyroidism' | 'hyperthyroidism', id: string): Symptom | undefined {
  const symptoms = condition === 'hypothyroidism' ? hypothyroidismSymptoms : hyperthyroidismSymptoms;
  return symptoms.find(symptom => symptom.id === id);
}

export default function SymptomDetailPage({ 
  params 
}: { 
  params: { condition: 'hypothyroidism' | 'hyperthyroidism'; symptom: string } 
}) {
  const [symptomData, setSymptomData] = useState<Symptom | null>(null);

  useEffect(() => {
    const data = getSymptomById(params.condition, params.symptom);
    setSymptomData(data || null);
  }, [params.condition, params.symptom]);

  if (!symptomData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Symptom not found</h1>
          <p className="mt-2">Please check the URL or select a valid symptom from the list.</p>
          <Button variant="outline" className="mt-4 text-white border-white hover:bg-blue-700" asChild>
            <Link href="/learn/symptoms">Back to Symptoms</Link>
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
          
          <div className="relative z-10 text-center px-6 pb-12">
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {symptomData.name}
            </h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-12 relative z-20 max-w-md mx-auto w-full">
        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600">{symptomData.details.overview}</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Management Tips</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {symptomData.details.managementTips.map((tip, index) => (
                <li key={index} className="flex items-start text-blue-600">
                  <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">When to Seek Help</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="list-disc marker:text-blue-600 text-blue-600 pl-5">
              {symptomData.details.whenToSeekHelp.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Related Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="list-disc marker:text-blue-600 text-blue-600 pl-5">
              {symptomData.details.relatedSymptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
          <Link href="/learn/symptoms">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Symptoms
          </Link>
        </Button>
      </div>
    </main>
  )
}

