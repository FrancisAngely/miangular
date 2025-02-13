import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { USUARIOS } from './mock-usuarios';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
private usuariosUrl = 'http://localhost:8080/usuarios';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient,private messageService: MessageService) { }

 
  getUsuarios(): Observable<Usuario[]> {
     return this.http.get<Usuario[]>(this.usuariosUrl)
     .pipe ( map ( ( respuesta : any ) => respuesta.usuarios ) ) ;
  }

 /* getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe ( map ( ( respuesta : any ) => respuesta.hero ) ) ;
    
  }*/

    getUsuario(id: number): Observable<Usuario> {
      // For now, assume that a hero with the specified `id` always exists.
      // Error handling will be added in the next step of the tutorial.
      const usuario = USUARIOS.find(h => h.id === id)!;
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(usuario);
    }


     /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
