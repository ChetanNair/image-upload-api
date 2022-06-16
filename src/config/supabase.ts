import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.supabase_url!,
  process.env.supabase_key!
);

export default supabase;
