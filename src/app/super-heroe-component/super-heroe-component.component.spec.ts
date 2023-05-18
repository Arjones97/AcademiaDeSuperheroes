import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync,  } from '@angular/core/testing';;
import { BehaviorSubject, Subject, of } from 'rxjs';
import { SuperHeroe } from '../dto/superHeroe';
import { SuperHeroesService } from '../servicios/superHeroesService';
import { SuperHeroeComponentComponent } from './super-heroe-component.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SuperHeroeFormDetailComponent } from './super-heroe-form-detail-component/super-heroe-form-detail/super-heroe-form-detail.component';

describe('SuperHeroeComponentComponent', () => {
  let component: SuperHeroeComponentComponent;
  let fixture: ComponentFixture<SuperHeroeComponentComponent>;
  let superHeroesServiceSpy: jasmine.SpyObj<SuperHeroesService>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  const testHeroe = new SuperHeroe(1, 'Clark Kent', 33, 'Krypton', 'Superman', 'Superfuerza', 'https://m.media-amazon.com/images/I/71EN+oGjHzL._AC_UF350,350_QL80_.jpg', 'DC');

  beforeEach(waitForAsync(() => {
    const spyService = jasmine.createSpyObj('SuperHeroesService', ['getSuperHeroes', 'editSuperHeroe',
     'deleteSuperHeroe', 'superHeroesUpdated', 'getFilteredSuperHeroes', 'addSuperHeroe']);
    const spyDialog = jasmine.createSpyObj('MatDialog', ['open']);
    spyService.getSuperHeroes.and.returnValue(of([testHeroe]));
    spyService.getFilteredSuperHeroes.and.returnValue(of([]));
    spyService.superHeroesUpdated = new BehaviorSubject([]);
    spyService.addSuperHeroe.and.returnValue(of(null));
  
    TestBed.configureTestingModule({
      declarations: [ SuperHeroeComponentComponent ],
      providers: [
        { provide: SuperHeroesService, useValue: spyService },
        { provide: MatDialog, useValue: spyDialog },
      ],
      imports: [
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
        MatIconModule 
      ]
    })
    .compileComponents();
  
    superHeroesServiceSpy = TestBed.inject(SuperHeroesService) as jasmine.SpyObj<SuperHeroesService>;
    fixture = TestBed.createComponent(SuperHeroeComponentComponent);
    component = fixture.componentInstance;
    matDialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroeComponentComponent);
    component = fixture.componentInstance;
  });

  it('Componente SuperHeroeComponentComponent creado con exito', () => {
    expect(component).toBeTruthy();
  });

  it('Se muestran todos los superheroes', fakeAsync(async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    flush();
    expect(superHeroesServiceSpy.getSuperHeroes).toHaveBeenCalled();
    expect(component.superHeroes).toEqual([testHeroe]);
  }));
  
  
  it('Se muestra la edicion de un superheroe', fakeAsync(() => {
    const testHeroeEdited = {...testHeroe, nombre: 'Nuevo Nombre'};
    superHeroesServiceSpy.editSuperHeroe.and.returnValue(of(null));
  
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(testHeroeEdited), close: null });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);
  
    component.editarHeroe(testHeroe, new Event('click'));
    tick();
    expect(superHeroesServiceSpy.editSuperHeroe).toHaveBeenCalledWith(testHeroeEdited.id, testHeroeEdited);
  }));

  it('Se muestra la eliminacion de un superheroe', () => {
    superHeroesServiceSpy.deleteSuperHeroe.and.returnValue(of(null));

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.eliminarHeroe(testHeroe.id, new Event('click'));

    expect(superHeroesServiceSpy.deleteSuperHeroe).toHaveBeenCalledWith(testHeroe.id);
  });

  it('Se muestra un superheroe filtrado', () => {
    component.control.setValue('No existe');
    expect(component.dataSource.data).toEqual([]);
  });
  
  it('Se muestra el detalle de un superheroe', () => {
    component.verDetalle(testHeroe);
    expect(matDialogSpy.open).toHaveBeenCalledWith(SuperHeroeFormDetailComponent, {
      data: {
        ...testHeroe,
        editable: false
      }
    });
  });
  
  it('Se muestra un superheroe añadido', fakeAsync(() => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);
    dialogRefSpyObj.componentInstance = { newHeroAdded: new Subject<SuperHeroe>() };
    matDialogSpy.open.and.returnValue(dialogRefSpyObj);
  
    component.anadirSuperHeroe();
    dialogRefSpyObj.componentInstance.newHeroAdded.next(testHeroe);
    tick(2000);
  
    expect(component.isLoading).toBe(false);
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  }));
  
  
  

});
