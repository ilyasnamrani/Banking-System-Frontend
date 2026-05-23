import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account-service';
import { Router } from '@angular/router';
import { UserNavbar } from '../user-navbar/user-navbar';

@Component({
  selector: 'app-account-form',
  imports: [RouterLink, ReactiveFormsModule, UserNavbar],
  templateUrl: './account-form.html',
  styleUrls: ['./account-form.css'],
  standalone: true,
})
export class AccountForm {
  accountForm: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.formBuilder.group({
      accountType: ['', Validators.required],
      idUser: [localStorage.getItem('idUser'), Validators.required]
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.isSubmitting = true;
      this.accountService.createAccount(this.accountForm.value).subscribe({
        next: (response) => {
          console.log('Account created successfully', response);
          this.isSubmitting = false;
          this.router.navigate(['/accounts']);
        },
        error: (error) => {
          console.error('Error creating account', error);
          this.isSubmitting = false;
        }
      });
    } else {
      this.accountForm.markAllAsTouched();
    }
  }
}
