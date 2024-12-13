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

async function migrateFile(filePath: string) {
  const fileName = path.basename(filePath)
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  const { data, error } = await supabase
    .from('lib_contents')
    .upsert({ file_name: fileName, content }, { onConflict: 'file_name' })

  if (error) {
    console.error(`Error migrating ${fileName}:`, error)
  } else {
    console.log(`Successfully migrated ${fileName}`)
  }
}

async function migrateLibToSupabase() {
  const files = fs.readdirSync(libPath)

  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      await migrateFile(path.join(libPath, file))
    }
  }

  console.log('Migration completed')
}

migrateLibToSupabase()

