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
    .max(3000, { message: 'Please provide year less than 3000' }),
  poster: z.any().optional(),
})

const redirectToMainPage = () => {
  revalidatePath('/')
  redirect('/')
}

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

  const updatePosterImageSet = (id: string) =>
    supabaseClient
      .from('Movie')
      .update({ poster_image_saved: true })
      .eq('id', id)

  const posterFile = validationResult.poster as File
  const uploadPoster = (posterId: string) =>
    supabaseClient.storage
      .from('movie-posters')
      .upload(`public/${posterId}.png`, posterFile)

  // Create
  if (!movieId) {
    const { error, data } = await supabaseClient
      .from('Movie')
      .insert({
        title: validationResult.title,
        year: new Date(+validationResult.year, 1, 1).toISOString(),
      })
      .select()
      .maybeSingle()
    const posterId = data?.poster_id
    console.warn(1)
    if (!posterId || posterFile.size === 0) {
      redirectToMainPage()
      return
    }
    console.warn(12)

    await uploadPoster(posterId)
    await updatePosterImageSet(data?.id)
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

    if (posterFile.size === 0) {
      redirectToMainPage()
      return
    }

    await uploadPoster(newPosterId)
    await updatePosterImageSet(movieId)
  }

  redirectToMainPage()
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
    redirectToMainPage()
  }

  if (error) {
    return {
      message: error.message,
    }
  }
}
