'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search } from 'lucide-react'
import { ThyroidToggle } from '../../components/ThyroidToggle'
import { getFriendlyRecipes } from '@/lib/supabase'

interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thyroid_condition: 'hypothyroidism' | 'hyperthyroidism' | 'both';
}

type ThyroidCondition = 'hypothyroidism' | 'hyperthyroidism' | 'both'

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [thyroidCondition, setThyroidCondition] = useState<ThyroidCondition>('both')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true)
      setError(null)
      try {
        const data = await getFriendlyRecipes(thyroidCondition)
        setRecipes(data)
      } catch (err) {
        console.error('Error fetching recipes:', err)
        setError('Failed to load recipes. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchRecipes()
  }, [thyroidCondition])

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-green-800 to-green-600">
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
                  <stop offset="0%" style={{ stopColor: '#68D391' }} />
                  <stop offset="100%" style={{ stopColor: '#4FD1C5' }} />
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
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Thyroid-Friendly Recipes
            </h1>
            <p className="text-green-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Nourishing meals for your thyroid health
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <ThyroidToggle onChange={setThyroidCondition} />
        
        <div className="mb-6">
          <div className="relative">
            <Input 
              type="search" 
              placeholder="Search recipes..." 
              className="pl-10 bg-white text-green-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 h-5 w-5" />
          </div>
        </div>

        <section className="space-y-4">
          {loading ? (
            <p className="text-center text-white">Loading recipes...</p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : filteredRecipes.length === 0 ? (
            <p className="text-center text-white">No recipes found matching your search.</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/nourish/recipes/${recipe.id}`} className="block">
                <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="p-4 bg-green-50">
                    <CardTitle className="text-lg font-bold text-green-800">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      {recipe.image_url && (
                        <Image
                          src={recipe.image_url}
                          alt={recipe.title}
                          width={80}
                          height={80}
                          className="rounded-full object-cover"
                        />
                      )}
                      <p className="text-green-700 flex-1">{recipe.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </section>
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-green-800 border-green-800 hover:bg-green-100" asChild>
          <Link href="/nourish">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Nourish
          </Link>
        </Button>
      </div>
    </main>
  )
}

