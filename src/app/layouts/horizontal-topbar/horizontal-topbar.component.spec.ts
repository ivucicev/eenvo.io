import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTopbarComponent } from './horizontal-topbar.component';

describe('HorizontalTopbarComponent', () => {
  let component: HorizontalTopbarComponent;
  let fixture: ComponentFixture<HorizontalTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalTopbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
