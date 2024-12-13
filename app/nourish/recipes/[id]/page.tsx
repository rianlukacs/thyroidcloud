'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Users } from 'lucide-react'
import { supabase } from '@/utils/supabase-client' // Import from utils

interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url: string;
  thyroid_condition: 'hypothyroidism' | 'hyperthyroidism' | 'both';
}

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecipe() {
      try {
        console.log('Fetching recipe with ID:', params.id)
        const { data, error } = await supabase
          .from('friendlyrecipes')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) {
          console.error('Error fetching recipe:', error)
          throw error
        }

        if (!data) {
          throw new Error('Recipe not found')
        }

        console.log('Fetched recipe:', data)
        setRecipe(data)
      } catch (err) {
        console.error('Error:', err)
        setError('Failed to load recipe')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-800 to-green-600">
        <div className="text-center text-white">
          <p>Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-800 to-green-600">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Recipe not found</h1>
          <p className="mb-8">{error || 'Unable to load recipe'}</p>
          <Button variant="outline" className="text-white border-white hover:bg-green-700" asChild>
            <Link href="/nourish/recipes">Back to Recipes</Link>
          </Button>
        </div>
      </div>
    )
  }

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
            <h1 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {recipe.title}
            </h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-16 relative z-20 max-w-md mx-auto w-full">
        {recipe.image_url && (
          <div className="mb-6 relative h-48 rounded-xl overflow-hidden">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              style={{ objectFit: 'cover' }} // Added objectFit
            />
          </div>
        )}

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-green-50">
            <CardTitle className="text-xl font-bold text-green-800">Description</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-green-700">{recipe.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-800 font-medium">Prep Time</p>
              <p className="text-green-600">{recipe.prep_time} min</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden">
            <CardContent className="p-4 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-800 font-medium">Cook Time</p>
              <p className="text-green-600">{recipe.cook_time} min</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-green-800 font-medium">Servings</p>
              <p className="text-green-600">{recipe.servings}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-green-50">
            <CardTitle className="text-xl font-bold text-green-800">Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="list-disc list-inside space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-green-700">{ingredient}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-green-50">
            <CardTitle className="text-xl font-bold text-green-800">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ol className="list-decimal list-inside space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-green-700">{instruction}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 mb-4 text-center">
          <Button variant="outline" className="bg-white text-green-800 border-green-800 hover:bg-green-100" asChild>
            <Link href="/nourish/recipes">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recipes
            </Link>
          </Button>
        </div>
      </ScrollArea>
    </main>
  )
}

