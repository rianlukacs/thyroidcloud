'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { hypothyroidismVitamins } from '@/app/lib/vitamins-hypo';
import { hyperthyroidismVitamins } from '@/app/lib/vitamins-hyper';

const normalizeVitaminKey = (vitamin: string): string => {
  return vitamin.toLowerCase().replace(/[\s-]+/g, '');
};

export default function VitaminPage({ params }: { params: { vitamin: string } }) {
  const vitaminKey = normalizeVitaminKey(params.vitamin);
  const vitaminData = [...hypothyroidismVitamins, ...hyperthyroidismVitamins].find(v => normalizeVitaminKey(v.name) === vitaminKey);

  if (!vitaminData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#A7C7E7] to-[#D4B6E2] text-[#4A4A4A]">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Vitamin Not Found</h1>
          <p className="mt-2">Please check the URL or select a valid vitamin from the list.</p>
          <Button variant="outline" className="mt-4 bg-white text-[#4A4A4A] hover:bg-[#F1E1C6] hover:text-[#4A4A4A]" asChild>
            <Link href="/learn/vitamins">Go Back</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#A7C7E7] to-[#D4B6E2]">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-8 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="header-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2563eb' }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,120 60,140 100,140
                   C150,140 180,100 200,100
                   C220,100 250,120 300,120
                   C340,120 370,100 400,100
                   V0 H0 Z"
                fill="url(#header-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {vitaminData.name}
            </h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-12 relative z-20 max-w-md mx-auto w-full">
        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Description</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600">{vitaminData.description}</p>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Benefits</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="list-disc list-inside text-blue-600">
              {vitaminData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-[#F1E1C6]">
            <CardTitle className="text-xl font-bold text-[#4A4A4A]">Food Sources</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="list-disc list-inside text-[#4A4A4A]">
              {vitaminData.sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {vitaminData.recommended_dosage && (
          <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
            <CardHeader className="p-4 bg-blue-50">
              <CardTitle className="text-xl font-bold text-blue-800">Recommended Dosage</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-blue-600">{vitaminData.recommended_dosage}</p>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Precautions</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600">{vitaminData.precautions}</p>
          </CardContent>
        </Card>
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
          <Link href="/learn/vitamins">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vitamins
          </Link>
        </Button>
      </div>
    </main>
  )
}

