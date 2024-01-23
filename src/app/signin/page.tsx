import Button from '@/app/components/Button'
import FormInput from '@/app/components/FormInput'
import { userSignIn } from '@/app/lib/actions'

export default function SignIn() {
  return (
    <>
      <h1>Sign In</h1>
      <form
        action={userSignIn}
        className="flex w-[18.75rem] flex-col space-y-4"
      >
        <FormInput id="email" name="email" type="text" placeholder="Email" />
        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <div className="self-center">
          <input
            className="bg-input"
            id="remember-me"
            type="checkbox"
            name="Remember me"
          />
          <label className="ml-2 text-base-s" htmlFor="remember-me">
            Remember me
          </label>
        </div>
        <Button text="Login" />
      </form>
    </>
  )
}
