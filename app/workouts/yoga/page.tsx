'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Search, Zap, FlameIcon as Fire } from 'lucide-react'

interface YogaExercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  difficulty: number;
}

const yogaExercises: YogaExercise[] = [
   {
    id: 1,
    name: "Burpees",
    description: "A full-body exercise that combines a squat, push-up, and jump.",
    imageUrl: "https://images.unsplash.com/photo-1587223075055-82e9a937ddff?auto=format&fit=crop&w=300&q=80",
    difficulty: 5
  }
  // ... (yogaExercises array remains unchanged)
];

export default function YogaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState<number | null>(null)

  const filteredExercises = yogaExercises
    .filter(exercise => {
      if (difficulty === null) {
        return exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      } else {
        return exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) && exercise.difficulty === difficulty
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#a0529c] to-[#63b3ed]">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            {/* ... (SVG shape remains unchanged) */}
          </div>

          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Yoga &amp; Stretching
            </h1>
            <p className="text-[#ebf4f9] text-l" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Find your flow and enhance your flexibility
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-[#ebf4f9] font-medium text-lg">Intensity:</p>
              {difficulty !== null ? (
                <p className="text-[#ebf4f9] font-medium text-lg flex items-center">
                  {difficulty} <Fire className="w-5 h-5 ml-1 text-[#81d4fa]" />
                </p>
              ) : (
                <p className="text-[#ebf4f9] font-medium text-lg">All</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Slider
                min={1}
                max={5}
                step={1}
                value={difficulty === null ? [3] : [difficulty]}
                onValueChange={(value) => setDifficulty(value[0])}
                className="w-48 accent-[#81d4fa]"
              />
              <Button variant="outline" size="sm" onClick={() => setDifficulty(null)} className="text-[#ebf4f9] border-[#ebf4f9]">
                View All
              </Button>
            </div>
          </div>
          <div className="relative mt-4">
            <Input
              type="search"
              placeholder="Find your flow..."
              className="pl-10 bg-white text-purple-800 rounded-full border-2 border-[#a0529c] focus:border-[#63b3ed] transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0529c] h-5 w-5" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="p-4 bg-gradient-to-r from-[#a0529c] to-[#63b3ed]">
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-white" />
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
                      className="rounded-full object-cover w-32 h-32 border-4 border-[#81d4fa] shadow-md"
                    />
                  </div>
                  <div className="flex-1"> {/* Added missing closing tag */}
                    <p className="text-[#4a5568] text-m mb-2">{exercise.description}</p>
                    <p className="text-[#3182ce] flex items-center text-sm">
                      Intensity: {exercise.difficulty} <Fire className="w-4 h-4 ml-1 text-[#81d4fa]" />
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

