'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search, Zap, FlameIcon as Fire } from 'lucide-react'

interface CardioExercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  difficulty: number;
}

const cardioExercises: CardioExercise[] = [
  {
    id: 1,
    name: "Burpees",
    description: "A full-body exercise that combines a squat, push-up, and jump.",
    imageUrl: "https://images.unsplash.com/photo-1587223075055-82e9a937ddff?auto=format&fit=crop&w=300&q=80",
    difficulty: 5
  },
  {
    id: 2,
    name: "Cycling",
    description: "Riding a bicycle, either outdoors or on a stationary bike.",
    imageUrl: "https://images.unsplash.com/photo-1519350773302-075141b34e26?auto=format&fit=crop&w=300&q=80",
    difficulty: 3
  },
  {
    id: 3,
    name: "Jumping Jacks",
    description: "A calisthenics exercise involving jumping to a position with legs spread wide and hands touching overhead.",
    imageUrl: "https://images.unsplash.com/photo-1534239283410-f3640fe2c140?auto=format&fit=crop&w=300&q=80",
    difficulty: 2
  },
  {
    id: 4,
    name: "Mountain Climbers",
    description: "An exercise that mimics the motion of climbing a mountain, working your core and cardiovascular system.",
    imageUrl: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?auto=format&fit=crop&w=300&q=80",
    difficulty: 4
  },
  {
    id: 5,
    name: "Running",
    description: "Moving at a speed faster than a walk, never having both feet on the ground at the same time.",
    imageUrl: "https://images.unsplash.com/photo-1483721274302-3f77f59f5dd0?auto=format&fit=crop&w=300&q=80",
    difficulty: 3
  },
  {
    id: 6,
    name: "Swimming",
    description: "Propelling yourself through water using your limbs.",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=300&q=80",
    difficulty: 3
  },
]

export default function CardioPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState<number | null>(null)

  const filteredExercises = cardioExercises
    .filter(exercise => {
      if (difficulty === null) {
        return exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      } else {
        return exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) && exercise.difficulty === difficulty
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-pink-500 to-orange-400">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="cardio-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#FFA500' }} />
                  <stop offset="100%" style={{ stopColor: '#FF4500' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,120 60,140 100,140
                   C150,140 180,100 200,100
                   C220,100 250,120 300,120
                   C340,120 370,100 400,100
                   V0 H0 Z"
                fill="url(#cardio-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Cardio!
            </h1>
            <p className="text-yellow-100 text-l" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Get your heart pumping and calories burning! 🔥
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-yellow-100 font-medium text-lg">Intensity:</p>
              {difficulty !== null ? (
                <p className="text-yellow-100 font-medium text-lg flex items-center">
                  {difficulty} <Fire className="w-5 h-5 ml-1 text-orange-300" />
                </p>
              ) : (
                <p className="text-yellow-100 font-medium text-lg">All</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Slider
                min={1}
                max={5}
                step={1}
                value={difficulty === null ? [3] : [difficulty]}
                onValueChange={(value) => setDifficulty(value[0])}
                className="w-48 accent-orange-300"
              />
              <Button variant="outline" size="sm" onClick={() => setDifficulty(null)}>
                View All
              </Button>
            </div>
          </div>
          <div className="relative mt-4">
            <Input 
              type="search" 
              placeholder="Find your cardio groove..." 
              className="pl-10 bg-white text-orange-600 rounded-full border-2 border-orange-300 focus:border-orange-500 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-5 w-5" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="p-4 bg-gradient-to-r from-yellow-300 to-orange-300">
                <CardTitle className="text-2xl font-bold text-orange-800 flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-orange-600" />
                  {exercise.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
                    <Image
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      width={150}
                      height={150}
                      className="rounded-full object-cover w-32 h-32 border-4 border-orange-300 shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-orange-700 text-m mb-2">{exercise.description}</p>
                    <p className="text-orange-600 flex items-center text-sm">
                      Intensity: {exercise.difficulty} <Fire className="w-4 h-4 ml-1 text-orange-300" />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </main>
  )
}

