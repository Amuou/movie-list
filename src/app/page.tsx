import Button from '@/app/components/Button'
import Image from 'next/image'
import MovieCard from '@/app/components/MovieCard'
import Link from 'next/link'
import { fetchMovies } from '@/app/lib/data'

export default async function MainPage() {
  const movieList = await fetchMovies()
  return (
    <>
      {movieList?.length !== 0 ? (
        <section className="flex max-h-screen min-h-screen flex-col items-center justify-center space-y-10">
          <h2>Your movie list is empty</h2>
          <Button text="Add a new movie" />
        </section>
      ) : (
        <section className="mx-auto flex w-9/12 max-w-screen-xl flex-col items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center space-x-3">
                <h2>My movies</h2>
                <Link className="mt-2" href="create">
                  <Image
                    src="/CreateMovieIcon.svg"
                    alt="Create movie icon"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
              <div>
                <Link
                  className="flex items-center justify-center space-x-3"
                  href="logout"
                >
                  <span>Logout</span>
                  <Image
                    src="/LogoutIcon.svg"
                    alt="Logout icon"
                    width={32}
                    height={32}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="my-32 grid w-full grid-cols-4 gap-6">
            {movieList?.map(
              (el) =>
                el.title &&
                el.year &&
                el.posterId && (
                  <MovieCard
                    key={el.id}
                    title={el.title}
                    year={el.year}
                    poster={el.posterId}
                  />
                ),
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Link href="a">Prev</Link>
            <Link
              className="flex size-8 items-center justify-center rounded bg-primary"
              href="a"
            >
              1
            </Link>
            <Link
              className="flex size-8 items-center justify-center rounded bg-primary"
              href="a"
            >
              2
            </Link>
            <Link href="a">Next</Link>
          </div>
        </section>
      )}
    </>
  )
}
