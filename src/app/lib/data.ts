import { unstable_noStore as noStore } from 'next/cache'
import { supabase } from '@/app/lib/supabase'

export async function fetchMovies() {
  noStore()

  const { error, data } = await supabase
    .from('Movie')
    .select()
    .order('created_at', { ascending: true })

  return data
}
