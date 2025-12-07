import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiBase = environment.apiBaseUrl;
  private readonly endpoints = environment.endpoints;

  constructor(private HttpClient: HttpClient) { }

  private buildUrl(path: string): string {
    return `${this.apiBase}${path}`;
  }


  Download(filePath: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const params = { filePath }; // or: new HttpParams().set('filePath', filePath)

    return this.HttpClient.get(this.buildUrl(this.endpoints.files.download), {
      headers,
      params,
      responseType: 'blob' as 'json'
    });
  }


    // ---------------- Brokers ------------------------------

  GetAllBrokers(): Observable<any> {
    return this.HttpClient.post(this.buildUrl(this.endpoints.brokers.getAll), {});
  }

  GetBrokerById(id: any): Observable<any> {
    return this.HttpClient.post(this.buildUrl(this.endpoints.brokers.getById + id), {});
  }

  AddBroker(data: object): Observable<any> {
    return this.HttpClient.post(this.buildUrl(this.endpoints.brokers.create), data);
  }

  // not created in backend
  DeleteBroker(id: any): Observable<any> {
    return this.HttpClient.post(this.buildUrl(this.endpoints.brokers.delete + id), {});
  }

  EditBroker(data: object): Observable<any> {
    return this.HttpClient.post(this.buildUrl(this.endpoints.brokers.update), data);
  }

  // ---------------- Clients ------------------------------

GetAllClients(): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.clients.getAll), {});
}

GetClientById(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.clients.getById + id), {});
}

AddClient(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.clients.create), data);
}

// not created in backend
DeleteClient(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.clients.delete + id), {});
}

EditClient(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.clients.update), data);
}

// ---------------- Contractor ------------------------------

GetAllContractor(): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.contractors.getAll), {});
}

GetContractorById(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.contractors.getById + id), {});
}

AddContractor(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.contractors.create), data);
}

// not created in backend
DeleteContractor(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.contractors.delete + id), {});
}

EditContractor(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.contractors.update), data,{});
}

// ---------------- Employees ------------------------------

GetAllEmployees(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.employees.getAll), {});
}

GetEmployeeById(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employees.getById + id), {});
}

AddEmployee(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.employees.create), data);
}

DeleteEmployee(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employees.delete + id), {});
}

EditEmployee(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employees.update), data,{});
}


AddEmployeeTransaction(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employeeTransactions.create), data);
}
// {
//   "transactionDate": "string",
//   "description": "string",
//   "transactionType": "string",
//   "amount": 0,
//   "employeeId": 0
// }

EditEmployeeTransaction(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employeeTransactions.update), data,{});
}
// {
//   "transactionDate": "string",
//   "description": "string",
//   "transactionType": "string",
//   "amount": 0,
//   "employeeId": 0,
//   "id": 0
// }

DeleteEmployeeTransaction(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.employeeTransactions.delete + id), {});
}

GetAllEmployeeTransactions(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.employeeTransactions.getAll), {});
}

// ---------------- OperationalExpenses ------------------------------

GetAllOperationalExpenses(page:number,pageSize:number): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.getAll + page + '-' + pageSize), {});
}

GetAllInRangeOperationalExpenses(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.getRange), {});
}

GetOperationalExpenseById(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.getById + id), {});
}

AddOperationalExpense(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.create), data);
}

DeleteOperationalExpense(id: any): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.delete + id), {});
}

EditOperationalExpense(data: object): Observable<any> {
  return this.HttpClient.post(this.buildUrl(this.endpoints.operationalExpenses.update), data,{});
}

// ---------------- Partner ------------------------------

GetAllPartner(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.partners.getAll), {});
}

GetPartnerById(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.partners.getById + id), {});
}

AddPartner(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.partners.create), data);
}
// {
//   "name": "string",
//   "phone": "string",
//   "assignedTasks": "string",
//   "share": 0,
//   "partnersShareDTOs": [
//     {
//       "id": 0,
//       "name": "string",
//       "share": 0
//     }
//   ]
// }

// not created in backend
DeletePartner(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.partners.delete + id), {});
}

EditPartner(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.partners.update), data,{});
}
// {
//   "id": 0,
//   "name": "string",
//   "phone": "string",
//   "assignedTasks": "string",
//   "share": 0,
//   "partnersShareDTOs": [
//     {
//       "id": 0,
//       "name": "string",
//       "share": 0
//     }
//   ]
// }

// ---------------- PersonalLoan ------------------------------

GetAllPersonalLoan(page:number,pageSize:number): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.getAll + page + '-' + pageSize), {});
}

GetAllPersonalLoanInSpeceficDate(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.getOverdue), {});
}

GetPersonalLoanById(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.getById + id), {});
}

AddPersonalLoan(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.create), data);
}

DeletePersonalLoan(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.delete + id), {});
}

EditPersonalLoan(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.personalLoans.update), data,{});
}


// ---------------- Quotations ------------------------------

GetAllQuotations(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.quotations.getAll), {});
}

GetQuotationsById(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.quotations.getById + id), {});
}

AddQuotation(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.quotations.create), data);
}

DeleteQuotation(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.quotations.delete + id), {});
}

EditQuotation(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.quotations.update), data,{});

}
// ---------------- Projects ------------------------------

// not created in backend
GetAllProjects(): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.projects.getAll), {});
}

// not created in backend
GetProjectById(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.projects.getById + id), {});
}

AddProject(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.projects.create), data);
}

// not created in backend
DeleteProject(id: any): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.projects.delete + id), {});
}

// not created in backend
EditProject(data: object): Observable<any> {
return this.HttpClient.post(this.buildUrl(this.endpoints.projects.update), data,{});
}



}
