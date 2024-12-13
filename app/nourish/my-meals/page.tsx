'use client'

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ChevronDown, ChevronUp, AlertCircle, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js'
import { useToast } from "@/components/ui/use-toast"
import { supabase } from '@/utils/supabase-client' // Import from utils

interface AnalyzedMeal {
  id: number;
  meal: string;
  analysis: string;
  rating: number;
  created_at: string;
  user_id: string;
}

function MyMealsContent() {
  const [analyzedMeals, setAnalyzedMeals] = useState<AnalyzedMeal[]>([]);
  const [expandedMeals, setExpandedMeals] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast()
  
  const searchParams = useSearchParams();
  const highlightedMealId = searchParams.get('highlight')

  useEffect(() => {
    fetchMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (highlightedMealId) {
      const mealId = parseInt(highlightedMealId, 10);
      setExpandedMeals(prev => [...prev, mealId]);
      
      setTimeout(() => {
        const element = document.getElementById(`meal-${mealId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [highlightedMealId]);

const fetchMeals = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('analyzed_meals')
      .select('*')
      .eq('user_id', user.id)
      .order('rating', { ascending: false }) // Sort by rating descending

    if (error) throw error;

    setAnalyzedMeals(data || []);
  } catch (error) {
    console.error('Error fetching meals:', error);
    setError('Failed to load meals. Please try again later.');
  } finally {
    setLoading(false);
  }
};


  const handleToggle = (id: number) => {
    setExpandedMeals(prevExpanded =>
      prevExpanded.includes(id)
        ? prevExpanded.filter(expandedId => expandedId !== id)
        : [...prevExpanded, id]
    );
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('analyzed_meals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAnalyzedMeals(prevMeals => prevMeals.filter(meal => meal.id !== id));
      toast({
        title: "Success",
        description: "Meal deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast({
        title: "Error",
        description: "Failed to delete meal. Please try again.",
        variant: "destructive",
      })
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-800 to-green-600">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-red-500 text-lg font-bold text-center px-4">{error}</p>
      </div>
    );
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
            <h1 
              className="text-4xl font-bold text-green-100 mb-1" 
              style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
            >
              My Meals
            </h1>
            <p className="text-green-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Your analyzed meal history
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <h2 
          className="text-2xl font-bold text-white mb-4 mt-4" 
          style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}
        >
          My Meals
        </h2>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : analyzedMeals.length === 0 ? (
          <p className="text-green-200">No meals analyzed yet.</p>
        ) : (
          <div className="space-y-4">
            {analyzedMeals.map((analyzedMeal) => (
              <Card 
                key={analyzedMeal.id} 
                id={`meal-${analyzedMeal.id}`}
                className={`bg-white rounded-[15px] border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  highlightedMealId === analyzedMeal.id.toString() ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <CardHeader onClick={() => handleToggle(analyzedMeal.id)} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-800">{analyzedMeal.meal}</CardTitle>
                    <span className="text-green-600 font-medium ml-2"><strong>{analyzedMeal.rating}</strong></span>
                  </div>
                  {expandedMeals.includes(analyzedMeal.id) ? (
                    <ChevronUp className="w-4 h-4 mt-2 text-green-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 mt-2 text-green-500" />
                  )}
                </CardHeader>
                {expandedMeals.includes(analyzedMeal.id) && (
                  <CardContent className="p-4">
                    <CardDescription className="text-green-700 whitespace-pre-wrap">
                      {analyzedMeal.analysis}
                    </CardDescription>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(analyzedMeal.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Meal
                    </Button>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-green-800 border-green-800 hover:bg-green-100" asChild>
          <Link href="/nourish">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Nourish
          </Link>
        </Button>
      </div>
    </main>
  );
}

export default function MyMealsPage() {
  return (
    <Suspense fallback={<div>Loading meals data...</div>}>
      <MyMealsContent />
    </Suspense>
  );
}

