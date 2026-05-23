import { Component } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { RouterLink } from '@angular/router';
import { UserNavbar } from '../user-navbar/user-navbar';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-user-bank-accounts',
  imports: [RouterLink, UserNavbar, CurrencyPipe],
  templateUrl: './user-bank-accounts.html',
  styleUrls: ['./user-bank-accounts.css'],
  standalone: true,
})
export class UserBankAccounts {
  accounts: any[] = [];
  isLoading = true;

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAllUserAccounts();
  }

  getAllUserAccounts(): void {
    this.isLoading = true;
    const idUser = Number(localStorage.getItem('idUser'));
    this.accountService.getAllUserAccounts(idUser)
      .subscribe({
        next: (response) => {
          this.accounts = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching user accounts:', error);
          this.isLoading = false;
        }
      });
  }

  deactivateAccount(idAccount: any): void {
    this.accountService.deactivateAccount(idAccount)
      .subscribe({
        next: (response) => {
          console.log('Account deactivated successfully:', response);
          this.getAllUserAccounts();
        },
        error: (error) => {
          console.error('Error deactivating account:', error);
        }
      });
  }

  activateAccount(idAccount: any): void {
    this.accountService.activateAccount(idAccount)
      .subscribe({
        next: (response) => {
          console.log('Account activated successfully:', response);
          this.getAllUserAccounts();
        },
        error: (error) => {
          console.error('Error activating account:', error);
        }
      });
  }
}
