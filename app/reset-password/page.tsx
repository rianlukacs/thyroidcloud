'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from 'lucide-react'
import { getSupabase } from '@/utils/supabase-client'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    const accessToken = hashParams.get('access_token')
    if (accessToken) {
      getSupabase().auth.setSession({ access_token: accessToken, refresh_token: '' })
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await getSupabase().auth.updateUser({ password })

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => router.push('/signin'), 3000)
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white rounded-[25px] border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#4A4A4A]">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          {!success ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#4A4A4A]">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white text-[#4A4A4A] placeholder:text-gray-400 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#4A4A4A]">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
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
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center text-green-500">
                <CheckCircle className="w-6 h-6 mr-2" />
                <p>Password reset successfully!</p>
              </div>
              <p className="text-[#4A4A4A]">Redirecting to sign in page...</p>
            </div>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          <div className="mt-4 text-center">
            <Link href="/signin" className="text-[#4A4A4A] font-semibold hover:underline">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

