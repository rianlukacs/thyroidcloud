'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
  name: string;
  imageUrl: string;
}

const categories: Category[] = [
  {
    name: "Shoulders",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFp-1r-JsDTZUkJXtEOyb7LT7-9sYMgut0AA&s"
  },
  {
    name: "Back",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0eldvyYycx1JhT8BYtl-mi0iW6WtLbYDvPw&s"
  },
  {
    name: "Chest",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9dEm9EUjp5ieM4EnBdTAtwxoJZSNtDGEbhQ&s"
  },
  {
    name: "Arms",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0TckzEJiqJMpee4ElhH0WeS5FXeogkH50Qg&s"
  },
  {
    name: "Legs",
    imageUrl: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Core",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKME_vXphAlIh50Ptnj4vIPPPy6-D_-Zn-cQ&s"
  },
];

export default function StrengthTrainingPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-4 pb-24"> {/* Updated pt-6 */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="workout-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#6B46C1' }} />
                  <stop offset="100%" style={{ stopColor: '#4C1D95' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,100 60,150 100,150
                   C150,150 180,100 200,100
                   C220,100 250,150 300,150
                   C340,150 370,100 400,100
                   V0 H0 Z"
                fill="url(#workout-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          <div className="relative z-10 text-center px-6 pt-3 pb-5"> {/* Updated px-6 and pt-12 */}
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Strength Training
            </h1>
            <p className="text-purple-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Choose your muscle group
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/workouts/strength/${category.name.toLowerCase()}`} className="block">
              <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-purple-400 to-indigo-400 rounded-[25px] border-0 scale-95">
                <CardContent className="relative p-4 flex flex-col items-center justify-center text-center h-40 overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    width={140}
                    height={140}
                    className="absolute inset-0 object-cover opacity-30 w-full h-full rounded-[25px] z-0"
                  />
                  <h3 className="font-bold text-lg text-white relative z-10" style={{ textShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}>{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}

