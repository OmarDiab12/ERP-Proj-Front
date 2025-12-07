export const environment = {
  production: false,
  apiBaseUrl: 'https://newerp.runasp.net/api/',
  assetBaseUrl: 'https://newerp.runasp.net/',
  endpoints: {
    auth: {
      login: 'User/login',
      registerStudent: 'User/register-student'
    },
    files: {
      download: 'Material/download'
    },
    brokers: {
      getAll: 'Broker/get-all',
      getById: 'Broker/get-b-id/',
      create: 'Broker/create',
      delete: 'Broker/delete/',
      update: 'Broker/edit'
    },
    clients: {
      getAll: 'Clients/get-all',
      getById: 'Clients/get-y-id-',
      create: 'Clients/create',
      delete: 'Client/delete/',
      update: 'Clients/edit'
    },
    contractors: {
      getAll: 'Contractor/get-all',
      getById: 'Contractor/get-b-id/',
      create: 'Contractor/create',
      delete: 'Contractor/delete/',
      update: 'Contractor/edit'
    },
    employees: {
      getAll: 'Employees/get-all',
      getById: 'Employees/get-',
      create: 'Employees/create',
      delete: 'Employees/delete-',
      update: 'Employees/edit'
    },
    employeeTransactions: {
      create: 'Employees/transactions/add',
      update: 'Employees/transactions/edit',
      delete: 'Employees/transactions/delete-',
      getAll: 'Employees/transactions/get-1-1-1'
    },
    operationalExpenses: {
      getAll: 'OperationalExpenses/get-all-',
      getRange: 'OperationalExpenses/get-range-1-1?category=1',
      getById: 'OperationalExpenses/get-',
      create: 'OperationalExpenses/create',
      delete: 'OperationalExpenses/delete-',
      update: 'OperationalExpenses/edit'
    },
    partners: {
      getAll: 'Partner/get-all',
      getById: 'Partner/get-b-id/',
      create: 'Partner/create',
      delete: 'Partner/delete/',
      update: 'Partner/edit'
    },
    personalLoans: {
      getAll: 'PersonalLoan/get-all-',
      getOverdue: 'PersonalLoan/get-overdue-1',
      getById: 'PersonalLoan/get-',
      create: 'PersonalLoan/create',
      delete: 'PersonalLoan/delete-',
      update: 'PersonalLoan/edit'
    },
    quotations: {
      getAll: 'Quotations/get-all',
      getById: 'Quotations/get-',
      create: 'Quotations/create',
      delete: 'Quotations/delete-',
      update: 'Quotations/edit'
    },
    projects: {
      getAll: 'Project/get-all',
      getById: 'Project/get-by-id-',
      create: 'Project/create-full',
      delete: 'Projects/delete-',
      update: 'Project/update-full'
    }
  }
};
