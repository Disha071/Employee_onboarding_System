// This file is now deprecated - using Supabase for data management
// Keeping for reference but all functionality moved to Supabase

export interface Employee {
  id: number;
  name: string;
  department: string;
  startDate: string;
  progress: number;
  email: string;
  phone: string;
  position: string;
  manager: string;
  workLocation: string;
  addedAt: string;
}

export interface DocumentSubmission {
  id: number;
  employeeId: number;
  employeeName: string;
  documentType: string;
  fileName: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

// Deprecated - now using Supabase
export const employeeService = {
  addEmployee: () => console.warn('Deprecated: Use Supabase instead'),
  getEmployees: () => [],
  getEmployeeById: () => null,
  updateEmployeeProgress: () => {},
  addDocumentSubmission: () => null,
  getPendingDocuments: () => [],
  verifyDocument: () => {},
  generateCompletionReport: () => ({})
};
