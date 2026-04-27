import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const test = async () => {
  console.log("URL:", process.env.SUPABASE_URL); 
  console.log("KEY:", process.env.SUPABASE_KEY ? "Loaded" : "Missing");

  const { data, error } = await supabase.auth.signUp({
    email: "quicktest@gmail.com",
    password: "password123",
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);
};

test();