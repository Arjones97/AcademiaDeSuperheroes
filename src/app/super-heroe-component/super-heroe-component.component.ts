import { Component, ViewChild } from '@angular/core';
import { SuperHeroesService } from '../servicios/superHeroesService';
import { SuperHeroe } from '../dto/superHeroe';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, delay, switchMap, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuperHeroeFormDetailComponent } from './super-heroe-form-detail-component/super-heroe-form-detail/super-heroe-form-detail.component';
import { ConfirmationDialogComponentComponent } from '../utils/confirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';

@Component({
  selector: 'app-super-heroe-component',
  templateUrl: './super-heroe-component.component.html',
  styleUrls: ['./super-heroe-component.component.css']
})
export class SuperHeroeComponentComponent {
  displayedColumns: string[] = ['foto', 'superheroe', 'nombre', 'superPoder' ,'empresa', 'acciones'];
  dataSource = new MatTableDataSource<SuperHeroe>([]);
  control = new FormControl();
  opcionesFiltradas!: Observable<SuperHeroe[]>;
  superHeroes: SuperHeroe[] = [];
  isLoading: boolean = false;
  dialogRef!: MatDialogRef<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private superHeroesService: SuperHeroesService, private dialog: MatDialog) { }

  ngOnInit() {
    // Actualizar los superhéroes cuando se actualizan
    this.superHeroesService.superHeroesUpdated
      .pipe(tap((superHeroes: SuperHeroe[]) => {
        this.superHeroes = superHeroes;
        this.dataSource.data = this.superHeroes;
      }))
      .subscribe();
    // Obtener superhéroes al iniciar el componente
    this.superHeroesService.getSuperHeroes()
      .pipe(tap((superHeroes: SuperHeroe[]) => {
        this.superHeroes = superHeroes;
        this.dataSource = new MatTableDataSource<SuperHeroe>(this.superHeroes);
      }))
      .subscribe();
    // Filtrar los superhéroes basándonos en el valor del control de formulario
    this.control.valueChanges
      .pipe(tap(value => {
        this.dataSource.data = this.filtro(value);
      }))
      .subscribe();
    this.opcionesFiltradas = this.control.valueChanges
      .pipe(
        startWith(''),
        switchMap(value => this.superHeroesService.getFilteredSuperHeroes(value))
      );
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Asignar el paginador después de la inicialización del componente
  }

  ngOnDestroy() {
    // Desuscribirse al observable cuando el componente se destruye
    if (this.dialogRef) {
      this.dialogRef.componentInstance.newHeroAdded.unsubscribe();
    }
  }
  
  private filtro(value: string): SuperHeroe[] {
    const filtroValor = value.toLowerCase();
  
    // Filtramos los superhéroes basándonos en el valor del control de formulario.
    return this.superHeroes.filter(superHeroe => 
      superHeroe.nombreSuperheroe.toLowerCase().includes(filtroValor)
    );
  }

  verDetalle(heroe: SuperHeroe) {
    // Abrir el detalle del superhéroe en un diálogo
    this.dialog.open(SuperHeroeFormDetailComponent, {
      data: {
        ...heroe,
        editable: false
      }
    });
  }

  anadirSuperHeroe() {
    // Abrir el formulario de superhéroe en un diálogo y añadir un nuevo superhéroe
    const dialogRef = this.dialog.open(SuperHeroeFormDetailComponent);

    dialogRef.componentInstance.newHeroAdded.subscribe((nuevoSuperHeroe: SuperHeroe) => {
        this.isLoading = true;

        this.superHeroesService.addSuperHeroe(nuevoSuperHeroe)
            .pipe(delay(2000)).subscribe(() => {
                this.isLoading = false;
                dialogRef.close();
            });
    });
  }

  editarHeroe(heroe: SuperHeroe, event: Event) {
    // Abrir el formulario de superhéroe en un diálogo y editar el superhéroe
    event.stopPropagation();
    const dialogRef = this.dialog.open(SuperHeroeFormDetailComponent, {
      data: {
        ...heroe,
        editable: true
      }
    });
  
    dialogRef.afterClosed().subscribe((editedHeroe: SuperHeroe) => {
      if (editedHeroe) {
        this.superHeroesService.editSuperHeroe(editedHeroe.id, editedHeroe).subscribe();
      }
    });
  }

  eliminarHeroe(idHeroe: number, event: Event) {
    // Abrir el diálogo de confirmación y eliminar el superhéroe
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      data: {
        editando: false,
        message: '¿Estás seguro de que quieres eliminar este superhéroe?',
        action: 'Eliminar'
      }
    });
    event.stopPropagation();
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      if (result) {
        this.superHeroesService.deleteSuperHeroe(idHeroe).pipe(delay(2000)).subscribe(() => {
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }
}
