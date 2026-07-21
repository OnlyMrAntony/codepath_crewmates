import { createClient } from '@supabase/supabase-js'

const URL = 'https://fkirgmxjyrevvxakuzmd.supabase.co';
const API_KEY = 'sb_publishable_O67z-ycqF3w3Q35aQ46LNw_mhNbX9JP'

export const supabase = createClient(URL, API_KEY)