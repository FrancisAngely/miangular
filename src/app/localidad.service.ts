import { Injectable } from '@angular/core';
import { Localidad } from './localidad';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  private localidadesUrl = 'http://localhost:8080/localidades';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    getLocalidades(): Observable<Localidad[]> {
      
      return this.http.get<Localidad[]>(this.localidadesUrl)
      .pipe ( map ( ( respuesta : any ) => respuesta.localidades ) ) ;
      
    }

    getLocalidad(id: number): Observable<Localidad> {
           const url = `${this.localidadesUrl}/${id}`;
           return this.http.get<Localidad>(url)
           .pipe ( map ( ( respuesta : any ) => respuesta.localidad ) ) ;
       }
    
        updateLocalidad(localidad: Localidad): Observable<any> {
          const id=localidad.id;
          const url = `${this.localidadesUrl}/${id}`;
          return this.http.put(url, localidad, this.httpOptions);
        }
        deleteLocalidad(id: number): Observable<Localidad> {
          const url = `${this.localidadesUrl}/${id}`;
        
          return this.http.delete<Localidad>(url, this.httpOptions);
        }
}

