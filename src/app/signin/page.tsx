import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";

export default function SignIn() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <h1>Sign In</h1>
      <form className="flex w-[18.75rem] flex-col space-y-4">
        <FormInput placeholder="Email" />
        <FormInput placeholder="Password" />
        <div className="self-center">
          <input className="bg-input" id="remember-me" type="checkbox" name="Remember me" />
          <label className="ml-2 text-base-s" htmlFor="remember-me">Remember me</label>
        </div>
        <Button text="Login" />
      </form>
    </section>
  )
}
