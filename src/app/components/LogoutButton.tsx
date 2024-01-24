import { cookies } from 'next/headers'
import { createClient } from '@/app/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default function LogoutButton() {
  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/signin')
  }

  return (
    <form action={signOut}>
      <button className="flex items-center justify-center space-x-3 bg-transparent">
        <span>Logout</span>
        <Image src="/LogoutIcon.svg" alt="Logout icon" width={32} height={32} />
      </button>
    </form>
  )
}
