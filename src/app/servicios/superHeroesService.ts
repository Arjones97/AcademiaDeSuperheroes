import { Injectable } from '@angular/core';
import { SuperHeroe } from '../dto/superHeroe';
import { BehaviorSubject, Observable, Subject, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {
  public superHeroes: SuperHeroe[] = [
    new SuperHeroe(1, 'Clark Kent', 33, 'Krypton', 'Superman', 'Superfuerza', 'https://m.media-amazon.com/images/I/71EN+oGjHzL._AC_UF350,350_QL80_.jpg', 'DC'),
    new SuperHeroe(2, 'Peter Parker', 18, 'Nueva York', 'Spiderman', 'Super poder arácnido', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Spider-Man.jpg/1200px-Spider-Man.jpg', 'Marvel'),
    new SuperHeroe(3, 'Wade Wilson', 48, 'Regina', 'Deadpool', 'Inmortalidad', 'https://i.blogs.es/6b20c2/cartel-deadpool/1366_2000.jpg', 'Marvel'),
    new SuperHeroe(4, 'Bruce Wayne', 36, 'Gotham City', 'Batman', 'Multimillonario', 'https://www.cinemascomics.com/wp-content/uploads/2020/09/batman-1939-original.jpg', 'DC'),
    new SuperHeroe(5, 'Midoriya', 16, 'Tokyo', 'Deku', 'One For All', 'https://tierragamer.com/wp-content/uploads/2022/12/my-hero-academia-deku-quirk.jpg', 'Manga'),
    new SuperHeroe(6, 'Kakarot', 44, 'Planeta Sadala', 'Goku', 'Super Saiyan', 'https://img.asmedia.epimg.net/resizer/1Xk8AYQP-MAIlA3rWVLJRsiRJAQ=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/L726G3JR35DGLG6JBDOS4MAPQ4.jpg', 'Manga'),
  ];

  // Se utiliza para emitir eventos cada vez que la lista de superhéroes se actualiza.
  public superHeroesUpdated = new Subject<SuperHeroe[]>();

  // Este BehaviorSubject emitirá la lista de superhéroes a cualquier nuevo suscriptor.
  private superHeroesSubject = new BehaviorSubject<SuperHeroe[]>(this.superHeroes);

  constructor() { }

  // Devuelve un Observable que emite la lista actual de superhéroes.
  getSuperHeroes(): Observable<SuperHeroe[]> {
    // Devuelve una referencia al BehaviorSubject superHeroesSubject.
    return this.superHeroesSubject.asObservable();
  }


  // Busca un superhéroe por su ID. Lanza un error si no se encuentra.
  getSuperHeroe(id: number): SuperHeroe {
    const superHeroe = this.superHeroes.find(heroe => heroe.id === id);
    if (!superHeroe) {
      throw new Error(`No se encontró un superhéroe con el ID ${id}`);
    }
    return superHeroe;
  }

  // Añade un nuevo superhéroe a la lista y emite un evento para actualizar a los suscriptores.
  addSuperHeroe(newHeroe: SuperHeroe): Observable<null> {
    const maxId = Math.max(...this.superHeroes.map(heroe => heroe.id));
    newHeroe.id = maxId + 1;
    this.superHeroes.push(newHeroe);
    this.superHeroesUpdated.next([...this.superHeroes]);
    return of(null);
  }

  // Edita un superhéroe existente y emite un evento para actualizar a los suscriptores.
  editSuperHeroe(id: number, updatedHeroe: SuperHeroe): Observable<null> {
    const index = this.superHeroes.findIndex(heroe => heroe.id === id);
    if (index !== -1) {
      this.superHeroes[index] = updatedHeroe;
      this.superHeroesUpdated.next([...this.superHeroes]);
    }
    return of(null);
  }

  // Elimina un superhéroe de la lista y emite un evento para actualizar a los suscriptores.
  deleteSuperHeroe(id: number): Observable<null> {
    const index = this.superHeroes.findIndex(heroe => heroe.id === id);
    if (index !== -1) {
      this.superHeroes.splice(index, 1);
      // Emitir el array modificado a todos los suscriptores.
      this.superHeroesUpdated.next([...this.superHeroes]);
    }
    return of(null);
  }

  // Filtra la lista de superhéroes por nombre y devuelve un Observable que emite la lista filtrada.
  getFilteredSuperHeroes(filter: string): Observable<SuperHeroe[]> {
    return this.getSuperHeroes().pipe(
      map(superHeroes => superHeroes.filter(hero => hero.nombreSuperheroe.includes(filter)))
    );
  }
  
}
