import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignupComponent } from './auth-signup.component';

describe('AuthSignupComponent', () => {
  let component: AuthSignupComponent;
  let fixture: ComponentFixture<AuthSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
