import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../core/auth/authservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  imports: [RouterLink],
  templateUrl: './user-navbar.html',
  styleUrls: ['./user-navbar.css'],
  standalone: true,
})
export class UserNavbar {
   userInfos: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {

    const idUser =
      Number(localStorage.getItem('idUser'));

    this.userService.getUser(idUser)
      .subscribe({
        next: (response) => {
          this.userInfos = response;
        },
        error: (error) => {
          console.error(
            'Error fetching user info:',
            error
          );
        }
      });

  }

  logout() {
    this.authService.logout();
  }

}
