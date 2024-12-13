'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from '@/utils/supabase-client' // Import the correct client
import { getInspirations } from '@/lib/supabase'

export function DailyInspirationCard() {
  const [inspiration, setInspiration] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchInspiration() {
      try {
        setLoading(true)
        const inspirations = await getInspirations()

        if (inspirations && inspirations.length > 0) {
          const randomInspiration = inspirations[Math.floor(Math.random() * inspirations.length)]
          setInspiration(randomInspiration.quote)
        } else {
          setError('No inspirations available')
        }
      } catch (error: any) {
        console.error('Error fetching inspiration:', error)
        setError(error.message || 'Failed to load inspiration')
      } finally {
        setLoading(false)
      }
    }

    fetchInspiration()

    const handleFocus = () => {
      if (!inspiration) {
        fetchInspiration()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  if (loading) {
    return (
      <Card className="bg-[#F5F5F5] rounded-[30px] border-0 shadow-lg overflow-hidden relative">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-[#4A4A4A] mb-3" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Daily Inspiration</h2>
          <p className="text-lg text-[#4A4A4A]" style={{ fontFamily: "'Quicksand', sans-serif" }}>Loading...</p>
        </CardContent>
      </Card>
    )
  }


  if (error) {
    return (
      <Card className="bg-[#F5F5F5] rounded-[30px] border-0 shadow-lg overflow-hidden relative">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-[#4A4A4A] mb-3" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Daily Inspiration</h2>
          <p className="text-lg text-red-500" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {error}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#F5F5F5] rounded-[30px] border-0 shadow-lg overflow-hidden relative">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-3" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>Daily Inspiration</h2>
        <p className="text-lg text-[#4A4A4A]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          "{inspiration}"
        </p>
      </CardContent>
    </Card>
  )
}

