import UpsertMovieForm from '@/app/components/UpsertMovieForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create / Edit movie',
}

export default function CreateMoviePage() {
  return <UpsertMovieForm />
}
