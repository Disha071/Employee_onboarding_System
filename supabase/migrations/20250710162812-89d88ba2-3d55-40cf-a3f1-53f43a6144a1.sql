-- Fix RLS policies for document_submissions table
DROP POLICY IF EXISTS "Admins can manage all document submissions" ON public.document_submissions;
CREATE POLICY "Admins can manage all document submissions" 
ON public.document_submissions 
FOR ALL 
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Fix RLS policies for training_progress table  
DROP POLICY IF EXISTS "Admins can manage all training progress" ON public.training_progress;
CREATE POLICY "Admins can manage all training progress" 
ON public.training_progress 
FOR ALL 
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);

-- Fix RLS policies for employee_profiles table
DROP POLICY IF EXISTS "Admins can view all employee profiles" ON public.employee_profiles;
CREATE POLICY "Admins can view all employee profiles" 
ON public.employee_profiles 
FOR SELECT 
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text);