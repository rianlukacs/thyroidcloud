import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Info, Clock } from 'lucide-react'
import { articles } from '@/app/lib/articles'

export default function ArticlesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
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
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Thyroid Articles
            </h1>
            <p className="text-blue-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Informative reads about thyroid health
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-6 py-8 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <Card className="mt-8 bg-blue-50 border-blue-200 rounded-lg">
          <CardContent className="p-6 text-blue-800 text-sm">
            <Info className="inline-block mr-2 h-5 w-5" />
            These are articles sourced from the internet. We are not affiliated with the writers of the content and we are not the originators. We simply want to get you information to questions you may have.
          </CardContent>
        </Card>

        <section className="space-y-6 mt-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/learn/articles/${article.id}`}
              className="block"
            >
              <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-6 bg-blue-50 flex flex-row justify-between items-center">
                  <CardTitle className="text-lg font-bold text-blue-800">{article.title}</CardTitle>
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-blue-600 mb-3">{article.description}</p>
                  <div className="flex items-center justify-between text-sm text-blue-400">
                    <span>{article.source}</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </ScrollArea>
      <div className="mt-10 p-4 text-center">
        <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
          <Link href="/learn">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learn
          </Link>
        </Button>
      </div>
    </main>
  )
}

