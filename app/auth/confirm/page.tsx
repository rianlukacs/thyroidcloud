'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      {
        // Wrap ALL component logic in an IIFE
        (() => {
          const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
          const router = useRouter()
          const searchParams = useSearchParams()

          useEffect(() => {
            const token = searchParams.get('token')
            const type = searchParams.get('type')

            if (type === 'email_confirmation' && token) {
              setStatus('success')
            } else {
              setStatus('error')
            }
          }, [searchParams])

          return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
              <Card className="w-full max-w-md bg-white rounded-[25px] border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-[#4A4A4A]">
                    {status === 'loading' ? 'Confirming Email...' : 
                     status === 'success' ? 'Email Confirmed!' : 
                     'Confirmation Error'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    {status === 'success' ? (
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    ) : status === 'error' ? (
                      <AlertCircle className="h-16 w-16 text-red-500" />
                    ) : (
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
                    )}
                  </div>
                  
                  <p className="text-center text-[#4A4A4A]">
                    {status === 'loading' ? 'Please wait while we confirm your email address...' :
                     status === 'success' ? 'Your email has been successfully confirmed. You can now sign in to your account.' :
                     'There was an error confirming your email address. Please try again or contact support.'}
                  </p>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => router.push('/signin')}
                      className="bg-gradient-to-br from-[#A7C7E7] to-[#B6D7A8] text-[#4A4A4A] hover:opacity-90"
                    >
                      {status === 'success' ? 'Sign In' : 'Return to Sign In'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )
        })()
      }
    </Suspense>
  )
}



// 'use client'

// import { useEffect, useState, Suspense } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { AlertCircle, CheckCircle } from 'lucide-react'

// function ConfirmContent() {
  // const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  // const router = useRouter()
  // const searchParams = useSearchParams()

  // useEffect(() => {
    // const token = searchParams.get('token')
    // const type = searchParams.get('type')

    // if (type === 'email_confirmation' && token) {
      // setStatus('success')
    // } else {
      // setStatus('error')
    // }
  // }, [searchParams])

  // return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
      // <Card className="w-full max-w-md bg-white rounded-[25px] border-0 shadow-lg">
        // <CardHeader>
          // <CardTitle className="text-2xl font-bold text-center text-[#4A4A4A]">
            // {status === 'loading' ? 'Confirming Email...' : 
             // status === 'success' ? 'Email Confirmed!' : 
             // 'Confirmation Error'}
          // </CardTitle>
        // </CardHeader>
        // <CardContent className="space-y-4">
          // <div className="flex justify-center">
            // {status === 'success' ? (
              // <CheckCircle className="h-16 w-16 text-green-500" />
            // ) : status === 'error' ? (
              // <AlertCircle className="h-16 w-16 text-red-500" />
            // ) : (
              // <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
            // )}
          // </div>
          
          // <p className="text-center text-[#4A4A4A]">
            // {status === 'loading' ? 
              // 'Please wait while we confirm your email address...' :
              // status === 'success' ? 
                // 'Your email has been successfully confirmed. You can now sign in to your account.' :
                // 'There was an error confirming your email address. Please try again or contact support.'
            // }
          // </p>

          // <div className="flex justify-center">
            // <Button
              // onClick={() => router.push('/signin')}
              // className="bg-gradient-to-br from-[#A7C7E7] to-[#B6D7A8] text-[#4A4A4A] hover:opacity-90"
            // >
              // {status === 'success' ? 'Sign In' : 'Return to Sign In'}
            // </Button>
          // </div>
        // </CardContent>
      // </Card>
    // </div>
  // )
// }

// export default function ConfirmPage() {
  // return (
    // <Suspense fallback={<div>Loading confirmation...</div>}>
      // <ConfirmContent />
    // </Suspense>
  // )
// }

