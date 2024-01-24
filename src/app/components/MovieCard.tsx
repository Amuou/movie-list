import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

interface MovieCardProps {
  id: string
  poster: string
  title: string
  year: string
  posterImageSaved: boolean
}

export default function MovieCard({
  id,
  poster,
  posterImageSaved,
  title,
  year,
}: MovieCardProps) {
  const movieYear = useMemo(() => new Date(year).getFullYear(), [year])

  return (
    <Link href={`/create?type=edit&movieId=${id}`}>
      <div className="col-span-1 flex h-full flex-col justify-between rounded-xl bg-card p-2 pb-4 hover:opacity-55">
        {posterImageSaved ? (
          <Image
            className={`h-auto w-full`}
            aria-label="Edit movie card"
            src={`https://${process.env.SUPABASE_HOSTNAME}/storage/v1/object/public/movie-posters/public/${poster}.png`}
            alt=""
            width={266}
            height={400}
          />
        ) : (
          <div className="flex-1"></div>
        )}
        <div className="flex flex-col">
          <span className="text-base-l font-semibold">{title}</span>
          <span className="text-base-s">{movieYear}</span>
        </div>
      </div>
    </Link>
  )
}
