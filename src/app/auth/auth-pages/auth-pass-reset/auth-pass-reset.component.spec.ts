import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPassResetComponent } from './auth-pass-reset.component';

describe('AuthPassResetComponent', () => {
  let component: AuthPassResetComponent;
  let fixture: ComponentFixture<AuthPassResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPassResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPassResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
