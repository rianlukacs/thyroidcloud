'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/utils/supabase-client'
import { useToast } from "@/components/ui/use-toast"

interface AnalyzedMeal {
  id: number;
  meal: string;
  analysis: string;
  rating: number;
  user_id: string;
}

export default function CheckMealPage() {
  const [mealDescription, setMealDescription] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analyzedMeals, setAnalyzedMeals] = useState<AnalyzedMeal[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error checking authentication:', error)
        setError('Authentication error. Please try again later.')
        return
      }

      setUser(data.user)

      if (!data.user) {
        router.push('/signin')
      } else {
        await fetchAnalyzedMeals(data.user.id)
      }
    }

    checkAuth()
  }, [router])

  const fetchAnalyzedMeals = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('analyzed_meals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      setAnalyzedMeals(data || [])
    } catch (err) {
      console.error('Error fetching meals:', err)
      setError('Failed to load meal suggestions. Please try again later.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMealDescription(value)

    if (value.length > 0) {
      const matchingSuggestions = analyzedMeals
        .filter(meal => meal.meal.toLowerCase().includes(value.toLowerCase()))
        .map(meal => meal.meal)
      setSuggestions(matchingSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMealDescription(suggestion)
    setSuggestions([])

    const exactMatch = analyzedMeals.find(meal => meal.meal.toLowerCase() === suggestion.toLowerCase())
    if (exactMatch) {
      router.push(`/nourish/my-meals?highlight=${exactMatch.id}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setAnalysis('')

    const exactMatch = analyzedMeals.find(meal => meal.meal.toLowerCase() === mealDescription.toLowerCase())
    if (exactMatch) {
      router.push(`/nourish/my-meals?highlight=${exactMatch.id}`)
      setIsLoading(false)
      return
    }

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('User not authenticated')
      }

      const response = await fetch('/api/analyze-meal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ meal: mealDescription }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData?.error || response.statusText
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setAnalysis(data.analysis)

      toast({
        title: "Success",
        description: "Meal analyzed successfully!",
      })
    } catch (err: any) {
      console.error('Error analyzing meal:', err)
      setError(err.message || 'An unexpected error occurred')

      toast({
        title: "Error",
        description: err.message || 'Failed to analyze meal. Please try again.',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-600">
      <div className="relative w-full max-w-md mx-auto pt-6 px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
            Check Meal
          </h1>
          <p className="text-green-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Analyze your meal for thyroid health
          </p>
        </div>

        <Card className="bg-white rounded-[25px] border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-800">Analyze Your Meal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Meal'
                )}
              </Button>
              
              <div className="relative">
                <Textarea
                  placeholder="Describe your meal here..."
                  value={mealDescription}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                />
                {suggestions.length > 0 && (
                  <div 
                    className="absolute left-0 right-0 top-full z-[9999] bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-green-800"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mt-6 bg-red-50 text-red-800 rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardContent className="p-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {analysis && (
          <Card className="mt-6 bg-white rounded-[25px] border-0 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-green-800">Meal Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 whitespace-pre-wrap">{analysis}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

