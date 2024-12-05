import { createClient as cc } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createClient = () =>
  cc<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
