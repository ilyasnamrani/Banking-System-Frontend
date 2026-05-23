import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(idUser:number) : Observable<any> {
    return this.http.get(`http://localhost:8081/users/${idUser}`);
  }

  getIdUser(keycloakId:string) : Observable<any> {
    return this.http.get(`http://localhost:8081/users/keycloak/${keycloakId}`);
  }
  getAllUsers() : Observable<any> {
    return this.http.get('http://localhost:8081/users/all');
  }

  deleteUser(idUser:number) : Observable<any> {
    return this.http.delete(`http://localhost:8081/users/delete/${idUser}`);
  }

  getUserByCin(cin:string) : Observable<any> {
    return this.http.get(`http://localhost:8081/users/cin/${cin}`);
  }

  updateUser(idUser:number, user:User) : Observable<any> {
    return this.http.put(`http://localhost:8081/users/update/${idUser}`, user);
  }

}
