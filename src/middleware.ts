import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session?.user.email?.endsWith('@gmail.com')) {
    return response
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/signin'
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|favicon.ico|signin).*)'],
}
