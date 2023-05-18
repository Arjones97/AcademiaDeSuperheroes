import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { delay } from 'rxjs';
import { SuperHeroe } from 'src/app/dto/superHeroe';
import { SuperHeroesService } from 'src/app/servicios/superHeroesService';
import { ConfirmationDialogComponentComponent } from 'src/app/utils/confirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';

export interface DialogData extends SuperHeroe {
  editable: boolean;
}

@Component({
  selector: 'app-super-heroe-form-detail',
  templateUrl: './super-heroe-form-detail.component.html',
  styleUrls: ['./super-heroe-form-detail.component.css']
})
export class SuperHeroeFormDetailComponent {
  isLoading: boolean = false;
  nuevoSuperHeroe: any;
  superHeroeForm!: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SuperHeroeFormDetailComponent>,
   private dialog: MatDialog, private superHeroesService: SuperHeroesService) {
    // Inicialización de los datos de un nuevo superhéroe
    this.nuevoSuperHeroe = {
      nombreSuperheroe: '',
      nombre: '',
      edad: '',
      ciudadNacimiento: '',
      superPoder: '',
      empresa: '',
      foto: ''
    };
   }

  @Output() newHeroAdded = new EventEmitter<SuperHeroe>();

  ngOnInit() {
    // Si hay datos y un nuevo superhéroe, actualizamos los datos del nuevo superhéroe
    if (this.data && this.data.nuevoSuperHeroe) {
      this.nuevoSuperHeroe = this.data.nuevoSuperHeroe;
    }

    // Inicialización del formulario
    this.superHeroeForm = new FormGroup({
      'nombreSuperheroe': new FormControl(this.nuevoSuperHeroe.nombreSuperheroe, [Validators.required]),
      'nombre': new FormControl(this.nuevoSuperHeroe.nombre, [Validators.required]),
      'edad': new FormControl(this.nuevoSuperHeroe.edad),
      'ciudadNacimiento': new FormControl(this.nuevoSuperHeroe.ciudadNacimiento),
      'superPoder': new FormControl(this.nuevoSuperHeroe.superPoder, [Validators.required]),
      'empresa': new FormControl(this.nuevoSuperHeroe.empresa, [Validators.required]),
      'foto': new FormControl(this.nuevoSuperHeroe.foto),
    });
  }
  

  // Función que se encarga de la edición de un superhéroe
  aceptarEdicion() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      data: {
        editando: true,
        message: '¿Estás seguro de que quieres editar este superhéroe?',
        action: 'Sí'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;

        // Comprobamos la URL de la foto antes de hacer la solicitud de edición
        this.data.foto = this.data.foto || 'https://www.softzone.es/app/uploads/2018/04/guest.png';  // URL de la imagen por defecto

        this.superHeroesService.editSuperHeroe(this.data.id, this.data)
          .pipe(delay(2000)).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
          });
      }
    });
  }

  // Función que se encarga de añadir un nuevo superhéroe
  aceptarAnadir() {
    //Comprobación para asegurarse de que todos los campos del formulario cumplen con las reglas de validación
    if (this.superHeroeForm.valid) {
      const superHeroe = { ...this.superHeroeForm.value };
      superHeroe.foto = superHeroe.foto || 'https://www.softzone.es/app/uploads/2018/04/guest.png';  // URL de la imagen por defecto

      this.newHeroAdded.emit(superHeroe);
    }
  }
}
