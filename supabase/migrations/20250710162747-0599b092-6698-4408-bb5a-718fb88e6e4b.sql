-- Drop the existing problematic RLS policy
DROP POLICY IF EXISTS "Admins can manage all employee accounts" ON public.employee_accounts;

-- Create a new RLS policy that uses JWT metadata instead of querying auth.users
CREATE POLICY "Admins can manage all employee accounts" 
ON public.employee_accounts 
FOR ALL 
TO authenticated
USING ((auth.jwt() ->> 'role'::text) = 'admin'::text)
WITH CHECK ((auth.jwt() ->> 'role'::text) = 'admin'::text);