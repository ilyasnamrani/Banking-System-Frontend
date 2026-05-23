import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { AuthService } from '../../core/auth/authservice';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  standalone: true
})
export class AdminDashboard {
  users: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching all users:', err);
        this.errorMessage = 'Failed to load system users list.';
        this.isLoading = false;
      }
    });
  }

  deleteUser(idUser: number): void {
    if (confirm('Are you absolutely sure you want to delete this user from the system? This action is irreversible.')) {
      this.userService.deleteUser(idUser).subscribe({
        next: (response) => {
          console.log('User deleted successfully:', response);
          this.loadAllUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
