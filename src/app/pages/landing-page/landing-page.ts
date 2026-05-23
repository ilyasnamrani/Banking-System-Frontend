import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/authservice';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.css'],
})
export class LandingPage {
  constructor(
    private authService: AuthService
  ){}

  login() {
    this.authService.login();
  }
}
