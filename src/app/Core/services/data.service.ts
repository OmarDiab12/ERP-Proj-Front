import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpContext } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  back: string = "https://newerp.runasp.net/api/"
  constructor(private HttpClient: HttpClient) { }


  Download(filePath: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const params = { filePath }; // or: new HttpParams().set('filePath', filePath)

    return this.HttpClient.get(this.back + 'Material/download', {
      headers,
      params,
      responseType: 'blob' as 'json'
    });
  }


    // ---------------- Brokers ------------------------------

  GetAllBrokers(): Observable<any> {
    return this.HttpClient.post(this.back + 'Broker/get-all', {});
  }

  GetBrokerById(id: any): Observable<any> {
    return this.HttpClient.post(this.back + 'Broker/get-b-id/' + id, {});
  }

  AddBroker(data: object): Observable<any> {
    return this.HttpClient.post(this.back + 'Broker/create', data);
  }

  // not created in backend
  DeleteBroker(id: any): Observable<any> {
    return this.HttpClient.post(this.back + 'Broker/delete/' + id, {});
  }

  EditBroker(data: object): Observable<any> {
    return this.HttpClient.post(this.back + 'Broker/edit', data);
  }

  // ---------------- Clients ------------------------------

GetAllClients(): Observable<any> {
  return this.HttpClient.post(this.back + 'Clients/get-all', {});
}

GetClientById(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'Clients/get-y-id-' + id, {});
}

AddClient(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Clients/create', data);
}

// not created in backend
DeleteClient(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'Client/delete/' + id, {});
}

EditClient(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Clients/edit', data);
}

// ---------------- Contractor ------------------------------

GetAllContractor(): Observable<any> {
  return this.HttpClient.post(this.back + 'Contractor/get-all', {});
}

GetContractorById(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'Contractor/get-b-id/' + id, {});
}

AddContractor(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Contractor/create', data);
}

// not created in backend
DeleteContractor(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Contractor/delete/' + id, {});
}

EditContractor(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Contractor/edit', data,{});
}

// ---------------- Employees ------------------------------

GetAllEmployees(): Observable<any> {
return this.HttpClient.post(this.back + 'Employees/get-all', {});
}

GetEmployeeById(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'Employees/get-' + id, {});
}

AddEmployee(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Employees/create', data);
}

DeleteEmployee(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'Employees/delete-' + id, {});
}

EditEmployee(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Employees/edit', data,{});
}


AddEmployeeTransaction(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Employees/transactions/add', data);
}
// {
//   "transactionDate": "string",
//   "description": "string",
//   "transactionType": "string",
//   "amount": 0,
//   "employeeId": 0
// }

EditEmployeeTransaction(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'Employees/transactions/edit', data,{});
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
  return this.HttpClient.post(this.back + 'Employees/transactions/delete-' + id, {});
}

GetAllEmployeeTransactions(): Observable<any> {
return this.HttpClient.post(this.back + 'Employees/transactions/get-1-1-1', {});
}

// ---------------- OperationalExpenses ------------------------------

GetAllOperationalExpenses(page:number,pageSize:number): Observable<any> {
return this.HttpClient.post(this.back + 'OperationalExpenses/get-all-'+page+'-'+pageSize, {});
}

GetAllInRangeOperationalExpenses(): Observable<any> {
return this.HttpClient.post(this.back + 'OperationalExpenses/get-range-1-1?category=1', {});
}

GetOperationalExpenseById(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'OperationalExpenses/get-' + id, {});
}

AddOperationalExpense(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'OperationalExpenses/create', data);
}

DeleteOperationalExpense(id: any): Observable<any> {
  return this.HttpClient.post(this.back + 'OperationalExpenses/delete-'+ id, {});
}

EditOperationalExpense(data: object): Observable<any> {
  return this.HttpClient.post(this.back + 'OperationalExpenses/edit', data,{});
}

// ---------------- Partner ------------------------------

GetAllPartner(): Observable<any> {
return this.HttpClient.post(this.back + 'Partner/get-all', {});
}

GetPartnerById(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Partner/get-b-id/' + id, {});
}

AddPartner(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Partner/create', data);
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
return this.HttpClient.post(this.back + 'Partner/delete/' + id, {});
}

EditPartner(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Partner/edit', data,{});
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
return this.HttpClient.post(this.back + 'PersonalLoan/get-all-'+page+'-'+pageSize, {});
}

GetAllPersonalLoanInSpeceficDate(): Observable<any> {
return this.HttpClient.post(this.back + 'PersonalLoan/get-overdue-1', {});
}

GetPersonalLoanById(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'PersonalLoan/get-' + id, {});
}

AddPersonalLoan(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'PersonalLoan/create', data);
}

DeletePersonalLoan(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'PersonalLoan/delete-' + id, {});
}

EditPersonalLoan(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'PersonalLoan/edit', data,{});
}


// ---------------- Quotations ------------------------------

GetAllQuotations(): Observable<any> {
return this.HttpClient.post(this.back + 'Quotations/get-all', {});
}

GetQuotationsById(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Quotations/get-' + id, {});
}

AddQuotation(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Quotations/create', data);
}

DeleteQuotation(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Quotations/delete-' + id, {});
}

EditQuotation(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Quotations/edit', data,{});

}
// ---------------- Projects ------------------------------

// not created in backend
GetAllProjects(): Observable<any> {
return this.HttpClient.post(this.back + 'Project/get-all', {});
}

// not created in backend
GetProjectById(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Project/get-by-id-' + id, {});
}

AddProject(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Project/create-full', data);
}

// not created in backend
DeleteProject(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Projects/delete-' + id, {});
}

// not created in backend
EditProject(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Project/update-full', data,{});
}



}
