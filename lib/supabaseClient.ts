import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getLibContent(fileName: string) {
  const { data, error } = await supabase
    .from('lib_contents')
    .select('content')
    .eq('file_name', fileName)
    .single()

  if (error) {
    console.error('Error fetching lib content:', error)
    return null
  }

  return data.content
}

