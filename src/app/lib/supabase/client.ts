import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    `https://${process.env.SUPABASE_HOSTNAME!}`,
    process.env.SUPABASE_ANON_KEY!,
  )
