import { createClient } from "@supabase/supabase-js";

const supabase = createClient("[HOST_NAME]", "[SERVICE_KEY]");

export default supabase;
