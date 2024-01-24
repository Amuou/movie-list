'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/app/lib/supabase/server'

export type State = {
  errors?: {
    title?: string[]
    year?: string[]
    posterUrl?: string[]
  }
  message?: string | null
}

export async function createMovie(prevState: State, formData: FormData) {
  const cookieStore = cookies()
  const rawFormData = {
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    poster: formData.get('poster') as File,
  }

  if (!rawFormData.title || !rawFormData.year || !rawFormData.poster) {
    return
  }
  const { error, data } = await createClient(cookieStore)
    .from('Movie')
    .insert({
      title: rawFormData.title,
      year: +rawFormData.year,
    })
    .select()
  const posterId = data?.[0].poster_id
  if (!posterId) return
  const result = await createClient(cookieStore)
    .storage.from('movie-posters')
    .upload(`public/${posterId}.png`, rawFormData.poster)

  revalidatePath('/')
  redirect('/')
}

export async function userSignIn(formData: FormData) {
  const cookieStore = cookies()
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validation

  const { data, error } = await createClient(
    cookieStore,
  ).auth.signInWithPassword({
    email: rawFormData.email,
    password: rawFormData.password,
  })

  if (data.user) {
    revalidatePath('/')
    redirect('/')
  }
}
