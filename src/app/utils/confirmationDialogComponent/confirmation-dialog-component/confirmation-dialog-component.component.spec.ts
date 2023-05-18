import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component.component';
import { MatButtonModule } from '@angular/material/button';

describe('ConfirmationDialogComponentComponent', () => {
  let component: ConfirmationDialogComponentComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponentComponent>;

  // Mocks para MatDialogRef y MAT_DIALOG_DATA
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockDialogData = {
    editando: false,
    message: 'Test Message',
    action: 'Test Action'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [ ConfirmationDialogComponentComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    });

    fixture = TestBed.createComponent(ConfirmationDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se ha creado con exito el componente: ConfirmationDialogComponentComponent', () => {
    expect(component).toBeTruthy();
  });
});
