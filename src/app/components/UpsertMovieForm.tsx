'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { upsertMovie } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import ImageUpload from '@/app/components/ImageUpload'
import FormInput from '@/app/components/FormInput'
import clsx from 'clsx'
import Link from 'next/link'
import Button from '@/app/components/Button'

const pageText = {
  edit: {
    header: 'Edit',
    imageDrop: 'Drop other image here',
    submitButton: 'Update',
  },
  create: {
    header: 'Create a new movie',
    imageDrop: 'Drop an image here',
    submitButton: 'Submit',
  },
}

type PageType = 'edit' | 'create'

function FormButtons({ pageType }: { pageType: PageType }) {
  const { pending } = useFormStatus()
  const className = clsx({
    'opacity-40': pending,
  })

  return (
    <div className="mt-16 flex space-x-4">
      <Link className="w-1/2" passHref href="/">
        <Button
          disabled={pending}
          text="Cancel"
          className={`${className} w-full border-[1px] border-solid border-white bg-transparent hover:bg-input/55`}
        ></Button>
      </Link>
      <Button
        disabled={pending}
        className={`${className} w-1/2 hover:bg-primary/55`}
        text={pageText[pageType].submitButton}
      />
    </div>
  )
}

export default function UpsertMovieForm() {
  const searchParams = useSearchParams()
  const pageType = (searchParams.get('type') || 'create') as PageType
  const movieId = searchParams.get('movieId')
  const [poster, setPoster] = useState<File | null>(null)
  const updateUserWithId = upsertMovie.bind(null, movieId)
  // @ts-ignore
  // Ignored because of types mismatch between react-dom and react, should be fixed in a future versions of their @types lib
  const [state, dispatch] = useFormState(updateUserWithId, {
    message: null,
    errors: {},
  })

  return (
    <form action={dispatch} className="flex w-full max-w-4xl flex-col">
      <h2>{pageText[pageType].header}</h2>
      <div className="flex flex-row items-center justify-center space-x-30 lg:mt-30">
        <ImageUpload
          text={pageText[pageType].imageDrop}
          poster={poster}
          setPoster={setPoster}
        />
        <div className="relative w-1/2 space-y-8 self-start">
          <FormInput
            id="title"
            name="title"
            type="text"
            className="w-full"
            placeholder="Title"
            errors={state?.errors?.title}
          />
          <FormInput
            id="year"
            name="year"
            type="number"
            className="mt-4 w-7/12"
            placeholder="Publishing year"
            errors={state?.errors?.year}
          />
          <FormButtons pageType={pageType} />
        </div>
      </div>
    </form>
  )
}
