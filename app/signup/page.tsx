'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { supabase } from '@/utils/supabase-client' // Import the correct client
import { getSupabase } from '@/utils/supabase-client';

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await getSupabase().auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        router.push('/signin?message=Account created successfully. Please sign in.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white rounded-[25px] border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#4A4A4A]">Sign Up for ThyroidCloud</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#4A4A4A]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-[#4A4A4A] placeholder:text-gray-400 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#4A4A4A]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white text-[#4A4A4A] placeholder:text-gray-400 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-[#4A4A4A]">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white text-[#4A4A4A] placeholder:text-gray-400 border-gray-200"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-br from-[#A7C7E7] to-[#B6D7A8] text-[#4A4A4A] hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <div className="mt-4 text-center">
            <p className="text-sm text-[#4A4A4A]">
              Already have an account?{' '}
              <Link href="/signin" className="text-[#4A4A4A] font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

