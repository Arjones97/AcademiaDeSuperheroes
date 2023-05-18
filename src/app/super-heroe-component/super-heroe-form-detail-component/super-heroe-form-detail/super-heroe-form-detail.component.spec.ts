import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { SuperHeroeFormDetailComponent } from './super-heroe-form-detail.component';
import { SuperHeroesService } from 'src/app/servicios/superHeroesService';
import { SuperHeroe } from 'src/app/dto/superHeroe';
import { DefaultPipe } from 'src/app/utils/defaultPipe';

describe('SuperHeroeFormDetailComponent', () => {
  let component: SuperHeroeFormDetailComponent;
  let fixture: ComponentFixture<SuperHeroeFormDetailComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockDialog = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(true)
    })
  };

  const mockSuperHeroesService = {
    editSuperHeroe: jasmine.createSpy('editSuperHeroe').and.returnValue(of({}))
  };

  const mockData = {
    nuevoSuperHeroe: new SuperHeroe(0, 'Bruce Wayne', 36, 'Gotham City', 'Batman', 'Multimillonario', 'https://www.cinemascomics.com/wp-content/uploads/2020/09/batman-1939-original.jpg', 'DC')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperHeroeFormDetailComponent, DefaultPipe ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatDialog, useValue: mockDialog },
        { provide: SuperHeroesService, useValue: mockSuperHeroesService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroeFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se ha creado con exito el componente: SuperHeroeFormDetailComponent', () => {
    expect(component).toBeTruthy();
  });
});
