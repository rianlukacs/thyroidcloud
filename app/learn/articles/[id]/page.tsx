import { useRouter } from 'next/router'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from 'lucide-react'
import { articles } from '@/app/lib/articles'

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id)

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <p className="mt-2">The article you're looking for doesn't exist.</p>
          <Button variant="outline" className="mt-4 text-white border-white hover:bg-blue-700" asChild>
            <Link href="/learn/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    )
  }

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
          
          <div className="relative z-10 text-center px-5 pt-1 pb-7">
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              {article.title}
            </h1>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <Card className="bg-white rounded-[15px] border-0 shadow-md overflow-hidden mb-6">
          <CardHeader className="p-4 bg-blue-50">
            <CardTitle className="text-xl font-bold text-blue-800">Article Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-blue-600 mb-4">{article.description}</p>
            <div className="flex items-center justify-between text-sm text-blue-400 mb-4">
              <span>{article.source}</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            <p className="text-blue-800">{article.content}</p>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
            <Link href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
              Read Full Article
            </Link>
          </Button>
        </div>
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-blue-800 border-blue-800 hover:bg-blue-100" asChild>
          <Link href="/learn/articles">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Link>
        </Button>
      </div>
    </main>
  )
}

