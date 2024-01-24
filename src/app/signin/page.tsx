'use client'

import Button from '@/app/components/Button'
import FormInput from '@/app/components/FormInput'
import { SignInState, userSignIn } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import clsx from 'clsx'

function SubmitButton() {
  const { pending } = useFormStatus()
  const className = clsx({
    'opacity-40': pending,
  })

  return <Button disabled={pending} className={className} text="Login" />
}

export default function SignIn() {
  const initialState = { message: null, errors: {} }
  // @ts-ignore
  // Ignored because of types mismatch between react-dom and react, should be fixed in a future versions of their @types lib
  const [state, dispatch] = useFormState(userSignIn, initialState)

  return (
    <>
      <h1 className="mb-4">Sign In</h1>
      <form
        action={dispatch}
        className="relative flex w-full max-w-[20rem] flex-col space-y-6 sm:w-[18.75rem] sm:max-w-full"
      >
        <FormInput
          errors={state?.errors?.email}
          id="email"
          name="email"
          type="text"
          placeholder="Email"
        />
        <FormInput
          errors={state?.errors?.password}
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="self-center">
          <input
            className="rounded border-input bg-input"
            id="remember-me"
            type="checkbox"
            name="Remember me"
          />
          {/* 
              `Remember me` doesn't have any additional functionality 
              because in a free plan Supabase allow to customize expiration time
              only from their dashboard and not from the code side
          */}
          <label className="ml-2 text-base-s" htmlFor="remember-me">
            Remember me
          </label>
        </div>
        <SubmitButton />
        {state?.message && (
          <span className="absolute -bottom-8 left-16 text-base-s text-error">
            {state.message}
          </span>
        )}
      </form>
    </>
  )
}
