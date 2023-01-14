import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDialogComponent } from './expenses-dialog.component';

describe('ExpensesDialogComponent', () => {
  let component: ExpensesDialogComponent;
  let fixture: ComponentFixture<ExpensesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
