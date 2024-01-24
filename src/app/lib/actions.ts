'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/app/lib/supabase/server'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export type CreateMovieState = {
  errors?: {
    title?: string[]
    year?: string[]
    posterUrl?: string[]
  }
  message?: string | null
}

export type SignInState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

const SignInFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter an email.',
    })
    .email(),
  password: z
    .string({
      required_error: 'Please enter a password',
    })
    .min(4, { message: 'Password must contain at least 4 characters' }),
})

const CreateMovieFormSchema = z.object({
  title: z.string({
    required_error: 'Please enter a movie title.',
  }),
  year: z.coerce
    .number({
      required_error: 'Please enter a movie year',
    })
    .min(1888, { message: 'There were no movies before 1888 year :)' })
    .max(2900, { message: 'Please provide year less than 3000' }),
  poster: z.any().optional(),
})

export async function upsertMovie(
  movieId: string | null,
  prevState: CreateMovieState,
  formData: FormData,
) {
  const cookieStore = cookies()
  const validatedFields = CreateMovieFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    }
  }
  const validationResult = validatedFields.data
  const supabaseClient = createClient(cookieStore)
  // Create
  if (!movieId) {
    const { error, data } = await createClient(cookieStore)
      .from('Movie')
      .insert({
        title: validationResult.title,
        year: new Date(+validationResult.year, 1, 1).toISOString(),
      })
      .select()
    const posterId = data?.[0].poster_id

    if (!posterId) return

    await supabaseClient.storage
      .from('movie-posters')
      .upload(`public/${posterId}.png`, validationResult.poster)
  } else {
    // Edit
    const newPosterId = randomUUID()
    const { data } = await supabaseClient
      .from('Movie')
      .select('poster_id')
      .eq('id', movieId)
      .maybeSingle()
    const { error } = await supabaseClient
      .from('Movie')
      .update({
        title: validationResult.title,
        year: new Date(validationResult.year, 1, 1).toISOString(),
        poster_id: newPosterId,
      })
      .eq('id', movieId)

    if (error || !data?.poster_id) return

    await supabaseClient.storage
      .from('movie-posters')
      .remove([`public/${data.poster_id}.png`])
    await supabaseClient.storage
      .from('movie-posters')
      .upload(`public/${newPosterId}.png`, validationResult.poster)
  }

  revalidatePath('/')
  redirect('/')
}

export async function userSignIn(prevState: SignInState, formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    }
  }

  const cookieStore = cookies()
  const validationResult = validatedFields.data
  const { data, error } = await createClient(
    cookieStore,
  ).auth.signInWithPassword({
    email: validationResult.email,
    password: validationResult.password,
  })

  if (data.user) {
    revalidatePath('/')
    redirect('/')
  }

  if (error) {
    return {
      message: error.message,
    }
  }
}
