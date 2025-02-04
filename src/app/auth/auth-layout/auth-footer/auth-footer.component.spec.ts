import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFooterComponent } from './auth-footer.component';

describe('AuthFooterComponent', () => {
  let component: AuthFooterComponent;
  let fixture: ComponentFixture<AuthFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
