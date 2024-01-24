import { unstable_noStore as noStore } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { cookies } from 'next/headers'

export async function fetchMovies(currentPage: number, itemsPerPage = 8) {
  noStore()
  const cookieStore = cookies()
  const firstMoviePosition = currentPage * itemsPerPage - 8
  const selectResult = await createClient(cookieStore)
    .from('Movie')
    .select()
    .order('created_at', { ascending: true })
    .range(firstMoviePosition, firstMoviePosition + 7)
  const countResult = await createClient(cookieStore)
    .from('Movie')
    .select('*', { count: 'exact' })

  return { movieList: selectResult.data, movieListTotal: countResult.count }
}
