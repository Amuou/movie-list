import UpsertMovieForm from '@/app/components/UpsertMovieForm'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create / Edit movie',
}

export default function CreateMoviePage() {
  return (
    <Suspense>
      <UpsertMovieForm />
    </Suspense>
  )
}
