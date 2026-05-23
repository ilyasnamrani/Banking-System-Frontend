import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http:HttpClient) { }


 register(user: any): Observable<any> {
   return this.http.post('http://localhost:8081/users/create', user);
 }

 login(credentials: any): Observable<any> {

     const body = new URLSearchParams();

     body.set('grant_type', 'password');
     body.set('client_id', 'banking-system-client');
     body.set('username', credentials.email);
     body.set('password', credentials.password);

   return this.http.post(
     'http://localhost:8085/realms/banking-system-realm/protocol/openid-connect/token',
     body.toString(),
      {
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
       }
     }
   );
}
}
