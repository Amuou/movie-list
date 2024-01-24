import SignInForm from '@/app/components/SignInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default function SignIn() {
  return (
    <>
      <h1 className="mb-4">Sign In</h1>
      <SignInForm />
    </>
  )
}
