import Image from 'next/image'

interface MovieCardProps {
  poster: string
  title: string
  year: number
}

export default function MovieCard({ poster, title, year }: MovieCardProps) {
  return (
    <div className="col-span-1 flex flex-col rounded-xl bg-card p-2 pb-4 opacity-100 hover:opacity-55">
      <Image
        className="h-auto w-full"
        src={`https://${process.env.SUPABASE_HOSTNAME}/storage/v1/object/public/movie-posters/public/${poster}.png`}
        alt=""
        width={266}
        height={400}
      />
      <span className="text-base-l">{title}</span>
      <span className="text-base-s">{year}</span>
    </div>
  )
}
