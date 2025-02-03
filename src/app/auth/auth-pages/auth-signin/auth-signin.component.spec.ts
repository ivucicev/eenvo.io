import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSigninComponent } from './auth-signin.component';

describe('AuthSigninComponent', () => {
  let component: AuthSigninComponent;
  let fixture: ComponentFixture<AuthSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
