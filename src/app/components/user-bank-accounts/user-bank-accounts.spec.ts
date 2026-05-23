import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankAccounts } from './user-bank-accounts';

describe('UserBankAccounts', () => {
  let component: UserBankAccounts;
  let fixture: ComponentFixture<UserBankAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBankAccounts],
    }).compileComponents();

    fixture = TestBed.createComponent(UserBankAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
