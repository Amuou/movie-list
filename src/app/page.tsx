import Button from '@/app/components/Button'
import Image from 'next/image'
import MovieCard from '@/app/components/MovieCard'
import Link from 'next/link'
import { fetchMovies } from '@/app/lib/data'
import LogoutButton from '@/app/components/LogoutButton'

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
                    src="/CreateMovieIcon.svg"
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
          <div className="my-30 grid w-full grid-cols-4 gap-6">
            {movieList?.map(
              (el) =>
                el.title &&
                el.year &&
                el.poster_id && (
                  <MovieCard
                    key={el.id}
                    title={el.title}
                    year={el.year}
                    poster={el.poster_id}
                  />
                ),
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/a">Prev</Link>
            <Link
              className="flex size-8 items-center justify-center rounded bg-primary"
              href="/a"
            >
              1
            </Link>
            <Link
              className="flex size-8 items-center justify-center rounded bg-primary"
              href="/a"
            >
              2
            </Link>
            <Link href="/a">Next</Link>
          </div>
        </section>
      )}
    </>
  )
}
