-- Refresh types file to sync with existing database schema
-- This migration triggers regeneration of src/integrations/supabase/types.ts

-- Add a comment to ensure the migration runs
COMMENT ON TABLE public.user_roles IS 'Stores user role assignments for access control';
COMMENT ON TABLE public.profiles IS 'Extended user profile information';
COMMENT ON TABLE public.orders IS 'Customer order records with items and shipping details';