'use server'

import { v4 as uuidv4 } from 'uuid'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'

export type State = {
  errors?: {
    title?: string[]
    year?: string[]
    posterUrl?: string[]
  }
  message?: string | null
}

export async function createMovie(prevState: State, formData: FormData) {
  const rawFormData = {
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    poster: formData.get('poster') as File,
  }

  if (!rawFormData.title || !rawFormData.year || !rawFormData.poster) {
    return
  }

  const { error, data } = await supabase
    .from('Movie')
    .insert({
      title: rawFormData.title,
      year: +rawFormData.year,
    })
    .select()

  const posterId = data?.[0].posterId
  if (!posterId) return
  const result = await supabase.storage
    .from('movie-posters')
    .upload(`public/${posterId}.png`, rawFormData.poster)

  revalidatePath('/')
  redirect('/')
}

export async function userSignIn(formData: FormData) {
  const rawFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  console.warn(123, rawFormData)

  // const { isSignedIn, nextStep } = await signIn({ username: rawFormData.email, password: rawFormData.password })
  // if (isSignedIn) {
  //   revalidatePath("/");
  //   redirect("/");
  // }
}
