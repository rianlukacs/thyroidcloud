'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { Navigation } from './components/Navigation'
import { ScrollToTop } from './components/ScrollToTop'
import { Toaster } from "@/components/ui/toaster"
import { supabase } from '@/utils/supabase-client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<any>(null)
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error checking session:', error)
        }

        setSession(data.session)
        setIsLoading(false) // Move setIsLoading here

        const publicRoutes = ['/signin', '/signup', '/auth/confirm']
        if (!data.session && !publicRoutes.includes(pathname)) {
          console.log('Redirecting to /signin...')
          redirect('/signin')
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

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(session)
        console.log('Signed in:', session)
      } else if (event === 'SIGNED_OUT') {
        setSession(null)
        console.log('Signed out')
        redirect('/signin')
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [pathname])

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

