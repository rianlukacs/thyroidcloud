import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

const libPath = path.join(process.cwd(), 'app', 'lib')

async function migrateArticles() {
  const articles = require(path.join(libPath, 'articles.ts')).articles
  const { data, error } = await supabase.from('articles').insert(articles)
  if (error) console.error('Error migrating articles:', error)
  else console.log('Successfully migrated articles')
}

async function migrateGlossary() {
  const hypoGlossary = require(path.join(libPath, 'glossary-hypo.ts')).hypothyroidismGlossary
  const hyperGlossary = require(path.join(libPath, 'glossary-hyper.ts')).hyperthyroidismGlossary
  
  const glossaryItems = [
    ...hypoGlossary.map(item => ({ ...item, condition: 'hypothyroidism' })),
    ...hyperGlossary.map(item => ({ ...item, condition: 'hyperthyroidism' }))
  ]
  
  const { data, error } = await supabase.from('glossary').insert(glossaryItems)
  if (error) console.error('Error migrating glossary:', error)
  else console.log('Successfully migrated glossary')
}

async function migrateInspirations() {
  const inspirations = require(path.join(libPath, 'inspirations.ts')).inspirations
  const inspirationItems = inspirations.map(quote => ({ quote }))
  const { data, error } = await supabase.from('inspirations').insert(inspirationItems)
  if (error) console.error('Error migrating inspirations:', error)
  else console.log('Successfully migrated inspirations')
}

async function migrateQuickFacts() {
  const hypoFacts = require(path.join(libPath, 'quick-facts-hypo.ts')).hypothyroidismQuickFacts
  const hyperFacts = require(path.join(libPath, 'quick-facts-hyper.ts')).hyperthyroidismQuickFacts
  
  const quickFacts = [
    ...hypoFacts.map(fact => ({ ...fact, condition: 'hypothyroidism', icon: fact.icon.name })),
    ...hyperFacts.map(fact => ({ ...fact, condition: 'hyperthyroidism', icon: fact.icon.name }))
  ]
  
  const { data, error } = await supabase.from('quick_facts').insert(quickFacts)
  if (error) console.error('Error migrating quick facts:', error)
  else console.log('Successfully migrated quick facts')
}

async function migrateSymptoms() {
  const hypoSymptoms = require(path.join(libPath, 'symptoms-hypo.ts')).hypothyroidismSymptoms
  const hyperSymptoms = require(path.join(libPath, 'symptoms-hyper.ts')).hyperthyroidismSymptoms
  
  const symptoms = [
    ...hypoSymptoms.map(symptom => ({
      ...symptom,
      overview: symptom.details.overview,
      management_tips: symptom.details.managementTips,
      when_to_seek_help: symptom.details.whenToSeekHelp,
      related_symptoms: symptom.details.relatedSymptoms,
      condition: 'hypothyroidism'
    })),
    ...hyperSymptoms.map(symptom => ({
      ...symptom,
      overview: symptom.details.overview,
      management_tips: symptom.details.managementTips,
      when_to_seek_help: symptom.details.whenToSeekHelp,
      related_symptoms: symptom.details.relatedSymptoms,
      condition: 'hyperthyroidism'
    }))
  ]
  
  const { data, error } = await supabase.from('symptoms').insert(symptoms)
  if (error) console.error('Error migrating symptoms:', error)
  else console.log('Successfully migrated symptoms')
}

async function migrateVitamins() {
  const hypoVitamins = require(path.join(libPath, 'vitamins-hypo.ts')).hypothyroidismVitamins
  const hyperVitamins = require(path.join(libPath, 'vitamins-hyper.ts')).hyperthyroidismVitamins
  
  const vitamins = [
    ...hypoVitamins.map(vitamin => ({ ...vitamin, condition: 'hypothyroidism' })),
    ...hyperVitamins.map(vitamin => ({ ...vitamin, condition: 'hyperthyroidism' }))
  ]
  
  const { data, error } = await supabase.from('vitamins').insert(vitamins)
  if (error) console.error('Error migrating vitamins:', error)
  else console.log('Successfully migrated vitamins')
}

async function migrateAll() {
  await migrateArticles()
  await migrateGlossary()
  await migrateInspirations()
  await migrateQuickFacts()
  await migrateSymptoms()
  await migrateVitamins()
  console.log('Migration completed')
}

migrateAll()

