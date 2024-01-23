'use client'

import FormInput from '@/app/components/FormInput'
import Button from '@/app/components/Button'
import Link from 'next/link'
import ImageUpload from '@/app/components/ImageUpload'
import { createMovie } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { useState } from 'react'

export default function CreateMoviePage() {
  const [poster, setPoster] = useState<File | null>(null)
  // @ts-ignore
  const [state, dispatch] = useFormState(createMovie, {
    message: null,
    errors: {},
  })

  return (
    <form action={dispatch} className="flex w-full max-w-4xl flex-col">
      <h2>Create a new movie</h2>
      <div className="mt-[7.5rem] flex flex-row items-center justify-center space-x-32">
        <ImageUpload poster={poster} setPoster={setPoster} />
        <div className="h-[500px] w-1/2">
          <FormInput
            id="title"
            name="title"
            type="text"
            className="w-full"
            placeholder="Title"
          />
          <FormInput
            id="year"
            name="year"
            type="number"
            className="mt-4 w-7/12"
            placeholder="Publishing year"
          />
          <div className="mt-16 flex space-x-4">
            <Link className="w-1/2" passHref href="/">
              <Button
                text="Cancel"
                className="w-full border-[1px] border-solid border-white bg-transparent"
              ></Button>
            </Link>
            <Button className="w-1/2" text="Submit" />
          </div>
        </div>
      </div>
    </form>
  )
}
