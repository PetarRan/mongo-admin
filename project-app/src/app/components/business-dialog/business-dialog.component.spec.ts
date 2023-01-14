import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDialogComponent } from './business-dialog.component';

describe('BusinessDialogComponent', () => {
  let component: BusinessDialogComponent;
  let fixture: ComponentFixture<BusinessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
