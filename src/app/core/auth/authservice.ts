import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private keycloak = inject(Keycloak);
  private http = inject(HttpClient);

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const userKeycloakId = this.getUserKeycloakId();
    if (userKeycloakId) {
      this.userService.getIdUser(userKeycloakId).subscribe(
        (response) => {
          localStorage.setItem('idUser', response);
          console.log('ID User:', response);
        },
        (error) => {
          console.error('Error fetching user ID:', error);
        }
      );
    }
  }



  login() {
    this.keycloak.login();
  }

  register(user: User) {
     return this.http.post('http://localhost:8081/users/create', user);
  }

  logout() {
    this.keycloak.logout();
  }

  isAuthenticated() {
    return !!this.keycloak.authenticated;
  }

  getToken() {
    return this.keycloak.token;
  }

  getUserKeycloakId(): string | undefined {
    const tokenParsed = this.keycloak.tokenParsed;
    return tokenParsed?.sub;
  }


}
