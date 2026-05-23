import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountService } from '../../services/account-service';
import { UserNavbar } from '../../components/user-navbar/user-navbar';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [UserNavbar, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css'],
  standalone: true,
})
export class Transactions {
  transactions: any[] = [];
  idAccount!: number;
  mainAccountRegistrationId = '';
  isLoading = true;
  
  // Cache to store loaded registration IDs and prevent infinite HTTP loops
  registrationIdCache: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.idAccount = Number(this.route.snapshot.paramMap.get('idAccount'));
    
    // Fetch main account details to display in the header
    this.accountService.getRegistrationId(this.idAccount).subscribe({
      next: (response) => {
        this.mainAccountRegistrationId = typeof response === 'object' && response ? response.registrationId || JSON.stringify(response) : response;
      },
      error: (err) => {
        console.error('Error fetching main account Registration ID:', err);
      }
    });

    // Fetch transactions
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.isLoading = true;
    this.accountService.fetchTransactions(this.idAccount).subscribe({
      next: (response) => {
        this.transactions = response || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        this.isLoading = false;
      }
    });
  }

  // Safe method to fetch and cache registration IDs in templates without loops
  getAccountRegistrationId(idAccount: number): string {
    if (!idAccount) return 'System / External';
    if (idAccount === this.idAccount && this.mainAccountRegistrationId) {
      return this.mainAccountRegistrationId;
    }
    if (this.registrationIdCache[idAccount]) {
      return this.registrationIdCache[idAccount];
    }

    // Cache a loading placeholder first to stop repeat requests during tick cycles
    this.registrationIdCache[idAccount] = 'Loading...';

    this.accountService.getRegistrationId(idAccount).subscribe({
      next: (response) => {
        const regId = typeof response === 'object' && response ? response.registrationId || JSON.stringify(response) : response;
        this.registrationIdCache[idAccount] = regId;
      },
      error: (err) => {
        console.error('Error fetching registration ID:', err);
        this.registrationIdCache[idAccount] = `ID: ${idAccount}`;
      }
    });

    return 'Loading...';
  }
}
