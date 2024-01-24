import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/../database.types'

export const createClient = () =>
  createBrowserClient<Database>(
    `https://${process.env.SUPABASE_HOSTNAME!}`,
    process.env.SUPABASE_ANON_KEY!,
  )
