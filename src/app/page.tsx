import Button from '@/app/components/Button'
import Image from 'next/image'
import MovieCard from '@/app/components/MovieCard'
import Link from 'next/link'
import { fetchMovies } from '@/app/lib/data'
import { cookies } from 'next/headers'
import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'

function LogoutButton() {
  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/signin')
  }

  return (
    <form action={signOut}>
      <button className="flex items-center justify-center space-x-3 bg-transparent">
        <span className="hidden font-bold sm:inline">Logout</span>
        <Image
          src="/images/LogoutIcon.svg"
          alt="Logout icon"
          width={32}
          height={32}
        />
      </button>
    </form>
  )
}

export default async function MainPage() {
  const { movieList, movieListTotal } = await fetchMovies(1, 8)

  return (
    <>
      {movieList?.length === 0 ? (
        <section className="flex flex-col items-center space-y-10">
          <h2>Your movie list is empty</h2>
          <Link passHref href="/create">
            <Button text="Add a new movie" />
          </Link>
        </section>
      ) : (
        <section className="flex w-full max-w-7xl flex-col items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center space-x-3">
                <h2>My movies</h2>
                <Link className="mt-2" href="/create">
                  <Image
                    src="/images/CreateMovieIcon.svg"
                    alt="Create movie icon"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
              <div>
                <LogoutButton />
              </div>
            </div>
          </div>
          <div className="my-20  grid min-h-[27rem] w-full grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:my-30 lg:grid-cols-4">
            {movieList?.map(
              (el) =>
                el.title &&
                el.year &&
                el.poster_id && (
                  <MovieCard
                    id={el.id}
                    key={el.id}
                    title={el.title}
                    year={el.year}
                    poster={el.poster_id}
                    posterImageSaved={el.poster_image_saved}
                  />
                ),
            )}
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <Link href="/">Prev</Link>
            <PaginationNumber number={1} />
            <PaginationNumber number={2} />
            <Link href="/">Next</Link>
          </div>
        </section>
      )}
    </>
  )
}

function PaginationNumber({ number }: { number: number }) {
  return (
    <Link
      className="flex size-8 items-center justify-center rounded bg-primary hover:bg-primary/55"
      href="/"
    >
      {number}
    </Link>
  )
}
