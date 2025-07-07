
// Service to manage employee data and documents
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

// In-memory storage for demo purposes
let employees: Employee[] = [];
let documentSubmissions: DocumentSubmission[] = [];
let nextEmployeeId = 1;
let nextDocumentId = 1;

export const employeeService = {
  // Add new employee
  addEmployee: (employeeData: Omit<Employee, 'id' | 'progress' | 'addedAt'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: nextEmployeeId++,
      progress: 0,
      addedAt: new Date().toISOString()
    };
    employees.push(newEmployee);
    return newEmployee;
  },

  // Get all employees
  getEmployees: () => employees,

  // Get employee by ID
  getEmployeeById: (id: number) => employees.find(emp => emp.id === id),

  // Update employee progress
  updateEmployeeProgress: (id: number, progress: number) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      employee.progress = progress;
    }
  },

  // Add document submission
  addDocumentSubmission: (employeeId: number, documentType: string, fileName: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const submission: DocumentSubmission = {
        id: nextDocumentId++,
        employeeId,
        employeeName: employee.name,
        documentType,
        fileName,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      documentSubmissions.push(submission);
      return submission;
    }
    return null;
  },

  // Get pending document submissions
  getPendingDocuments: () => documentSubmissions.filter(doc => doc.status === 'pending'),

  // Verify document
  verifyDocument: (id: number) => {
    const document = documentSubmissions.find(doc => doc.id === id);
    if (document) {
      document.status = 'verified';
    }
  },

  // Generate completion report
  generateCompletionReport: () => {
    const completedEmployees = employees.filter(emp => emp.progress >= 100);
    const report = {
      generatedAt: new Date().toISOString(),
      totalEmployees: employees.length,
      completedOnboarding: completedEmployees.length,
      completionRate: employees.length > 0 ? (completedEmployees.length / employees.length * 100).toFixed(1) : 0,
      employees: completedEmployees.map(emp => ({
        name: emp.name,
        department: emp.department,
        startDate: emp.startDate,
        completedAt: new Date().toISOString()
      })),
      pendingEmployees: employees.filter(emp => emp.progress < 100).map(emp => ({
        name: emp.name,
        department: emp.department,
        progress: emp.progress
      }))
    };
    return report;
  }
};

// Add some sample document submissions for demo
setTimeout(() => {
  if (employees.length > 0) {
    employeeService.addDocumentSubmission(employees[0].id, 'Educational Certificate', 'degree.pdf');
    employeeService.addDocumentSubmission(employees[0].id, 'Previous Employment', 'experience_letter.pdf');
  }
}, 1000);
