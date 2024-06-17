import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://chpjbgfwdsndnggcbtxd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNocGpiZ2Z3ZHNuZG5nZ2NidHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MzUxNzgsImV4cCI6MjAzNDAxMTE3OH0._I67uX37v_FN4HzsftfVNr0X-HiPwedHe9vcSYw55tM"
);

//process.env.REACT_APP_SUPABASE_URL
//process.env.REACT_APP_SUPABASE_ANON_KEY

export default supabase;