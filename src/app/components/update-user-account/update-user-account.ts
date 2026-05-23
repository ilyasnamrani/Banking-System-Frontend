import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { UserNavbar } from '../user-navbar/user-navbar';

@Component({
  selector: 'app-update-user-account',
  imports: [ReactiveFormsModule, RouterLink, UserNavbar],
  templateUrl: './update-user-account.html',
  styleUrls: ['./update-user-account.css'],
  standalone: true,
})
export class UpdateUserAccount {
  profileForm: FormGroup;
  idUser!: number;
  isLoading = true;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // keep keycloak password or allow resetting
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem('idUser'));
    if (!this.idUser) {
      this.errorMessage = 'User session not found. Please log in again.';
      this.isLoading = false;
      return;
    }
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.userService.getUser(this.idUser).subscribe({
      next: (user) => {
        if (user) {
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password || '********', // fallback placeholder
            phoneNumber: user.phoneNumber,
            cin: user.cin
          });
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.errorMessage = 'Could not load your profile information.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.userService.updateUser(this.idUser, this.profileForm.value).subscribe({
      next: (response) => {
        console.log('Profile updated successfully', response);
        this.successMessage = 'Your profile has been updated successfully!';
        this.isSubmitting = false;
        // Optionally redirect or refresh navbar after short timeout
        setTimeout(() => {
          this.successMessage = '';
        }, 4000);
      },
      error: (err) => {
        console.error('Error updating profile', err);
        this.errorMessage = 'An error occurred while saving your changes. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}
