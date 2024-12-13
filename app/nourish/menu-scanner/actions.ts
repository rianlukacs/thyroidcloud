'use server'

import { createWorker } from 'tesseract.js'
import { writeFile } from 'fs/promises'
import path from 'path'
import os from 'os'

// Simulated database of thyroid-friendly foods
const thyroidFriendlyFoods = {
  salmon: { score: 9, reason: "High in omega-3 fatty acids and selenium" },
  spinach: { score: 8, reason: "Rich in iron and antioxidants" },
  quinoa: { score: 7, reason: "Good source of protein and fiber" },
  chicken: { score: 7, reason: "Lean protein source" },
  lentils: { score: 8, reason: "High in fiber and zinc" },
  "sweet potato": { score: 8, reason: "Rich in vitamin A and fiber" },
  broccoli: { score: 7, reason: "High in antioxidants, but moderate in goitrogens" },
  "olive oil": { score: 8, reason: "Healthy fats and anti-inflammatory properties" },
  eggs: { score: 7, reason: "Good source of iodine and selenium" },
  yogurt: { score: 7, reason: "Probiotic benefits, but watch for added sugars" },
  // Add more foods as needed
};

export async function scanMenu(formData: FormData) {
  const file = formData.get('image') as File
  if (!file) {
    throw new Error('No file uploaded')
  }

  // Save the file temporarily
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const tempDir = os.tmpdir()
  const tempFilePath = path.join(tempDir, `menu-${Date.now()}.png`)
  await writeFile(tempFilePath, buffer)

  // Perform OCR
  const worker = await createWorker('eng')
  const { data: { text } } = await worker.recognize(tempFilePath)
  await worker.terminate()

  // Clean up temporary file
  await writeFile(tempFilePath, '')

  // Process the extracted text
  const menuItems = processMenuText(text)

  // Analyze menu items
  const results = menuItems.map(item => analyzeMenuItem(item))

  return results
}

function processMenuText(text: string): string[] {
  // Split the text into lines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim().length > 0)

  // TODO: Implement more sophisticated text processing
  // This could include removing prices, categorizing items, etc.

  return lines
}

function analyzeMenuItem(item: string) {
  const lowercaseItem = item.toLowerCase()
  let totalScore = 0
  let matchingFoods: string[] = []

  for (const [food, info] of Object.entries(thyroidFriendlyFoods)) {
    if (lowercaseItem.includes(food)) {
      totalScore += info.score
      matchingFoods.push(food)
    }
  }

  // Normalize the score
  const score = Math.min(10, Math.round(totalScore / matchingFoods.length))

  let recommendation
  if (score >= 8) {
    recommendation = "Excellent choice for thyroid health!"
  } else if (score >= 6) {
    recommendation = "Good option, but be mindful of portion sizes."
  } else if (score >= 4) {
    recommendation = "Moderate option. Consider healthier alternatives if available."
  } else {
    recommendation = "Less ideal for thyroid health. Consider other options if possible."
  }

  const details = matchingFoods.map(food => thyroidFriendlyFoods[food].reason).join(". ")

  return { item, score, recommendation, details }
}

