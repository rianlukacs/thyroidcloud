import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function getGlossary(condition: 'hypothyroidism' | 'hyperthyroidism') {
  try {
    console.log('Fetching glossary terms for condition:', condition);

    const { data, error } = await supabaseClient
      .from('glossary')
      .select('*')
      .eq('condition', condition);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Fetched glossary terms:', data);

    return data || [];
  } catch (error) {
    console.error('Error in getGlossary:', error);
    throw error;
  }
}

export async function getInspirations() {
  try {
    console.log('Fetching inspirations');

    const { data, error } = await supabaseClient
      .from('inspirations')
      .select('*');

    if (error) {
      console.error('Supabase error in getInspirations:', error);
      throw error; // Re-throw the error for the calling function to handle
    }

    if (!data || data.length === 0) {
      console.warn('No inspirations found in the database');
    } else {
      console.log(`Fetched ${data.length} inspirations`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getInspirations:', error);
    throw error; // Re-throw the error to be handled by the component
  }
}

export async function getQuickFacts(condition: 'hypothyroidism' | 'hyperthyroidism') {
  try {
    console.log('Fetching quick facts for condition:', condition);

    const { data, error } = await supabaseClient
      .from('quick_facts')
      .select('*')
      .eq('condition', condition);

    if (error) {
      console.error('Supabase error in getQuickFacts:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(`No quick facts found for condition: ${condition}`);
    } else {
      console.log(`Fetched ${data.length} quick facts for condition: ${condition}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getQuickFacts:', error);
    throw error;
  }
}

export async function getSymptoms(condition: 'hypothyroidism' | 'hyperthyroidism') {
  try {
    console.log('Fetching symptoms for condition:', condition);

    const { data, error } = await supabaseClient
      .from('symptoms')
      .select('*')
      .eq('condition', condition);

    if (error) {
      console.error('Supabase error in getSymptoms:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(`No symptoms found for condition: ${condition}`);
    } else {
      console.log(`Fetched ${data.length} symptoms for condition: ${condition}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSymptoms:', error);
    throw error;
  }
}

export async function getVitamins(condition: 'hypothyroidism' | 'hyperthyroidism') {
  try {
    console.log('Fetching vitamins for condition:', condition);

    const { data, error } = await supabaseClient
      .from('vitamins')
      .select('*')
      .eq('condition', condition);

    if (error) {
      console.error('Supabase error in getVitamins:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(`No vitamins found for condition: ${condition}`);
    } else {
      console.log(`Fetched ${data.length} vitamins for condition: ${condition}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getVitamins:', error);
    throw error;
  }
}

export async function getFriendlyRecipes(condition: 'hypothyroidism' | 'hyperthyroidism' | 'both') {
  try {
    console.log('Fetching friendly recipes for condition:', condition);

    let query = supabaseClient
      .from('friendlyrecipes')
      .select('*');

    if (condition !== 'both') {
      query = query.eq('thyroid_condition', condition);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error in getFriendlyRecipes:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn(`No recipes found for condition: ${condition}`);
    } else {
      console.log(`Fetched ${data.length} recipes for condition: ${condition}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFriendlyRecipes:', error);
    throw error;
  }
}

export async function getVitaminsWithSources(vitaminId: string) {
  try {
    const { data: vitaminData, error: vitaminError } = await supabaseClient
      .from('vitamins')
      .select('*')
      .eq('id', vitaminId)
      .single();

    if (vitaminError) {
      console.error('Error fetching vitamin:', vitaminError);
      return { vitaminData: null, error: vitaminError.message };
    }

    if (!vitaminData) {
      return { vitaminData: null, error: 'Vitamin not found' };
    }

    // Access and sort sources directly from vitaminData
    if (!vitaminData.sources || !Array.isArray(vitaminData.sources)) {
      console.warn('No sources found for this vitamin or sources is not an array:', vitaminData);
      return { vitaminData: { ...vitaminData, sources: [] }, error: null };
    }

    let sortedSources = vitaminData.sources;
    sortedSources = [...sortedSources].sort((a: any, b: any) => {
      const amountA = typeof a.amount === 'number' ? a.amount : parseFloat(a.amount);
      const amountB = typeof b.amount === 'number' ? b.amount : parseFloat(b.amount);
      return (amountB || 0) - (amountA || 0);
    });

    return { vitaminData: { ...vitaminData, sources: sortedSources }, error: null };
  } catch (error: any) {
    console.error('Error in getVitaminsWithSources:', error);
    return { vitaminData: null, error: error.message || 'An unexpected error occurred' };
  }
}

