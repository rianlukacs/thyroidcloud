'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Utensils, CheckSquare, ListChecks } from 'lucide-react'

export default function NourishPage() {
  return (
    <main className="flex flex-col min-h-screen bg-green-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#2F855A' }} />
                  <stop offset="100%" style={{ stopColor: '#2C7A7B' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,120 60,140 100,140
                   C150,140 180,100 200,100
                   C220,100 250,120 300,120
                   C340,120 370,100 400,100
                   V0 H0 Z"
                fill="url(#leaf-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-green-100 mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Nourish
            </h1>
            <p className="text-green-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Discover thyroid-friendly recipes and meal insights
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <section className="space-y-8">
          <Card className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 gap-4">
                <Button variant="default" className="h-24 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white" asChild>
                  <Link href="/nourish/recipes">
                    <Utensils className="h-8 w-8 mb-2" />
                    <span className="text-lg font-semibold">Thyroid-Friendly Recipes</span>
                  </Link>
                </Button>
                <Button variant="default" className="h-24 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white" asChild>
                  <Link href="/nourish/check-meal">
                    <CheckSquare className="h-8 w-8 mb-2" />
                    <span className="text-lg font-semibold">Check Meal</span>
                  </Link>
                </Button>
                <Button variant="default" className="h-24 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white" asChild>
                  <Link href="/nourish/my-meals">
                    <ListChecks className="h-8 w-8 mb-2" />
                    <span className="text-lg font-semibold">My Meals</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-green-800">Nourishing Your Thyroid</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-green-700 mb-4">
                Explore our collection of thyroid-friendly recipes designed to support your thyroid health. These recipes are carefully crafted to include nutrients beneficial for thyroid function.
              </p>
              <p className="text-green-700 mb-4">
                Use our Check Meal feature to analyze your meals and ensure they align with your thyroid health goals.
              </p>
              <p className="text-green-700">
                Remember, while diet is important, it's just one part of thyroid management. Always consult with your healthcare provider for personalized advice.
              </p>
            </CardContent>
          </Card>
        </section>
      </ScrollArea>
    </main>
  )
}

