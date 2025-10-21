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

DeleteContractor(id: any): Observable<any> {
return this.HttpClient.post(this.back + 'Contractor/delete/' + id, {});
}

EditContractor(data: object): Observable<any> {
return this.HttpClient.post(this.back + 'Contractor/edit', data,{});
}

}
