'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from 'lucide-react'
import { scanMenu } from './actions'

interface ScanResult {
  item: string;
  score: number;
  recommendation: string;
  details: string;
}

export default function MenuScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [thyroidCondition, setThyroidCondition] = useState<'hypothyroidism' | 'hyperthyroidism'>('hypothyroidism')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleScan = async () => {
    if (!selectedFile) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('condition', thyroidCondition)

      const results = await scanMenu(formData)
      setScanResults(results)
    } catch (err) {
      setError('An error occurred while scanning the menu. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-green-800 to-green-600">
      <header className="relative w-full max-w-md mx-auto">
        <div className="relative pt-6 pb-24">
          <div className="absolute inset-0 overflow-hidden">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full h-full" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="leaf-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#68D391' }} />
                  <stop offset="100%" style={{ stopColor: '#4FD1C5' }} />
                </linearGradient>
              </defs>
              <path
                d="M0,100 
                   C30,120 60,140 100,140
                   C150,140 180,100 200,100
                   C220,100 250,120 300,120
                   C340,120 370,100 400,100
                   V0 H0 Z"
                fill="url(#leaf-gradient)"
                className="drop-shadow-lg"
              />
            </svg>
          </div>
          
          <div className="relative z-10 text-center px-6 pt-1 pb-5">
            <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Quicksand', sans-serif", textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
              Menu Scanner
            </h1>
            <p className="text-green-100 text-base" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Find thyroid-friendly options when dining out
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 py-6 -mt-16 relative z-20 max-w-md mx-auto w-full">
        <Card className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden mb-6">
          <CardHeader>
            <CardTitle className="text-green-800">Upload Menu Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                value={thyroidCondition}
                onValueChange={(value: 'hypothyroidism' | 'hyperthyroidism') => setThyroidCondition(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your thyroid condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hypothyroidism">Hypothyroidism</SelectItem>
                  <SelectItem value="hyperthyroidism">Hyperthyroidism</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              {previewUrl && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={previewUrl}
                    alt="Menu preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <Button 
                onClick={handleScan}
                disabled={!selectedFile || isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scanning...
                  </span>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Scan Menu
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Card className="bg-red-50 text-red-800 rounded-[25px] border-0 shadow-lg overflow-hidden mb-6">
            <CardContent className="p-4">
              <p>{error}</p>
            </CardContent>
          </Card>
        )}

        {scanResults.length > 0 && (
          <Card className="bg-white rounded-[25px] border-0 shadow-lg overflow-hidden mb-6">
            <CardHeader>
              <CardTitle className="text-green-800">Scan Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {scanResults.map((result, index) => (
                  <li key={index} className="border-b border-green-100 pb-2 last:border-b-0 last:pb-0">
                    <p className="text-green-800 font-semibold">{result.item}</p>
                    <p className="text-green-600">Score: {result.score}/10</p>
                    <p className="text-green-700 text-sm">{result.recommendation}</p>
                    <p className="text-green-600 text-xs mt-1">{result.details}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </ScrollArea>
      <div className="p-4 text-center">
        <Button variant="outline" className="bg-white text-green-800 border-green-800 hover:bg-green-100" asChild>
          <Link href="/nourish">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Nourish
          </Link>
        </Button>
      </div>
    </main>
  )
}

