import { Component } from '@angular/core';
import { UserBankAccounts } from '../../components/user-bank-accounts/user-bank-accounts';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [UserBankAccounts, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css'],
  standalone: true,
})
export class UserDashboard {}
