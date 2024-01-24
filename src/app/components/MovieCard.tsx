import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

interface MovieCardProps {
  id: string
  poster: string
  title: string
  year: string
}

export default function MovieCard({ id, poster, title, year }: MovieCardProps) {
  const movieYear = useMemo(() => new Date(year).getFullYear(), [year])
  return (
    <div className="col-span-1 flex flex-col rounded-xl bg-card p-2 pb-4 opacity-100 hover:opacity-55">
      <Link href={`/create?type=edit&movieId=${id}`}>
        <Image
          className="h-auto w-full"
          src={`https://${process.env.SUPABASE_HOSTNAME}/storage/v1/object/public/movie-posters/public/${poster}.png`}
          alt=""
          width={266}
          height={400}
        />
      </Link>
      <span className="text-base-l font-semibold">{title}</span>
      <span className="text-base-s">{movieYear}</span>
    </div>
  )
}
