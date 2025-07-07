
-- Create table to store employee accounts (only admin can create these)
CREATE TABLE public.employee_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  start_date DATE NOT NULL,
  manager TEXT,
  work_location TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Create table to store document submissions
CREATE TABLE public.document_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_email TEXT NOT NULL REFERENCES public.employee_accounts(email) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id)
);

-- Create table to store training progress
CREATE TABLE public.training_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_email TEXT NOT NULL REFERENCES public.employee_accounts(email) ON DELETE CASCADE,
  module_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(employee_email, module_name)
);

-- Create table to store employee profile data
CREATE TABLE public.employee_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_email TEXT NOT NULL REFERENCES public.employee_accounts(email) ON DELETE CASCADE UNIQUE,
  profile_picture_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.employee_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employee_accounts
CREATE POLICY "Admins can manage all employee accounts" 
  ON public.employee_accounts 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Employees can view their own account" 
  ON public.employee_accounts 
  FOR SELECT 
  USING (email = auth.jwt()->>'email');

-- RLS Policies for document_submissions
CREATE POLICY "Admins can manage all document submissions" 
  ON public.document_submissions 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Employees can manage their own document submissions" 
  ON public.document_submissions 
  FOR ALL 
  USING (employee_email = auth.jwt()->>'email');

-- RLS Policies for training_progress
CREATE POLICY "Admins can manage all training progress" 
  ON public.training_progress 
  FOR ALL 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Employees can manage their own training progress" 
  ON public.training_progress 
  FOR ALL 
  USING (employee_email = auth.jwt()->>'email');

-- RLS Policies for employee_profiles
CREATE POLICY "Admins can view all employee profiles" 
  ON public.employee_profiles 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ));

CREATE POLICY "Employees can manage their own profile" 
  ON public.employee_profiles 
  FOR ALL 
  USING (employee_email = auth.jwt()->>'email');
