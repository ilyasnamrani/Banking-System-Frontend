import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { LandingPage } from './pages/landing-page/landing-page';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './core/auth/authguard-guard';
import { NotFound } from './pages/not-found/not-found';
import { UpdateUserAccount } from './components/update-user-account/update-user-account';
import { AccountForm } from './components/account-form/account-form';
import { UserBankAccounts } from './components/user-bank-accounts/user-bank-accounts';
import { Transactions } from './pages/transactions/transactions';

export const routes: Routes = [
   {path : 'register' , component : Register},
   {path : '', component: LandingPage},
   {path : 'userDashboard', component: UserDashboard, canActivate: [authGuard]},
   {path : 'adminDashboard', component: AdminDashboard, canActivate: [authGuard]},
   {path : 'create-bank-account', component: AccountForm, canActivate: [authGuard]},
   {path : 'update-user-account', component: UpdateUserAccount, canActivate: [authGuard]},
   {path: 'transactions/:idAccount',component: Transactions},
   {path : 'accounts', component: UserBankAccounts , canActivate: [authGuard]},
   {path : '**', component: NotFound}

];
