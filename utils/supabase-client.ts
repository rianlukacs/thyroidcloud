import { createClient } from '@supabase/supabase-js'

let supabase;

if (typeof window !== 'undefined') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables. Please check your .env.local file or Vercel project settings.')
    
    // Provide fallback values to prevent the app from crashing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key'
    
    // Create a dummy Supabase client
    supabase = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: new Error('Supabase client not properly initialized') }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      // Add other necessary methods with dummy implementations
    }
  } else {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Create the Supabase client
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        storageKey: 'thyroid-cloud-auth',
        storage: window.localStorage,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  }
} else {
  // Server-side placeholder
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: new Error('Supabase client not available server-side') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    // Add other necessary methods with dummy implementations
  }
}

export { supabase }

