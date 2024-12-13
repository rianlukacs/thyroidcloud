'use client'

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Cloud, Heart, Lightbulb, Utensils, Users, Dumbbell, LogOut } from 'lucide-react'
import dynamic from 'next/dynamic'
import { articles } from './lib/articles'
import { supabase } from '@/utils/supabase-client' // Import from utils
import { useRouter } from 'next/navigation'

// Dynamically import the DailyInspirationCard with no SSR
const DailyInspirationCard = dynamic(
  () => import('./components/DailyInspirationCard').then((mod) => mod.DailyInspirationCard),
  { ssr: false }
)

function getRandomArticle() {
  return articles[Math.floor(Math.random() * articles.length)];
}

export default function Home() {
  const featuredArticle = getRandomArticle();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  return (
    <>
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pb-32">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#A7C7E7' }} />
                  <stop offset="100%" style={{ stopColor: '#D4B6E2' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,100 60,150 100,150
                   C150,150 180,100 200,100
                   C220,100 250,150 300,150
                   C340,150 370,100 400,100
                   V0 H0 Z"
                fill="url(#cloud-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-8">
            <h1 className="text-4xl font-bold text-[#4A4A4A] mb-2" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              ThyroidCloud
            </h1>
            <p className="text-[#4A4A4A] text-lg">
              Your vibrant space for thyroid wellness
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <section className="space-y-8">
          <Card className="overflow-hidden bg-[#F5F5F5] rounded-[30px] border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <Cloud className="w-16 h-16 text-[#4A4A4A]" />
              </div>
              <h2 className="text-3xl font-bold text-[#4A4A4A] text-center mb-3" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                Welcome to Your Comfort Zone
              </h2>
              <p className="text-[#4A4A4A] text-center text-xl">
                Explore, learn, and thrive in a supportive environment tailored just for you.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            {[
              { href: "/learn", icon: Lightbulb, title: "Learn" },
              { href: "/workouts", icon: Dumbbell, title: "Workouts" },
              { href: "/nourish", icon: Utensils, title: "Nourish" },
              { href: "/wellbeing", icon: Heart, title: "Thrive" },
            ].map((item, index) => (
              <Link key={item.href} href={item.href} className="block">
                <Card className={`h-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${index % 2 === 0 ? 'from-[#A7C7E7] to-[#B6D7A8]' : 'from-[#D4B6E2] to-[#F1C6D3]'} rounded-[25px] border-0 scale-95`}>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-white bg-opacity-30 p-3 rounded-full mb-4">
                      <item.icon className="w-10 h-10 text-[#4A4A4A]" />
                    </div>
                    <h3 className="font-bold text-xl text-[#4A4A4A]" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }}>{item.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <DailyInspirationCard />

          <Card className="bg-[#F5F5F5] rounded-[30px] border-0 shadow-lg overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#4A4A4A] mb-4 flex items-center" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                <Lightbulb className="w-8 h-8 mr-2 text-[#4A4A4A]" />
                Featured Insight
              </h2>
              <h3 className="text-lg sm:text-xl font-semibold text-[#4A4A4A] mb-2 sm:mb-3 break-words hyphens-auto leading-tight">
                {featuredArticle.title}
              </h3>
              <p className="text-sm sm:text-base text-[#4A4A4A] mb-4 sm:mb-6">
                {featuredArticle.description}
              </p>
              <Button className="w-full bg-gradient-to-br from-[#A7C7E7] to-[#B6D7A8] text-[#4A4A4A] hover:opacity-90 text-base font-semibold rounded-full transition-all duration-300 transform hover:scale-105 py-4 sm:py-6 shadow-md" asChild>
                <Link href={`/learn/articles/${featuredArticle.id}`}>
                  Explore More
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full bg-white text-blue-800 hover:bg-blue-100 mt-4"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </section>
      </ScrollArea>
    </>
  )
}

