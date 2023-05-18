import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Esta interfaz define los datos que se pueden pasar al diálogo de confirmación.
export interface ConfirmationDialogData {
  editando: boolean;
  message: string;
  action: string;
}

@Component({
  selector: 'app-confirmation-dialog-component',
  templateUrl: './confirmation-dialog-component.component.html',
  styleUrls: ['./confirmation-dialog-component.component.css']
})

export class ConfirmationDialogComponentComponent {

  constructor(
    // MatDialogRef proporciona una referencia al diálogo abierto.
    public dialogRef: MatDialogRef<ConfirmationDialogComponentComponent>, 

    // MAT_DIALOG_DATA es un token de inyección que permite acceder a los datos del diálogo.
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  // Este método se llama cuando se hace clic en el botón "No".
  // Cierra el diálogo y devuelve false.
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  // Este método se llama cuando se hace clic en el botón "Sí".
  // Cierra el diálogo y devuelve true.
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
