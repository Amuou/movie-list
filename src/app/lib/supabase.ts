import { createClient } from '@supabase/supabase-js'
import { Database } from '@/../database.types'

export const supabase = createClient<Database>(
  `https://${process.env.SUPABASE_HOSTNAME}` || '',
  process.env.SUPABASE_ANON_KEY || '',
)
