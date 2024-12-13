'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Navigation } from './components/Navigation'
import { ScrollToTop } from './components/ScrollToTop'
import { Toaster } from "@/components/ui/toaster"
import { getSupabase } from '@/utils/supabase-client'

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
  const [session, setSession] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await getSupabase().auth.getSession()

        if (error) {
          console.error('Error checking session:', error)
        }

        setSession(data.session)
        setIsLoading(false)

        const publicRoutes = ['/signin', '/signup', '/auth/confirm', '/forgot-password', '/reset-password']
        if (!data.session && !publicRoutes.includes(pathname)) {
          console.log('Redirecting to /signin...')
          router.push('/signin')
        } else if (data.session) {
          console.log('Session found:', data.session)
        } else {
          console.log('No session found, but on a public route.')
        }
      } catch (error) {
        console.error('Auth error:', error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col">
        <ScrollToTop />
        <main className="flex-1">
          {children}
        </main>
        {session && <Navigation />}
        <Toaster />
      </body>
    </html>
  )
}

