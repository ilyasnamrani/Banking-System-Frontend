import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserAccount } from './update-user-account';

describe('UpdateUserAccount', () => {
  let component: UpdateUserAccount;
  let fixture: ComponentFixture<UpdateUserAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
