-- Fix RLS policies to use correct JWT path for role
DROP POLICY IF EXISTS "Admins can manage all employee accounts" ON public.employee_accounts;
CREATE POLICY "Admins can manage all employee accounts" 
ON public.employee_accounts 
FOR ALL 
TO authenticated
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Fix other related policies
DROP POLICY IF EXISTS "Admins can manage all document submissions" ON public.document_submissions;
CREATE POLICY "Admins can manage all document submissions" 
ON public.document_submissions 
FOR ALL 
TO authenticated
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can manage all training progress" ON public.training_progress;
CREATE POLICY "Admins can manage all training progress" 
ON public.training_progress 
FOR ALL 
TO authenticated
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

DROP POLICY IF EXISTS "Admins can view all employee profiles" ON public.employee_profiles;
CREATE POLICY "Admins can view all employee profiles" 
ON public.employee_profiles 
FOR SELECT 
TO authenticated
USING ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');