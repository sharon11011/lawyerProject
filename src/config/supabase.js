import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xeezobherntcrymsbmbo.supabase.co'
const SUPABASE_KEY = 'sb_publishable_de2JhWLahdbCChjWhk_Cug_sVdDpkYp'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
