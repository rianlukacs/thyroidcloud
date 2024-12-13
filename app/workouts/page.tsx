'use client'

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Dumbbell, SpaceIcon as Yoga, Zap, Move, Settings } from 'lucide-react'

const workoutTypes = [
  { href: "/workouts/cardio", icon: Heart, title: "Cardio" },
  { href: "/workouts/strength", icon: Dumbbell, title: "Strength Training" },
  { href: "/workouts/yoga", icon: Yoga, title: "Yoga & Stretching" },
  { href: "/workouts/hiit", icon: Zap, title: "HIIT" },
  { href: "/workouts/functional", icon: Move, title: "Functional" },
  { href: "/workouts/custom", icon: Settings, title: "Custom", isCustom: true },
]

export default function WorkoutsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="workout-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#6B46C1' }} />
                  <stop offset="100%" style={{ stopColor: '#4C1D95' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,120 60,140 100,140
                   C150,140 180,100 200,100
                   C220,100 250,120 300,120
                   C340,120 370,100 400,100
                   V0 H0 Z"
                fill="url(#workout-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Workouts
            </h1>
            <p className="text-purple-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Choose your workout type
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-6">
          {workoutTypes.map((item, index) => (
            <Link key={item.href} href={item.href} className="block">
              <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                item.isCustom
                  ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                  : `bg-gradient-to-br ${
                      index % 2 === 0 ? 'from-purple-400 to-indigo-400' : 'from-indigo-400 to-purple-400'
                    }`
              } rounded-[25px] border-0 scale-95`}>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-40">
                  <div className={`bg-white bg-opacity-30 p-3 rounded-full mb-4 ${
                    item.isCustom ? 'animate-pulse' : ''
                  }`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-white" style={{ textShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}>{item.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}

