import { TestBed } from '@angular/core/testing';
import { SuperHeroesService } from './superHeroesService';
import { SuperHeroe } from '../dto/superHeroe';
import { firstValueFrom } from 'rxjs';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;
  let mockSuperHeroes: SuperHeroe[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);

    mockSuperHeroes = [
        new SuperHeroe(1, 'Clark Kent', 33, 'Krypton', 'Superman', 'Superfuerza', 'https://m.media-amazon.com/images/I/71EN+oGjHzL._AC_UF350,350_QL80_.jpg', 'DC'),
        new SuperHeroe(2, 'Peter Parker', 18, 'Nueva York', 'Spiderman', 'Super poder arácnido', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1200px-Spider-Man.jpg', 'Marvel'),
        new SuperHeroe(3, 'Wade Wilson', 48, 'Regina', 'Deadpool', 'Inmortalidad', 'https://i.blogs.es/6b20c2/cartel-deadpool/1366_2000.jpg', 'Marvel'),
        new SuperHeroe(4, 'Bruce Wayne', 36, 'Gotham City', 'Batman', 'Multimillonario', 'https://www.cinemascomics.com/wp-content/uploads/2020/09/batman-1939-original.jpg', 'DC'),
        new SuperHeroe(5, 'Midoriya', 16, 'Tokyo', 'Deku', 'One For All', 'https://tierragamer.com/wp-content/uploads/2022/12/my-hero-academia-deku-quirk.jpg', 'Manga'),
        new SuperHeroe(6, 'Kakarot', 44, 'Planeta Sadala', 'Goku', 'Super Saiyan', 'https://img.asmedia.epimg.net/resizer/1Xk8AYQP-MAIlA3rWVLJRsiRJAQ=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/L726G3JR35DGLG6JBDOS4MAPQ4.jpg', 'Manga'),
    ];

    service.superHeroes = [...mockSuperHeroes];
  });
  

  it('El servicio se ha creado con exito', () => {
    expect(service).toBeTruthy();
  });

  it('El servicio getSuperHeroes devuelve todos los super heroes', (done) => {
    service.getSuperHeroes().subscribe(superHeroes => {
      expect(superHeroes).toEqual(mockSuperHeroes);
      done();
    });
  });

  it('El servicio getSuperHeroe devuelve el super heroe con ID 1', () => {
    const superHeroe = service.getSuperHeroe(1);
    expect(superHeroe).toEqual(mockSuperHeroes[0]);
  });

  it('El servicio addSuperHeroe ha añadido un nuevo super heroe con exito', (done) => {
    const newHeroe = new SuperHeroe(0, 'Bruce Wayne', 36, 'Gotham City', 'Batman', 'Multimillonario', 'https://www.cinemascomics.com/wp-content/uploads/2020/09/batman-1939-original.jpg', 'DC');
    service.addSuperHeroe(newHeroe).subscribe(() => {
      const superHeroe = service.getSuperHeroe(7);
      expect(superHeroe).toEqual(newHeroe);
      done();
    });
  });

  it('El servicio editSuperHeroe ha editado el super heroe con ID 1 con exito', (done) => {
    const updatedHeroe = { ...mockSuperHeroes[0], nombre: 'Nuevo nombre' };
    service.editSuperHeroe(1, updatedHeroe).subscribe(() => {
      const superHeroe = service.getSuperHeroe(1);
      expect(superHeroe).toEqual(updatedHeroe);
      done();
    });
  });

  it('El servicio deleteSuperHeroe ha eliminado el super heroe con ID con exito', async () => {
    await firstValueFrom(service.deleteSuperHeroe(1));
    const heroe = service.superHeroes.find(heroe => heroe.id === 1);
    expect(heroe).toBeUndefined();
  });

  it('El servicio getFilteredSuperHeroes ha filtrado correctamente por la palabra "Superman"', (done) => {
    service.getFilteredSuperHeroes('Superman').subscribe(superHeroes => {
      expect(superHeroes).toEqual([mockSuperHeroes[0]]);
      done();
    });
  });
});
