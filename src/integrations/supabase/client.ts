// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qfwmoxudlkiolbfxkayo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmd21veHVkbGtpb2xiZnhrYXlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzE0MDQsImV4cCI6MjA2NDg0NzQwNH0.QXUF7x5APhDNrDd9xNzPYb_J12ii3JiqJbQrcsiSUa0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);