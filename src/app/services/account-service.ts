import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http : HttpClient){}

createAccount(accountData: any): Observable<any> {
    return this.http.post('http://localhost:8082/accounts/create', accountData);
  }

activateAccount(idAccount: any): Observable<any> {
  return this.http.post(`http://localhost:8082/accounts/activate/${idAccount}`, {});
}

deactivateAccount(idAccount: any): Observable<any> {
  return this.http.post(`http://localhost:8082/accounts/deactivate/${idAccount}`, {});
}

getAllUserAccounts(idUser: any) : Observable<any> {
  return this.http.get(`http://localhost:8082/accounts/user/${idUser}`);
}

getUserAccount(idAccount: any) : Observable<any> {
  return this.http.get(`http://localhost:8082/accounts/user/account/${idAccount}`);
}

createTransaction(transactionData: any): Observable<any> {
  return this.http.post('http://localhost:8082/transactions/create', transactionData);

}

fetchTransactions(idAccount: any) : Observable<any> {
  return this.http.get(`http://localhost:8082/transactions/account/${idAccount}`);
}

getRegistrationId(idAccount:any): Observable<any> {
  return this.http.get(`http://localhost:8082/accounts/registrationId/${idAccount}`);
}

}
